/*
  # Create Listings Table for Classifieds Platform

  ## Overview
  This migration creates the core database schema for a free classifieds platform similar to Craigslist.
  Users can post ads without registration, and listings automatically expire after 30 days.

  ## New Tables
  
  ### `listings`
  Main table storing all classified ads with the following columns:
  - `id` (uuid, primary key) - Unique identifier for each listing
  - `title` (text, required) - Listing title/headline
  - `description` (text, required) - Full description of the listing
  - `category` (text, required) - Category classification (cars, jobs, services, etc.)
  - `city` (text, required) - City where the listing is located
  - `tags` (text array, default empty) - Searchable tags for filtering
  - `price` (text, optional) - Price or price range (stored as text for flexibility)
  - `contact_email` (text, optional) - Contact email for the poster
  - `contact_phone` (text, optional) - Contact phone number
  - `posted_ip` (text, optional) - IP address of poster (for abuse prevention)
  - `posted_by` (text, required) - Anonymous identifier for poster
  - `created_at` (timestamptz) - When the listing was created
  - `expires_at` (timestamptz) - When the listing expires (30 days after creation)
  - `is_active` (boolean, default true) - Whether listing is currently active
  - `is_approved` (boolean, default true) - Moderation status
  - `flagged_count` (integer, default 0) - Number of times users flagged this listing

  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `listings` table
  - Public read access for approved, active, non-expired listings
  - Public insert access (anyone can post without authentication)
  - Only authenticated admin users can update or delete listings

  ### Policies
  1. **Public Read Policy** - Anyone can view approved, active listings that haven't expired
  2. **Public Insert Policy** - Anyone can create new listings without authentication
  3. **Admin Update Policy** - Only authenticated users can update listings (for moderation)
  4. **Admin Delete Policy** - Only authenticated users can delete listings (for moderation)

  ## Indexes
  - Index on `category` for fast category filtering
  - Index on `city` for location-based searches
  - Index on `created_at` for chronological sorting
  - Index on `expires_at` for cleanup queries
  - Full-text search index on `title` and `description`

  ## Important Notes
  - Listings automatically expire 30 days after creation
  - No user authentication required for posting (anonymous posting enabled)
  - Moderation is handled through `is_approved` flag
  - IP tracking helps prevent spam and abuse
*/

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  city text NOT NULL,
  tags text[] DEFAULT '{}',
  price text,
  contact_email text,
  contact_phone text,
  posted_ip text,
  posted_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  is_active boolean DEFAULT true,
  is_approved boolean DEFAULT true,
  flagged_count integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone can view approved, active, non-expired listings
CREATE POLICY "Public can view approved active listings"
  ON listings
  FOR SELECT
  USING (
    is_approved = true 
    AND is_active = true 
    AND expires_at > now()
  );

-- Policy 2: Anyone can insert new listings (anonymous posting)
CREATE POLICY "Public can insert listings"
  ON listings
  FOR INSERT
  WITH CHECK (true);

-- Policy 3: Only authenticated users can update listings (for moderation)
CREATE POLICY "Authenticated users can update listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Only authenticated users can delete listings (for moderation)
CREATE POLICY "Authenticated users can delete listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_city ON listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_expires_at ON listings(expires_at);
CREATE INDEX IF NOT EXISTS idx_listings_approved_active ON listings(is_approved, is_active) WHERE is_approved = true AND is_active = true;

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_listings_search ON listings USING gin(to_tsvector('english', title || ' ' || description));