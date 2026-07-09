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

  const { slug, content, author_name, author_email } = req.body;

  if (!slug || !content || !author_name || !author_email) {
    return res.status(400).json({ error: 'missing_fields' });
  }

  try {
    // Get post ID
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (postError) throw postError;

    // Create comment (default status: pending)
    const { data, error } = await supabase
      .from('blog_comments')
      .insert([
        {
          post_id: post.id,
          author_name,
          author_email,
          content,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({ success: true, comment: data });
  } catch (err) {
    console.error('[blog/comments/create]', err);
    return res.status(500).json({ error: 'failed_to_create_comment' });
  }
}
