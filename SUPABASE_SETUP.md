# Supabase Setup Guide for Blog System

## 1. Create Supabase Project
- Go to https://supabase.com
- Create a new project
- Save your PROJECT_URL and ANON_KEY to `.env.local`:
  ```
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=your-anon-key-here
  ```

## 2. Run SQL Setup
Copy and paste the following SQL into the Supabase SQL Editor:

```sql
-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT DEFAULT 'ORVN Labs',
  featured_image_url TEXT,
  featured_image_alt TEXT,
  is_published BOOLEAN DEFAULT false,
  read_minutes INTEGER DEFAULT 5,
  tags TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  og_image_url TEXT,
  canonical_url TEXT,
  settings JSONB DEFAULT '{"show_author": true, "show_related": true, "enable_comments": true, "enable_likes": true}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_created ON blog_posts(created_at DESC);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Published posts are viewable by anyone" ON blog_posts
  FOR SELECT USING (is_published = true);

-- Policy: Authenticated users can manage all posts (for admin)
-- NOTE: You'll need to set up auth users manually or create an admin role
CREATE POLICY "Admins can view all posts" ON blog_posts
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can create posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: public read
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Storage policy: authenticated write
CREATE POLICY "Authenticated uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
```

## 3. Create Admin User
- Go to Authentication → Users
- Click "Create a new user"
- Email: your-admin-email@example.com
- Password: strong password (or use magic link)
- Save the user ID for later

## 4. Environment Variables
Add to `.env.local`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_ADMIN_KEY=your-service-role-key (for server-side only)
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_API_KEY=your-service-role-key
```

## 5. Verify Setup
- Check Tables → blog_posts exists
- Check Storage → blog-images bucket exists
- Try uploading an image to test storage

Done! Now the backend is ready for the API and admin dashboard.
