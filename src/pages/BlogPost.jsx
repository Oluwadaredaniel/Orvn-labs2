import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Share2, Copy, Check } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import ContentRenderer from '../components/ContentRenderer';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    loadPost();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollTotal = element.scrollHeight - element.clientHeight;
      const scrollPos = element.scrollTop;
      setReadingProgress((scrollPos / scrollTotal) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const res = await fetch(`/api/blog/post?slug=${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          setNotFound(true);
        }
        throw new Error('Failed to load post');
      }

      const data = await res.json();
      setPost(data.post);
      setRelated(data.related || []);

      // Increment views (fire and forget)
      fetch(`/api/blog/increment-views?slug=${slug}`, { method: 'POST' })
        .catch((err) => console.warn('Failed to increment views:', err));
    } catch (err) {
      console.error('Failed to load post:', err);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  useDocumentMeta(
    post
      ? {
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          type: 'article',
        }
      : { title: 'Post not found' }
  );

  if (loading) {
    return (
      <PageWrapper>
        <div style={{ padding: '100px 20px', textAlign: 'center', color: '#94A3B8' }}>
          Loading post...
        </div>
      </PageWrapper>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageWrapper>
      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${readingProgress}%`,
          height: '4px',
          background: '#5B3FD4',
          zIndex: 1001,
          transition: 'width 0.1s ease-out',
        }}
      />

      <article style={{ padding: '0 0 clamp(24px, 3vw, 40px)', background: '#fff' }}>
        {/* Hero Section */}
        {post.featured_image_url && (
          <div style={{ width: '100%', height: 'clamp(300px, 50vh, 500px)', overflow: 'hidden', position: 'relative', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.6), transparent)' }} />
          </div>
        )}

        <div className="container-page" style={{ maxWidth: 760 }}>
          <Link
            to="/blog"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#5B3FD4', marginBottom: 24 }}
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#5B3FD4',
                fontWeight: 600,
              }}
            >
              {post.category}
            </span>
            <span style={{ color: '#CBD5E1' }}>·</span>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>{fmt(post.published_at)}</span>
            <span style={{ color: '#CBD5E1' }}>·</span>
            <span style={{ fontSize: 13, color: '#94A3B8' }}>{post.read_minutes} min read</span>
          </div>
          <h1 className="h-display" style={{ fontSize: 'clamp(34px, 5vw, 56px)', margin: '0 0 18px' }}>
            {post.title}
          </h1>

          {/* Author Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#EEEAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#5B3FD4', fontSize: 14 }}>
              {post.author?.[0] || 'O'}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{post.author || 'ORVN Labs'}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{post.category} · {fmt(post.published_at)}</div>
            </div>
          </div>

          <p className="lead" style={{ marginBottom: 24 }}>{post.excerpt}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: '#F1F5F9',
                    color: '#475569',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Section */}
          <div style={{ paddingBottom: 32, borderBottom: '1px solid #F1F5F9', marginBottom: 32 }}>
            <button
              onClick={handleCopyLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: copied ? '#F0FDF4' : '#fff',
                border: `1.5px solid ${copied ? '#22C55E' : '#E5E8F0'}`,
                padding: '8px 16px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                color: copied ? '#16A34A' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Link Copied!' : 'Share Article'}
            </button>
          </div>
        </div>

        <div className="container-page" style={{ maxWidth: 760, paddingBlock: 'clamp(16px, 3vw, 32px)' }}>
          <ContentRenderer html={post.body} />
        </div>

        <div className="container-page" style={{ maxWidth: 760, marginTop: 40 }}>
          <div
            style={{
              background: '#F7F8FB',
              border: '1px solid #E5E8F0',
              borderLeft: '3px solid #5B3FD4',
              borderRadius: 12,
              padding: 'clamp(20px, 3vw, 28px)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontWeight: 600, color: '#0F172A', marginBottom: 4 }}>
                Run the leakage scorecard while it’s fresh.
              </div>
              <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.6 }}>
                Five-minute diagnostic. No signup. Your inputs stay with you.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/calculators/leakage" className="btn-primary">
                Run scorecard <ArrowRight size={15} />
              </Link>
              <Link to="/pas" className="btn-secondary">Explore PAS</Link>
            </div>
          </div>
        </div>
      </article>

      <Section borderTop background="surface">
        <Newsletter source={`blog_post_${post.slug}`} />
      </Section>

      {related && related.length > 0 && (
        <Section borderTop>
          <h2 className="h-section" style={{ fontSize: 'clamp(24px, 3vw, 32px)', margin: '0 0 20px' }}>
            Keep reading
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {related.map((p) => (
              <article key={p.slug} className="card" style={{ padding: 24 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5B3FD4',
                    marginBottom: 8,
                    display: 'inline-block',
                  }}
                >
                  {p.category}
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 600, fontFamily: "'Inter', sans-serif", color: '#0F172A', margin: '0 0 8px', lineHeight: 1.35 }}>
                  <Link to={`/blog/${p.slug}`} style={{ color: '#0F172A' }}>{p.title}</Link>
                </h3>
                <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  {p.excerpt}
                </p>
              </article>
            ))}
          </div>
        </Section>
      )}
    </PageWrapper>
  );
}
