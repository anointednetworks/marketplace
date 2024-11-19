import React from 'react';
import { Clock, MapPin, ShoppingBag } from 'lucide-react';
import { Deal } from '../types/deal';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden glow-effect">
      <div className="relative">
        <img 
          src={deal.imageUrl} 
          alt={deal.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          {deal.discountPercentage}% OFF
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <MapPin size={16} />
          <span>{deal.location}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {deal.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {deal.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-2xl font-bold text-green-600 dark:text-green-500">
              ${deal.discountedPrice}
            </span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
              ${deal.originalPrice}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <ShoppingBag size={16} />
            <span>{deal.soldCount} bought</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Clock size={16} />
          <span>Ends {new Date(deal.endDate).toLocaleDateString()}</span>
        </div>

        <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg button-glow">
          View Deal
        </button>
      </div>
    </div>
  );
}