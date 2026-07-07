import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, Trash2 } from 'lucide-react';

import { supabase } from '../../lib/supabase';
import RichTextEditor from '../../components/RichTextEditor';

const CATEGORIES = [
  'First-contact infrastructure',
  'Lead leakage',
  'CRM graveyards',
  'ISA operations',
  'Agent handoff',
  'After-hours leads',
  'Brokerage intelligence',
  'PAS build notes',
];

export default function BlogEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = !!slug;

  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    body: '',
    category: CATEGORIES[0],
    tags: [],
    featured_image_url: '',
    featured_image_alt: '',
    is_published: false,
    seo_title: '',
    seo_description: '',
    og_image_url: '',
    canonical_url: '',
    settings: {
      show_author: true,
      show_related: true,
      enable_comments: true,
      enable_likes: true,
      is_featured: false,
    },
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuth();
    if (isEditing) {
      loadPost();
    }
  }, [slug]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/admin/login');
      return;
    }
    setUser(user);
  };

  const loadPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      setPost(data);
      setImagePreview(data.featured_image_url || '');
    } catch (err) {
      console.error('Failed to load post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const filename = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filename, file, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      const { data: publicUrl } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filename);

      setPost({ ...post, featured_image_url: publicUrl.publicUrl });
      setImagePreview(publicUrl.publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload image');
    }
  };

  const handleDeleteImage = async () => {
    if (!post.featured_image_url) return;

    try {
      const path = post.featured_image_url.split('/blog-images/')[1];
      if (path) {
        await supabase.storage
          .from('blog-images')
          .remove([path]);
      }

      setPost({ ...post, featured_image_url: '', featured_image_alt: '' });
      setImagePreview('');
    } catch (err) {
      console.error('Delete image failed:', err);
      setError('Failed to delete image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.excerpt || !post.body || !post.category) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        navigate('/admin/login');
        return;
      }

      const endpoint = isEditing
        ? `/api/blog/admin/update?slug=${slug}`
        : '/api/blog/admin/create';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save post');
      }

      alert(isEditing ? 'Post updated successfully!' : 'Post created successfully!');
      navigate('/admin/blog');
    } catch (err) {
      console.error('Save failed:', err);
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F8FB' }}>
        <div style={{ color: '#94A3B8' }}>Loading post...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FB' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E8F0', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/admin/blog')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#5B3FD4',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#5B3FD4',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 8,
              fontWeight: 600,
              cursor: saving ? 'wait' : 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            <Save size={16} /> {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container-page" style={{ maxWidth: 900, paddingBlock: '40px' }}>
        {error && (
          <div
            style={{
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '12px 14px',
              borderRadius: 8,
              marginBottom: 24,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Title */}
          <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>
              Post Title *
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              placeholder="Enter a compelling title"
              style={{
                width: '100%',
                fontSize: 24,
                fontWeight: 700,
                border: 'none',
                outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#0F172A',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Excerpt & Category Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>
                Excerpt *
              </label>
              <textarea
                value={post.excerpt}
                onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                placeholder="One or two sentences summarizing the post"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #E5E8F0',
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Category *
                </label>
                <select
                  value={post.category}
                  onChange={(e) => setPost({ ...post, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'Inter', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 8 }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={post.tags?.join(', ') || ''}
                  onChange={(e) => setPost({ ...post, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                  placeholder="e.g. tutorial, news"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: "'Inter', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>
              Featured Image
            </label>

            {imagePreview ? (
              <div>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />
                <div style={{ display: 'flex', gap: 10 }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: '#EEEAFB',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#5B3FD4',
                      fontSize: 13,
                    }}
                  >
                    <Upload size={14} /> Change Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 16px',
                      background: '#FEE2E2',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: '#DC2626',
                      fontSize: 13,
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={post.featured_image_alt}
                  onChange={(e) => setPost({ ...post, featured_image_alt: e.target.value })}
                  placeholder="Alt text for accessibility"
                  style={{
                    marginTop: 12,
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E8F0',
                    borderRadius: 8,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ) : (
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  padding: '40px',
                  border: '2px dashed #E5E8F0',
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: '#F7F8FB',
                  transition: 'all 0.2s',
                }}
              >
                <Upload size={20} style={{ color: '#94A3B8' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#5B3FD4' }}>Click to upload image</div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>or drag and drop</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>

          {/* Body */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12 }}>
              Post Content *
            </label>
            <RichTextEditor
              value={post.body}
              onChange={(html) => setPost({ ...post, body: html })}
              placeholder="Start writing your post..."
            />
          </div>

          {/* SEO & Metadata */}
          <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', marginBottom: 16 }}>
              SEO & Metadata
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                  SEO Title
                </label>
                <input
                  type="text"
                  value={post.seo_title || ''}
                  onChange={(e) => setPost({ ...post, seo_title: e.target.value })}
                  placeholder="Custom browser tab title"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                  Meta Description
                </label>
                <textarea
                  value={post.seo_description || ''}
                  onChange={(e) => setPost({ ...post, seo_description: e.target.value })}
                  placeholder="Brief summary for search engine results"
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #E5E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Publish Toggle */}
          <div style={{ background: '#fff', border: '1px solid #E5E8F0', borderRadius: 12, padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#0F172A' }}>
                {post.is_published ? '✓ Published' : '○ Draft'}
              </div>
              <p style={{ fontSize: 13, color: '#94A3B8', margin: '4px 0 0' }}>
                {post.is_published ? 'This post is visible to readers' : 'Only you can see this post'}
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={post.is_published}
                onChange={(e) => setPost({ ...post, is_published: e.target.checked })}
                style={{ width: 20, height: 20, cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 600, color: '#0F172A' }}>Publish Now</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
