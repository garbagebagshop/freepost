import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, PlusCircle, TrendingUp } from 'lucide-react';
import { supabase, Listing, categories, categoryLabels } from '../lib/supabase';
import { ListingCard } from '../components/ListingCard';
import { DisclaimerBanner } from '../components/DisclaimerBanner';

export const HomePage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLatestListings();
  }, []);

  const fetchLatestListings = async () => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          India's Fastest Free Classifieds
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Post your ads instantly. Reach millions of buyers. No registration required. 
          Completely free forever.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            to="/post" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Post Free Ad Now</span>
          </Link>
          
          <Link 
            to="/search" 
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
          >
            <Search size={20} />
            <span>Browse All Ads</span>
          </Link>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cars, jobs, services..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <DisclaimerBanner />

      {/* Popular Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="mr-2" size={24} />
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/search?category=${category}`}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md hover:border-blue-300 transition-all"
            >
              <h3 className="font-medium text-gray-900">{categoryLabels[category]}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Listings */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Ads</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-2 bg-gray-300 rounded mb-1"></div>
                <div className="h-2 bg-gray-300 rounded mb-1 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No listings found. Be the first to post!</p>
            <Link 
              to="/post" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Your First Ad
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link 
                to="/search" 
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View All Listings
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};