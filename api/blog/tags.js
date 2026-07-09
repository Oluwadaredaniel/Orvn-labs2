import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags')
      .eq('is_published', true);

    if (error) throw error;

    // Flatten and get unique tags
    const allTags = data.flatMap(post => post.tags || []);
    const uniqueTags = [...new Set(allTags)].sort();

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json({ tags: uniqueTags });
  } catch (err) {
    console.error('[blog/tags]', err);
    return res.status(500).json({ error: 'failed_to_fetch_tags' });
  }
}
