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
    // RPC or direct increment
    // Since we might not have an RPC set up, we'll do a read-and-update or use Postgres syntax if possible.
    // Supabase supports incrementing via RPC or raw SQL.
    // We'll use a simple select and update for now, or assume an RPC exists.
    // Actually, we can use the 'increment' shorthand if available in the client, but it's usually via RPC.

    // Let's try to use the raw Postgres syntax via rpc if we were sure,
    // but a safe way is to select then update.
    const { data: post, error: fetchError } = await supabase
      .from('blog_posts')
      .select('likes_count')
      .eq('slug', slug)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabase
      .from('blog_posts')
      .update({ likes_count: (post.likes_count || 0) + 1 })
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ success: true, likes_count: data.likes_count });
  } catch (err) {
    console.error('[blog/increment-likes]', err);
    return res.status(500).json({ error: 'failed_to_increment_likes' });
  }
}
