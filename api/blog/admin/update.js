import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  const { slug } = req.query;

  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const token = authHeader.slice(7);

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return res.status(401).json({ error: 'invalid_token' });
    }

    const {
      title,
      excerpt,
      body,
      category,
      author,
      tags,
      featured_image_url,
      featured_image_alt,
      is_published,
      seo_title,
      seo_description,
      og_image_url,
      canonical_url,
      settings,
      published_at
    } = req.body;

    const readMinutes = body ? Math.ceil(body.split(/\s+/).length / 200) : undefined;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (body !== undefined) updateData.body = body;
    if (category !== undefined) updateData.category = category;
    if (author !== undefined) updateData.author = author;
    if (tags !== undefined) updateData.tags = tags;
    if (featured_image_url !== undefined) updateData.featured_image_url = featured_image_url;
    if (featured_image_alt !== undefined) updateData.featured_image_alt = featured_image_alt;
    if (published_at !== undefined) updateData.published_at = published_at;
    if (is_published !== undefined) {
      updateData.is_published = is_published;
      if (is_published && !updateData.published_at) {
        // Only auto-set if not already set or being set
        updateData.published_at = new Date().toISOString();
      } else if (!is_published) {
        updateData.published_at = null;
      }
    }
    if (readMinutes !== undefined) updateData.read_minutes = readMinutes;
    if (seo_title !== undefined) updateData.seo_title = seo_title;
    if (seo_description !== undefined) updateData.seo_description = seo_description;
    if (og_image_url !== undefined) updateData.og_image_url = og_image_url;
    if (canonical_url !== undefined) updateData.canonical_url = canonical_url;
    if (settings !== undefined) updateData.settings = settings;

    updateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'post_not_found' });
    }

    return res.status(200).json({ post: data });
  } catch (err) {
    console.error('[blog/admin/update]', err);
    return res.status(500).json({ error: 'failed_to_update_post' });
  }
}
