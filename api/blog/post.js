import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  const { slug, preview } = req.query;

  if (req.method === 'GET') {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug);

      if (preview !== 'true') {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query.single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        return res.status(404).json({ error: 'post_not_found' });
      }

      // Fetch related posts
      const { data: related } = await supabase
        .from('blog_posts')
        .select('id, slug, title, excerpt, category, featured_image_url, featured_image_alt, read_minutes, published_at')
        .eq('is_published', true)
        .eq('category', data.category)
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);

      // Fetch Prev/Next posts
      const { data: prev } = await supabase
        .from('blog_posts')
        .select('slug, title')
        .eq('is_published', true)
        .lt('published_at', data.published_at)
        .order('published_at', { ascending: false })
        .limit(1)
        .single();

      const { data: next } = await supabase
        .from('blog_posts')
        .select('slug, title')
        .eq('is_published', true)
        .gt('published_at', data.published_at)
        .order('published_at', { ascending: true })
        .limit(1)
        .single();

      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      return res.status(200).json({
        post: data,
        related: related || [],
        prev: prev || null,
        next: next || null,
      });
    } catch (err) {
      console.error('[blog/post]', err);
      return res.status(500).json({ error: 'failed_to_fetch_post' });
    }
  }

  res.setHeader('Allow', 'GET');
  return res.status(405).json({ error: 'method_not_allowed' });
}
