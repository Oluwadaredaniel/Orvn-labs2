import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Edit2, Trash2, Eye, EyeOff, AlertTriangle, BarChart2, BookOpen, FileText, CheckCircle, Copy, Settings, Tag, Layers, Users, MessageSquare, ExternalLink } from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { signOut, getCurrentUser } from '../../lib/admin-auth';
import Modal from '../../components/ui/Modal';

export default function BlogDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [pendingComments, setPendingComments] = useState(0);
  const [recentComments, setRecentComments] = useState([]);

  // Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, slug: '', title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }
      setUser(user);
      loadPosts();
      loadPendingComments();
    } catch (err) {
      console.error('Auth check failed:', err);
      navigate('/admin/login');
    }
  };

  const loadPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Failed to load posts:', err);
      alert('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const loadPendingComments = async () => {
    try {
      const { count, error } = await supabase
        .from('blog_comments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (!error) setPendingComments(count || 0);

      const { data: recent, error: recentErr } = await supabase
        .from('blog_comments')
        .select('*, blog_posts(title)')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!recentErr) setRecentComments(recent || []);
    } catch (err) {
      console.warn('Failed to load comments data:', err);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Sign out failed:', err);
      alert('Failed to sign out');
      setIsSigningOut(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleDelete = async () => {
    const { slug } = deleteModal;
    setIsDeleting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        showToast('Session expired. Please login again.', 'error');
        navigate('/admin/login');
        return;
      }

      // 1. Call the API to delete from DB and Storage
      const res = await fetch(`/api/blog/admin/delete?slug=${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete post');
      }

      // 2. IMPORTANT: Update local state immediately
      setPosts(prevPosts => prevPosts.filter((p) => p.slug !== slug));

      showToast('Post deleted successfully');
      setDeleteModal({ isOpen: false, slug: '', title: '' });
    } catch (err) {
      console.error('Delete failed:', err);
      showToast(err.message || 'Failed to delete post', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (post) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        showToast('Session expired. Please log in again.', 'error');
        navigate('/admin/login');
        return;
      }

      const res = await fetch(`/api/blog/admin/update?slug=${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          is_published: !post.is_published,
        }),
      });

      if (!res.ok) throw new Error('Failed to update post');

      const updated = await res.json();
      setPosts(posts.map((p) => (p.slug === post.slug ? updated.post : p)));
      showToast(`Post ${!post.is_published ? 'published' : 'moved to drafts'}`);
    } catch (err) {
      console.error('Toggle publish failed:', err);
      showToast('Failed to update post', 'error');
    }
  };

  const handleDuplicate = async (post) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        showToast('Session expired. Please log in again.', 'error');
        navigate('/admin/login');
        return;
      }

      const duplicatedPost = {
        ...post,
        title: `${post.title} (Copy)`,
        slug: `${post.slug}-copy-${Math.floor(Math.random() * 1000)}`,
        is_published: false,
        published_at: null,
        views_count: 0,
        likes_count: 0,
      };

      // Clean up metadata
      delete duplicatedPost.id;
      delete duplicatedPost.created_at;
      delete duplicatedPost.updated_at;

      const res = await fetch('/api/blog/admin/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(duplicatedPost),
      });

      if (!res.ok) throw new Error('Failed to duplicate post');

      const data = await res.json();
      setPosts([data.post, ...posts]);
      showToast('Post duplicated as draft');
    } catch (err) {
      console.error('Duplicate failed:', err);
      showToast('Failed to duplicate post', 'error');
    }
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: '#F7F8FB' }}>
      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E5E8F0', padding: '20px' }}>
        <div className="container-page" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Blog Dashboard
            </h1>
            <p style={{ fontSize: 14, color: '#94A3B8', margin: 0 }}>
              Logged in as {user?.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => navigate('/admin/blog/categories')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#475569',
                border: '1px solid #E5E8F0',
                padding: '12px 16px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Layers size={18} /> Categories
            </button>
            <button
              onClick={() => navigate('/admin/blog/tags')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#475569',
                border: '1px solid #E5E8F0',
                padding: '12px 16px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Tag size={18} /> Tags
            </button>
            <button
              onClick={() => navigate('/admin/blog/authors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#475569',
                border: '1px solid #E5E8F0',
                padding: '12px 16px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Users size={18} /> Authors
            </button>
            <button
              onClick={() => navigate('/admin/blog/comments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#475569',
                border: '1px solid #E5E8F0',
                padding: '12px 16px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <MessageSquare size={18} /> Comments
            </button>
            <button
              onClick={() => navigate('/admin/blog/settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#475569',
                border: '1px solid #E5E8F0',
                padding: '12px 16px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Settings size={18} /> Settings
            </button>
            <button
              onClick={() => navigate('/admin/blog/create')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#5B3FD4',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Plus size={18} /> New Post
            </button>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#FEF2F2',
                color: '#DC2626',
                border: 'none',
                padding: '12px 20px',
                borderRadius: 10,
                fontWeight: 600,
                cursor: 'pointer',
                opacity: isSigningOut ? 0.7 : 1,
              }}
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-page" style={{ padding: '40px 0' }}>
        {/* Stats Row */}
        {!loading && posts.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            {[
              { label: 'Total Posts', value: posts.length, icon: <FileText size={20} />, color: '#5B3FD4' },
              { label: 'Total Views', value: posts.reduce((acc, p) => acc + (p.views_count || 0), 0), icon: <BarChart2 size={20} />, color: '#F59E0B' },
              { label: 'Total Likes', value: posts.reduce((acc, p) => acc + (p.likes_count || 0), 0), icon: <Heart size={20} />, color: '#EF4444' },
              { label: 'Pending Comments', value: pendingComments, icon: <MessageSquare size={20} />, color: '#D97706', onClick: () => navigate('/admin/blog/comments') },
            ].map((stat, i) => (
              <div
                key={i}
                onClick={stat.onClick}
                style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  border: '1px solid #E5E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  cursor: stat.onClick ? 'pointer' : 'default',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => stat.onClick && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => stat.onClick && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <div style={{ background: `${stat.color}10`, color: stat.color, padding: 12, borderRadius: 10 }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A' }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, marginBottom: 40 }}>
           {/* Post List */}
           <div>
             <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
               {/* ... (keep existing post list header) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr auto',
                gap: 16,
                padding: '16px 20px',
                background: '#F7F8FB',
                borderBottom: '1px solid #E5E8F0',
                fontWeight: 600,
                fontSize: 13,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <div>Post</div>
              <div>Category</div>
              <div>Date</div>
              <div>Status</div>
              <div>Views</div>
              <div>Actions</div>
            </div>

            {posts.map((post) => (
              /* ... existing post map items ... */
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Recent Comments */}
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E5E8F0' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageSquare size={18} style={{ color: '#5B3FD4' }} /> Recent Comments
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {recentComments.length === 0 ? (
                <div style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', padding: 20 }}>No comments yet</div>
              ) : (
                recentComments.map(comment => (
                  <div key={comment.id} style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>{comment.author_name}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8' }}>{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#475569', margin: '0 0 6px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {comment.content}
                    </p>
                    <div style={{ fontSize: 11, color: '#5B3FD4', fontWeight: 600 }}>
                      On: {comment.blog_posts?.title}
                    </div>
                  </div>
                ))
              )}
            </div>
            {recentComments.length > 0 && (
              <button
                onClick={() => navigate('/admin/blog/comments')}
                style={{ width: '100%', marginTop: 16, padding: '10px', background: '#F8FAFC', border: '1px solid #E5E8F0', borderRadius: 8, fontSize: 12, fontWeight: 700, color: '#5B3FD4', cursor: 'pointer' }}
              >
                View all comments
              </button>
            )}
          </div>
        </div>
      </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => !isDeleting && setDeleteModal({ isOpen: false, slug: '', title: '' })}
        title="Delete Post"
        footer={
          <>
            <button
              disabled={isDeleting}
              onClick={() => setDeleteModal({ isOpen: false, slug: '', title: '' })}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#fff',
                color: '#475569',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              disabled={isDeleting}
              onClick={handleDelete}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#DC2626',
                color: '#fff',
                fontWeight: 600,
                cursor: isDeleting ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: isDeleting ? 0.7 : 1,
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete Post'}
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', background: '#FEF2F2', borderRadius: '50%', color: '#DC2626' }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: '#0F172A' }}>
              Are you sure you want to delete this post?
            </p>
            <p style={{ margin: 0, color: '#64748B', fontSize: '14px' }}>
              "<strong>{deleteModal.title}</strong>" will be permanently removed. This action cannot be undone.
            </p>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '12px 20px',
            background: toast.type === 'success' ? '#0F172A' : '#DC2626',
            color: '#fff',
            borderRadius: '10px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: 2000,
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
