import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Listing } from '../lib/supabase';
import { formatDate, truncateText } from '../lib/utils';
import { categoryLabels } from '../lib/supabase';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <Link to={`/listing/${listing.id}`} className="block">
        <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
          {listing.title}
        </h3>
        
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {truncateText(listing.description, 150)}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center space-x-1">
            <Tag size={14} />
            <span>{categoryLabels[listing.category]}</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>{listing.city}</span>
          </span>
          
          <span className="flex items-center space-x-1">
            <Calendar size={14} />
            <span>{formatDate(listing.created_at)}</span>
          </span>
        </div>
        
        {listing.price && (
          <div className="mt-3">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
              {listing.price}
            </span>
          </div>
        )}
        
        {listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {listing.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {listing.tags.length > 3 && (
              <span className="text-gray-500 text-xs">+{listing.tags.length - 3} more</span>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};