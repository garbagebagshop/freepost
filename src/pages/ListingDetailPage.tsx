import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Tag, Mail, Phone, Flag, ArrowLeft, Share2 } from 'lucide-react';
import { supabase, Listing, categoryLabels } from '../lib/supabase';
import { formatDate } from '../lib/utils';

export const ListingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [flagging, setFlagging] = useState(false);

  useEffect(() => {
    if (id) {
      fetchListing(id);
    }
  }, [id]);

  const fetchListing = async (listingId: string) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', listingId)
        .eq('is_approved', true)
        .eq('is_active', true)
        .gt('expires_at', new Date().toISOString())
        .maybeSingle();

      if (error) throw error;
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlag = async () => {
    if (!listing || flagging) return;

    setFlagging(true);
    try {
      const { error } = await supabase
        .from('listings')
        .update({ flagged_count: listing.flagged_count + 1 })
        .eq('id', listing.id);

      if (error) throw error;
      
      alert('Thank you for reporting. We will review this listing.');
      setListing(prev => prev ? { ...prev, flagged_count: prev.flagged_count + 1 } : null);
    } catch (error) {
      console.error('Error flagging listing:', error);
      alert('Failed to report listing. Please try again.');
    } finally {
      setFlagging(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing?.title,
          text: listing?.description.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-1 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-1 w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
        <p className="text-gray-600 mb-6">
          This listing may have been removed or is no longer available.
        </p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link 
          to="/search" 
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Search</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          
          <button
            onClick={handleFlag}
            disabled={flagging}
            className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            <Flag size={18} />
            <span>{flagging ? 'Reporting...' : 'Report'}</span>
          </button>
        </div>
      </div>

      {/* Listing Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <Tag size={16} />
              <span>{categoryLabels[listing.category]}</span>
            </span>
            
            <span className="flex items-center space-x-1">
              <MapPin size={16} />
              <span>{listing.city}</span>
            </span>
            
            <span className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>Posted {formatDate(listing.created_at)}</span>
            </span>
          </div>
        </div>

        {/* Price */}
        {listing.price && (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <span className="text-2xl font-bold text-green-800">{listing.price}</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        {listing.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {listing.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          {/* Safety Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>Safety First:</strong> Always meet in public places, verify items before payment, 
              and never send money in advance. We are not responsible for transactions.
            </p>
          </div>

          <div className="space-y-3">
            {listing.contact_email && (
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-600" size={20} />
                <a 
                  href={`mailto:${listing.contact_email}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {listing.contact_email}
                </a>
              </div>
            )}
            
            {listing.contact_phone && (
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-600" size={20} />
                <a 
                  href={`tel:${listing.contact_phone}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {listing.contact_phone}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-500 text-sm">
            <strong>Disclaimer:</strong> FreePostIndia.com is not responsible for transactions between buyers and sellers. 
            We do not verify listings or collect payments. Please exercise caution and follow our{' '}
            <Link to="/safety-tips" className="text-blue-600 hover:underline">safety guidelines</Link>.
          </p>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": listing.title,
            "description": listing.description,
            "category": categoryLabels[listing.category],
            "location": {
              "@type": "Place",
              "name": listing.city
            },
            ...(listing.price && {
              "offers": {
                "@type": "Offer",
                "price": listing.price,
                "availability": "https://schema.org/InStock"
              }
            }),
            "datePosted": listing.created_at,
            "url": window.location.href
          })
        }}
      />
    </div>
  );
};