import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'missing_slug' });
  }

  try {
    // We use a RPC (Remote Procedure Call) to increment to avoid race conditions
    // But since we might not have the RPC set up yet, we'll do a simple update
    // In a real prod environment, use: supabase.rpc('increment_views', { post_slug: slug })

    // First, get current views
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('views_count')
      .eq('slug', slug)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({ views_count: (post.views_count || 0) + 1 })
      .eq('slug', slug);

    if (updateError) throw updateError;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[blog/increment-views]', err);
    return res.status(500).json({ error: 'failed_to_increment_views' });
  }
}
