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
      .from('blog_categories')
      .select('name')
      .order('name', { ascending: true });

    if (error) throw error;

    const categories = data?.map((c) => c.name) || [];

    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json({ categories });
  } catch (err) {
    console.error('[blog/categories]', err);
    return res.status(500).json({ error: 'failed_to_fetch_categories' });
  }
}
