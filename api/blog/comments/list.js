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

  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: 'missing_slug' });
  }

  try {
    // Get post ID first
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (postError) throw postError;

    // Get approved comments
    const { data: comments, error: commentError } = await supabase
      .from('blog_comments')
      .select('*')
      .eq('post_id', post.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true });

    if (commentError) throw commentError;

    return res.status(200).json({ comments: comments || [] });
  } catch (err) {
    console.error('[blog/comments/list]', err);
    return res.status(500).json({ error: 'failed_to_fetch_comments' });
  }
}
