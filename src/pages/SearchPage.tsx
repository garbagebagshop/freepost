import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { supabase, Listing, categories, categoryLabels } from '../lib/supabase';
import { ListingCard } from '../components/ListingCard';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    performSearch();
  }, [query, selectedCategory, selectedCity, sortBy, currentPage]);

  const performSearch = async () => {
    setLoading(true);
    
    try {
      let queryBuilder = supabase
        .from('listings')
        .select('*', { count: 'exact' })
        .eq('is_approved', true)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString());

      // Apply text search
      if (query.trim()) {
        const searchTerm = query.trim();
        queryBuilder = queryBuilder.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply category filter
      if (selectedCategory) {
        queryBuilder = queryBuilder.eq('category', selectedCategory);
      }

      // Apply city filter
      if (selectedCity) {
        queryBuilder = queryBuilder.ilike('city', `%${selectedCity}%`);
      }

      // Apply sorting
      switch (sortBy) {
        case 'oldest':
          queryBuilder = queryBuilder.order('created_at', { ascending: true });
          break;
        case 'title':
          queryBuilder = queryBuilder.order('title', { ascending: true });
          break;
        default:
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      queryBuilder = queryBuilder.range(from, to);

      const { data, error, count } = await queryBuilder;

      if (error) throw error;

      setListings(data || []);
      setTotalCount(count || 0);

    } catch (error) {
      console.error('Search error:', error);
      setListings([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    updateURL();
  };

  const updateURL = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedCity.trim()) params.set('city', selectedCity.trim());
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setSelectedCity('');
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Classifieds</h1>

      {/* Search Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for cars, jobs, services, electronics..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            {(selectedCategory || selectedCity || query || sortBy !== 'newest') && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
              >
                <X size={16} />
                <span>Clear all</span>
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {categoryLabels[category]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          {loading ? 'Searching...' : `Found ${totalCount} results`}
          {query && ` for "${query}"`}
          {selectedCategory && ` in ${categoryLabels[selectedCategory]}`}
          {selectedCity && ` in ${selectedCity}`}
        </p>
      </div>

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
          <p className="text-gray-600 mb-4">No listings found matching your criteria.</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              <span className="px-4 py-2 text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};