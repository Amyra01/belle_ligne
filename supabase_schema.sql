-- Belle Ligne - Supabase Postgres Schema & Tables Setup
-- Run this in your Supabase SQL Editor to initialize all tables and policies.

-- 1. Profiles & Users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL DEFAULT 'Fashion Reader',
  role TEXT NOT NULL DEFAULT 'Verified Reader & Stylist',
  tier TEXT NOT NULL DEFAULT 'Haute Couture Studio',
  saved_articles TEXT[] DEFAULT ARRAY['trends-2028', 'streetwear-evolves']::TEXT[],
  saved_looks TEXT[] DEFAULT ARRAY['teal-couture']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Custom User-Created Magazines (From Creator Studio Canvas)
CREATE TABLE IF NOT EXISTS public.magazines (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  volume TEXT,
  issue TEXT,
  season TEXT DEFAULT 'CREATOR SPECIAL 2028',
  cover_image TEXT NOT NULL,
  editor TEXT NOT NULL DEFAULT 'Daisy (Studio Member)',
  pages_count INT DEFAULT 16,
  featured BOOLEAN DEFAULT true,
  is_user_created BOOLEAN DEFAULT true,
  accent_color TEXT DEFAULT '#146872',
  description TEXT,
  tags TEXT[] DEFAULT ARRAY['Custom Magazine', 'Digital Paint', 'User Edition']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Saved Wardrobe & Try-On Looks
CREATE TABLE IF NOT EXISTS public.saved_looks (
  id TEXT PRIMARY KEY,
  user_email TEXT,
  top_name TEXT,
  top_color TEXT,
  bottom_name TEXT,
  bottom_color TEXT,
  accessory_name TEXT,
  skin_tone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Mood Boards (Mini-Pinterest Boards)
CREATE TABLE IF NOT EXISTS public.moodboards (
  id TEXT PRIMARY KEY,
  user_email TEXT,
  title TEXT NOT NULL DEFAULT 'My Mood Board',
  items_count INT DEFAULT 4,
  elements JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Editorial Articles & Workflow Pipeline (Draft -> Review -> Approved -> Published)
CREATE TABLE IF NOT EXISTS public.editorial_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT DEFAULT 'runway',
  content TEXT[] DEFAULT ARRAY['']::TEXT[],
  author TEXT NOT NULL DEFAULT 'Daisy (Editorial Director)',
  stage TEXT NOT NULL DEFAULT 'draft',
  comments TEXT[] DEFAULT ARRAY['Initial draft submitted']::TEXT[],
  tags TEXT[] DEFAULT ARRAY['Editorial', '2028 Preview']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Subscribers & CRM
CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  tier TEXT DEFAULT 'Front-Row Member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Public read/insert policies for demo/production ease
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.magazines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_looks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moodboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editorial_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Allow public read on magazines" ON public.magazines FOR SELECT USING (true);
CREATE POLICY "Allow public insert on magazines" ON public.magazines FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on saved_looks" ON public.saved_looks FOR SELECT USING (true);
CREATE POLICY "Allow public insert on saved_looks" ON public.saved_looks FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on moodboards" ON public.moodboards FOR SELECT USING (true);
CREATE POLICY "Allow public insert on moodboards" ON public.moodboards FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on editorial_articles" ON public.editorial_articles FOR SELECT USING (true);
CREATE POLICY "Allow public insert on editorial_articles" ON public.editorial_articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on editorial_articles" ON public.editorial_articles FOR UPDATE USING (true);

CREATE POLICY "Allow public read on subscribers" ON public.subscribers FOR SELECT USING (true);
CREATE POLICY "Allow public insert on subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);
