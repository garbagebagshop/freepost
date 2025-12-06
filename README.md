# FreePostIndia.com - Ultra-Lightweight Classifieds Web App

A fully functional, ultra-lightweight, text-only classifieds website built with React, TypeScript, Tailwind CSS, and Supabase. Optimized for speed, SEO, and mobile-first experience.

## 🚀 Features

### Core Functionality
- **Free Classified Posting** - Users can post text-only ads without registration
- **Full-Text Search** - Search across titles, descriptions, tags, and cities
- **Category Filtering** - Browse by 11+ categories (cars, electronics, jobs, etc.)
- **Admin Dashboard** - Approve/reject listings, manage flagged content
- **Spam Prevention** - Rate limiting, CAPTCHA, profanity filtering
- **Mobile-First Design** - Responsive, ultra-fast loading

### Technical Features
- **Ultra-Lightweight** - Minimal dependencies, system fonts only
- **SEO Optimized** - JSON-LD structured data, meta tags, sitemap
- **Performance Focused** - Target Lighthouse score ≥90 mobile
- **Secure Backend** - Supabase with Row Level Security (RLS)
- **Production Ready** - Ready for Netlify deployment

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + RLS + Auth)
- **Routing**: React Router
- **Icons**: Lucide React
- **Deployment**: Netlify/Vercel ready
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 16+ and npm
- Supabase account
- Netlify account (for deployment)

## ⚡ Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd freepostindia
npm install
```

### 2. turso Setup


```

### 3. Database Setup

**CRITICAL: You must create the database tables manually before the app will work!**

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `MANUAL_DATABASE_SETUP.sql` from this project
3. Paste it into the SQL Editor and click **Run**
4. **IMPORTANT**: Change the admin email in the script from `admin@freepostindia.com` to your actual email address
5. This creates all tables, RLS policies, indexes, and auto-deletion features required for the app

**Without this step, you'll get "relation 'public.listings' does not exist" errors!**

### 3. Auto-Deletion Setup (Optional)

To automatically clean up expired listings (older than 30 days):

1. **Option A: Manual Cleanup** - Run this SQL query periodically:
   ```sql
   SELECT cleanup_expired_listings();
   ```

2. **Option B: Scheduled Function** - Deploy the cleanup edge function:
   - The `supabase/functions/cleanup-expired/index.ts` function is included
   - Set up a cron job or external scheduler to call this function daily
   - URL: `https://your-project.supabase.co/functions/v1/cleanup-expired`

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your app running!

## 🚢 Deployment

### Deploy to Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

3. **Environment Variables in Netlify**:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key
   ```

4. **Custom Domain** (optional):
   - Add your domain in Netlify DNS settings
   - Update VITE_SITE_URL in environment variables

### Deploy to Vercel

Similar process, but use Vercel CLI or dashboard instead.

## 👨‍💼 Admin Setup

### 1. Add Admin User
In Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (email) VALUES ('your-admin-email@domain.com');
```

### 2. Admin Authentication
- Go to `/admin` on your deployed site
- Use Supabase Auth to sign in with your admin email
- You'll receive a magic link to access the admin dashboard

### 3. Admin Features
- **Approve/Reject Listings** - Review all submitted ads
- **View Flagged Content** - Handle user reports
- **Bulk Actions** - Delete multiple listings
- **IP Management** - Monitor posting patterns

## 🔧 Configuration

### Categories
Edit categories in `src/lib/supabase.ts`:
```typescript
export const categories = [
  'cars', 'motorcycles', 'electronics', 'furniture',
  'jobs', 'services', 'real-estate', 'books',
  'clothing', 'sports', 'other'
];
```

### Rate Limiting
Modify rate limits in `src/lib/utils.ts`:
```typescript
// Current: 1 post per IP per 24 hours
const hoursElapsed = (now.getTime() - lastPost.getTime()) / (1000 * 60 * 60);
return hoursElapsed >= 24; // Change 24 to desired hours
```

### Spam Filter
Update profanity filter in `src/lib/utils.ts`:
```typescript
const badWords = ['spam', 'scam', 'fake']; // Add more words
```

## 📊 Database Schema

### Main Tables

1. **listings** - All classified ads
   - `id`, `title`, `description`, `category`, `city`
   - `tags[]`, `price`, `contact_email`, `contact_phone`
   - `posted_ip`, `is_approved`, `is_active`, `flagged_count`

2. **admin_users** - Admin accounts
   - `id`, `email`, `created_at`

3. **ip_rate_limits** - Spam prevention
   - `ip_address`, `last_post_at`, `post_count`

### Security (RLS Policies)
- Public can read approved, active listings
- Public can insert new listings (require approval)
- Only admins can approve/delete listings
- IP-based rate limiting enforced

## 🎨 Customization

### Styling
- All styles in Tailwind CSS classes
- Color scheme: Blue (#3B82F6), Gray scale, Red accents
- System fonts for maximum performance
- Mobile-first responsive design

### Performance Optimizations
- Minimal JavaScript bundle size
- No external fonts (system fonts only)
- Inline critical CSS
- Deferred non-critical JavaScript
- Optimized images (external URLs only)

## 🔒 Security Features

1. **Row Level Security** - Database-level access control
2. **Rate Limiting** - Prevents spam (1 post/IP/24h)
3. **Input Validation** - Client and server-side validation
4. **CAPTCHA Protection** - Basic bot prevention
5. **IP Logging** - Track posting patterns
6. **Content Moderation** - Admin approval required

## 📈 SEO Features

- **Meta Tags** - Dynamic title/description per page
- **JSON-LD Structured Data** - Rich snippets for Google
- **Open Graph** - Social media sharing
- **Twitter Cards** - Enhanced Twitter sharing
- **Sitemap** - `/public/sitemap.xml`
- **Robots.txt** - Search engine guidelines
- **RSS Feed** - `/public/rss.xml`

## 🎯 Performance Targets

- **Lighthouse Performance Score**: ≥90 mobile
- **First Contentful Paint**: <2s
- **Bundle Size**: <200KB gzipped
- **Time to Interactive**: <3s on 3G

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Check environment variables
   - Verify Supabase URL and key
   - Ensure RLS policies are enabled

2. **Admin Dashboard Access**
   - Verify email in admin_users table
   - Check Supabase Auth configuration
   - Enable email authentication in Supabase

3. **Listings Not Appearing**
   - Check if listing is approved (`is_approved = true`)
   - Verify RLS policies allow public read access
   - Check listing is active (`is_active = true`)

4. **Search Not Working**
   - Ensure full-text search index exists
   - Check search query syntax
   - Verify database permissions

### Performance Issues
- Check bundle size with `npm run build`
- Verify no large dependencies added
- Ensure images are external URLs only
- Test on slow 3G connection

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 💬 Support

For technical issues:
1. Check this README first
2. Search existing GitHub issues
3. Create a new issue with detailed description

For business inquiries, use the contact form on the deployed website.

---

**Built with ❤️ for the Indian classified ads community**

**Disclaimer**: This platform does not handle transactions or payments. Users trade at their own risk.
