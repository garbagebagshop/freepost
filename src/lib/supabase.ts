import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  city: string;
  tags: string[];
  price?: string;
  contact_email?: string;
  contact_phone?: string;
  posted_ip?: string;
  posted_by: string;
  created_at: string;
  expires_at: string;
  is_active: boolean;
  is_approved: boolean;
  flagged_count: number;
};

export const categories = [
  'cars',
  'motorcycles', 
  'electronics',
  'furniture',
  'jobs',
  'services',
  'real-estate',
  'books',
  'clothing',
  'sports',
  'other'
] as const;

export const categoryLabels: Record<string, string> = {
  'cars': 'Cars & Vehicles',
  'motorcycles': 'Motorcycles & Scooters',
  'electronics': 'Electronics & Gadgets',
  'furniture': 'Furniture & Appliances',
  'jobs': 'Jobs & Employment',
  'services': 'Services',
  'real-estate': 'Real Estate',
  'books': 'Books & Education',
  'clothing': 'Clothing & Fashion',
  'sports': 'Sports & Fitness',
  'other': 'Other'
};