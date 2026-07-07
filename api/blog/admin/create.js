import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

// Slug helper
const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Auth check: verify admin token
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = authHeader.slice(7);

  try {
    // Verify the token is valid by checking against Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'invalid_token' });
    }

    const {
      title,
      excerpt,
      body,
      category,
      tags,
      featured_image_url,
      featured_image_alt,
      is_published,
      seo_title,
      seo_description,
      og_image_url,
      canonical_url,
      settings
    } = req.body;

    // Validation
    if (!title || !excerpt || !body || !category) {
      return res.status(400).json({ error: 'missing_required_fields' });
    }

    const slug = slugify(title);
    const readMinutes = Math.ceil(body.split(/\s+/).length / 200); // ~200 words per minute

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        {
          slug,
          title,
          excerpt,
          body,
          category,
          tags: tags || [],
          featured_image_url: featured_image_url || null,
          featured_image_alt: featured_image_alt || '',
          is_published: is_published || false,
          read_minutes: readMinutes,
          published_at: is_published ? new Date().toISOString() : null,
          seo_title: seo_title || title,
          seo_description: seo_description || excerpt,
          og_image_url: og_image_url || featured_image_url || null,
          canonical_url: canonical_url || null,
          settings: settings || {
            show_author: true,
            show_related: true,
            enable_comments: true,
            enable_likes: true,
            is_featured: false
          }
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ post: data });
  } catch (err) {
    console.error('[blog/admin/create]', err);
    return res.status(500).json({ error: 'failed_to_create_post' });
  }
}
