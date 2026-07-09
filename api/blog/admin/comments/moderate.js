import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'PUT' && req.method !== 'DELETE') {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Auth check
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'missing_id' });
  }

  try {
    if (req.method === 'DELETE') {
      const { error } = await supabase
        .from('blog_comments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    if (req.method === 'PUT') {
      const { status } = req.body;
      if (!status) return res.status(400).json({ error: 'missing_status' });

      const { data, error } = await supabase
        .from('blog_comments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ success: true, comment: data });
    }
  } catch (err) {
    console.error('[blog/admin/comments/moderate]', err);
    return res.status(500).json({ error: 'failed_to_moderate_comment' });
  }
}
