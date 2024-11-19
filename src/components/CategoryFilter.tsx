import React from 'react';
import { Tag } from 'lucide-react';

const categories = [
  'All Deals',
  'Restaurants',
  'Beauty & Spas',
  'Activities',
  'Shopping',
  'Travel',
  'Services'
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto py-4 scrollbar-hide">
      <Tag className="text-blue-600 dark:text-blue-400" size={20} />
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors button-glow ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}