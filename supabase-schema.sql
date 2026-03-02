-- =============================================
-- PROBOX Career Page - Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. JOB LISTINGS TABLE
CREATE TABLE IF NOT EXISTS job_listings (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  department      TEXT NOT NULL,
  location        TEXT NOT NULL,
  location_type   TEXT DEFAULT 'Hybrid',
  employment_type TEXT NOT NULL,
  experience_level TEXT,
  salary          TEXT,
  short_description TEXT,
  description     TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  requirements    TEXT[] DEFAULT '{}',
  application_link TEXT DEFAULT '',
  application_email TEXT DEFAULT '',
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- 2. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id      TEXT REFERENCES job_listings(id) ON DELETE SET NULL,
  job_title   TEXT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  linkedin    TEXT DEFAULT '',
  portfolio   TEXT DEFAULT '',
  message     TEXT DEFAULT '',
  cv_url      TEXT DEFAULT '',
  status      TEXT DEFAULT 'new',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 3. AUTO-UPDATE updated_at ON job_listings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON job_listings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 4. ROW LEVEL SECURITY

-- Enable RLS
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- job_listings: anyone can read published jobs
CREATE POLICY "Public can view published jobs"
  ON job_listings FOR SELECT
  USING (status = 'published');

-- job_listings: authenticated users (admin) have full access
CREATE POLICY "Admin full access to jobs"
  ON job_listings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- applications: anyone can insert (submit an application)
CREATE POLICY "Anyone can submit application"
  ON applications FOR INSERT
  WITH CHECK (true);

-- applications: authenticated users can read all applications
CREATE POLICY "Admin can view applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated');

-- 5. INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_job_listings_status ON job_listings(status);
CREATE INDEX IF NOT EXISTS idx_job_listings_department ON job_listings(department);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at DESC);
