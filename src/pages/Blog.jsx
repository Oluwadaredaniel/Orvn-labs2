import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import Newsletter from '../components/Newsletter';
import { useDocumentMeta } from '../lib/seo';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay },
});

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function Blog() {
  useDocumentMeta({
    title: 'Blog',
    description: 'Field notes on first-contact infrastructure, lead conversion, and brokerage operations.',
    path: '/blog',
  });

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPostsAndCategories();
  }, []);

  const loadPostsAndCategories = async () => {
    try {
      setLoading(true);
      setError('');

      // Load posts
      const postsRes = await fetch('/api/blog/list');
      if (!postsRes.ok) throw new Error('Failed to load posts');
      const postsData = await postsRes.json();
      setPosts(postsData.posts || []);

      // Load categories
      const categoriesRes = await fetch('/api/blog/categories');
      if (!categoriesRes.ok) throw new Error('Failed to load categories');
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData.categories || []);
    } catch (err) {
      console.error('Failed to load blog data:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper>
      <section style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(20px, 3vw, 32px)', background: '#fff' }}>
        <div className="container-page" style={{ maxWidth: 840 }}>
          <motion.div {...fadeUp(0)}>
            <Eyebrow>Blog</Eyebrow>
          </motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{
              fontSize: 'clamp(44px, 5.8vw, 76px)',
              lineHeight: 1.1,
              marginBottom: 24,
              fontWeight: 800,
            }}
          >
            Field notes on first-contact infrastructure.
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{
              fontSize: 'clamp(17px, 1.8vw, 19px)',
              lineHeight: 1.65,
              color: '#475569',
              maxWidth: 660,
            }}
          >
            Weekly insights on how brokerages lose, recover, and convert inbound leads. The philosophy, the operators, the patterns that repeat.
          </motion.p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 clamp(16px, 5vw, 48px)' }}>
          {/* Search Bar */}
          <motion.div
            {...fadeUp(0)}
            style={{
              maxWidth: 500,
              margin: '0 auto clamp(24px, 4vw, 32px)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 44px',
                borderRadius: 14,
                border: '1.5px solid #E5E8F0',
                fontSize: 15,
                outline: 'none',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#5B3FD4')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E8F0')}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: 100,
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                <X size={14} />
              </button>
            )}
          </motion.div>

          {/* Category Filter */}
          <motion.div
            {...fadeUp(0)}
            style={{
              display: 'flex',
              gap: 'clamp(6px, 2vw, 12px)',
              flexWrap: 'wrap',
              marginBottom: 'clamp(32px, 6vw, 48px)',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: 'clamp(8px, 1.5vw, 12px) clamp(14px, 3vw, 20px)',
                borderRadius: 100,
                border: selectedCategory === null ? 'none' : '1.5px solid #E5E8F0',
                background: selectedCategory === null ? '#5B3FD4' : '#fff',
                color: selectedCategory === null ? '#fff' : '#475569',
                fontSize: 'clamp(12px, 1.2vw, 14px)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All posts
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: 'clamp(8px, 1.5vw, 12px) clamp(14px, 3vw, 20px)',
                  borderRadius: 100,
                  border: selectedCategory === cat ? 'none' : '1.5px solid #E5E8F0',
                  background: selectedCategory === cat ? '#5B3FD4' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#475569',
                  fontSize: 'clamp(12px, 1.2vw, 14px)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              Loading posts...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#DC2626' }}>
              <p>{error}</p>
              <button
                onClick={loadPostsAndCategories}
                style={{
                  marginTop: 16,
                  padding: '10px 20px',
                  background: '#5B3FD4',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: 16, color: '#94A3B8' }}>No posts in this category yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  {...fadeUp(idx * 0.05)}
                  className="card"
                  style={{
                    padding: 'clamp(20px, 4vw, 32px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#5B3FD4',
                      marginBottom: 12,
                      display: 'inline-block',
                      fontWeight: 600,
                    }}
                  >
                    {post.category}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      fontSize: 'clamp(18px, 2.2vw, 24px)',
                      fontWeight: 700,
                      color: '#0F172A',
                      margin: '0 0 12px',
                      lineHeight: 1.35,
                      textDecoration: 'none',
                    }}
                  >
                    {post.title}
                  </Link>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
                    <span>{fmt(post.published_at)}</span>
                    <span>·</span>
                    <span>{post.read_minutes} min read</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#5B3FD4',
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    Read post →
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section borderTop background="surface">
        <Newsletter source="blog_list" />
      </Section>
    </PageWrapper>
  );
}
