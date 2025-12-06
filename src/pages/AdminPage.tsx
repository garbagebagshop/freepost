import React, { useState, useEffect } from 'react';
import { supabase, Listing } from '../lib/supabase';
import { CheckCircle, XCircle, Eye, Trash2, Flag } from 'lucide-react';
import { formatDate } from '../lib/utils';

export const AdminPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'flagged'>('pending');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchListings();
    }
  }, [isAdmin, filter]);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Admin check error:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      let query = supabase.from('listings').select('*');

      switch (filter) {
        case 'pending':
          query = query.eq('is_approved', false).eq('is_active', true).gt('expires_at', new Date().toISOString());
          break;
        case 'approved':
          query = query.eq('is_approved', true).eq('is_active', true).gt('expires_at', new Date().toISOString());
          break;
        case 'flagged':
          query = query.gt('flagged_count', 0).eq('is_active', true).gt('expires_at', new Date().toISOString());
          break;
      }

      const { data, error } = await query.order('created_at', { ascending: false }).limit(50);

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ is_approved: true, flagged_count: 0 })
        .eq('id', id);

      if (error) throw error;
      fetchListings();
    } catch (error) {
      console.error('Error approving listing:', error);
    }
  };

  const rejectListing = async (id: string) => {
    try {
      const { error } = await supabase
        .from('listings')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      fetchListings();
    } catch (error) {
      console.error('Error rejecting listing:', error);
    }
  };

  const deleteListing = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this listing?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchListings();
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Access Required</h1>
        <p className="text-gray-600 mb-6">You need admin privileges to access this page.</p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <button
            onClick={() => supabase.auth.signInWithOtp({ email: 'admin@freepostindia.com' })}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({listings.length})
          </button>
          
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Approved
          </button>
          
          <button
            onClick={() => setFilter('flagged')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'flagged'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Flagged
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto"></div>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No listings found for the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {listing.description.substring(0, 200)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>Category: {listing.category}</span>
                    <span>City: {listing.city}</span>
                    <span>Posted: {formatDate(listing.created_at)}</span>
                    <span>IP: {listing.posted_ip}</span>
                    {listing.flagged_count > 0 && (
                      <span className="flex items-center space-x-1 text-red-600">
                        <Flag size={12} />
                        <span>Flagged {listing.flagged_count} times</span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <a
                    href={`/listing/${listing.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="View listing"
                  >
                    <Eye size={18} />
                  </a>
                  
                  {!listing.is_approved && (
                    <button
                      onClick={() => approveListing(listing.id)}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors"
                      title="Approve listing"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  
                  <button
                    onClick={() => rejectListing(listing.id)}
                    className="p-2 text-orange-600 hover:text-orange-700 transition-colors"
                    title="Reject/Deactivate listing"
                  >
                    <XCircle size={18} />
                  </button>
                  
                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                    title="Delete listing permanently"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};