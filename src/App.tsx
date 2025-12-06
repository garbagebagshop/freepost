import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { SearchPage } from './pages/SearchPage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { AdminPage } from './pages/AdminPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { SafetyTipsPage } from './pages/SafetyTipsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { ContactPage } from './pages/ContactPage';

const SEOHead: React.FC = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    const getPageMeta = () => {
      switch (location.pathname) {
        case '/':
          return {
            title: 'FreePostIndia.com - India\'s Fastest Free Classifieds | Post Free Ads',
            description: 'Post free classified ads instantly on FreePostIndia.com. Buy and sell cars, electronics, jobs, services & more. No registration required. Fastest free posting sites in India.',
            keywords: 'free classified posting, free posting sites, free classifieds India, post free ad India, buy sell online India, free classified ads'
          };
        case '/post':
          return {
            title: 'Post Free Ad - FreePostIndia.com | Free Classified Posting',
            description: 'Post your classified ad for free instantly. Cars, electronics, jobs, services, real estate & more. No registration required.',
            keywords: 'post free ad, free classified posting, sell online India, free ads'
          };
        case '/search':
          return {
            title: 'Search Free Classifieds - FreePostIndia.com',
            description: 'Search thousands of free classified ads. Find cars, electronics, jobs, services, real estate and more across India.',
            keywords: 'search classifieds, buy online, classified ads search, find deals'
          };
        case '/safety-tips':
          return {
            title: 'Safety Tips - FreePostIndia.com | Safe Online Trading',
            description: 'Essential safety tips for buying and selling online. Learn how to stay safe during transactions and avoid scams.',
            keywords: 'online safety, classified safety, avoid scams, safe trading'
          };
        default:
          return {
            title: 'FreePostIndia.com - Free Classifieds',
            description: 'Free classified ads platform for India',
            keywords: 'free classifieds, India'
          };
      }
    };

    const meta = getPageMeta();
    
    document.title = meta.title;
    
    // Update meta description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', meta.description);

    // Update meta keywords
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!keywordsMeta) {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsMeta);
    }
    keywordsMeta.setAttribute('content', meta.keywords);

    // Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', meta.title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', meta.description);

    // Twitter Card tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement('meta');
      twitterTitle.setAttribute('name', 'twitter:title');
      document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', meta.title);

    let twitterDesc = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDesc) {
      twitterDesc = document.createElement('meta');
      twitterDesc.setAttribute('name', 'twitter:description');
      document.head.appendChild(twitterDesc);
    }
    twitterDesc.setAttribute('content', meta.description);

  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <SEOHead />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/safety-tips" element={<SafetyTipsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "FreePostIndia.com",
              "alternateName": "Free Post India",
              "url": "https://freepostindia.com",
              "description": "India's fastest free classified advertising platform. Post and browse free ads for cars, electronics, jobs, services and more.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://freepostindia.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "sameAs": [
                "https://freepostindia.com"
              ]
            })
          }}
        />
      </div>
    </Router>
  );
}

export default App;