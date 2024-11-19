import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { DealCard } from '../components/DealCard';
import { Deal } from '../types/deal';
import { useSearchContext } from '../contexts/SearchContext';

// Sample deals data
const sampleDeals: Deal[] = [
  {
    id: '1',
    title: 'Luxury Spa Day Package with Massage and Facial',
    description: 'Indulge in a full day of pampering with our premium spa package including a 60-minute massage and rejuvenating facial treatment.',
    originalPrice: 200,
    discountedPrice: 99,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80',
    category: 'Beauty & Spas',
    location: 'Downtown Spa & Wellness',
    endDate: '2024-04-30',
    soldCount: 234
  },
  {
    id: '2',
    title: 'Fine Dining Experience for Two',
    description: 'Enjoy a romantic 3-course dinner for two at our award-winning restaurant with wine pairing.',
    originalPrice: 150,
    discountedPrice: 89,
    discountPercentage: 40,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80',
    category: 'Restaurants',
    location: 'Gourmet Heights Restaurant',
    endDate: '2024-04-25',
    soldCount: 156
  },
  {
    id: '3',
    title: 'Adventure Park All-Day Pass',
    description: 'Access all rides and attractions with our all-inclusive day pass. Perfect for the whole family!',
    originalPrice: 80,
    discountedPrice: 45,
    discountPercentage: 44,
    imageUrl: 'https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&q=80',
    category: 'Activities',
    location: 'Thrill Zone Adventure Park',
    endDate: '2024-05-15',
    soldCount: 489
  },
  {
    id: '4',
    title: 'Designer Boutique Shopping Spree',
    description: 'Get $200 worth of latest fashion items from our curated designer collection. Includes personal styling session.',
    originalPrice: 200,
    discountedPrice: 99,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80',
    category: 'Shopping',
    location: 'Luxe Fashion Gallery',
    endDate: '2024-04-28',
    soldCount: 178
  },
  {
    id: '5',
    title: 'Beachfront Resort Weekend Getaway',
    description: '2 nights in a luxury ocean-view suite with breakfast, spa credit, and sunset dinner cruise included.',
    originalPrice: 599,
    discountedPrice: 299,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&q=80',
    category: 'Travel',
    location: 'Seaside Paradise Resort',
    endDate: '2024-05-30',
    soldCount: 89
  },
  {
    id: '6',
    title: 'Professional Photography Session',
    description: '90-minute photo session with expert photographer, including 10 edited digital images and print release.',
    originalPrice: 300,
    discountedPrice: 149,
    discountPercentage: 50,
    imageUrl: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80',
    category: 'Services',
    location: 'Capture Perfect Photography Studio',
    endDate: '2024-05-20',
    soldCount: 142
  }
];

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All Deals');
  const { searchQuery } = useSearchContext();

  const filteredDeals = useMemo(() => {
    return sampleDeals
      .filter(deal => {
        const matchesCategory = selectedCategory === 'All Deals' || deal.category === selectedCategory;
        const matchesSearch = searchQuery.trim() === '' || 
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          deal.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Today's Best Deals
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover amazing discounts from local businesses
          </p>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {filteredDeals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No deals found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DealSpot</h3>
              <p className="text-gray-400">
                Your destination for the best local deals and experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>How It Works</li>
                <li>For Businesses</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to get daily deals in your inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}