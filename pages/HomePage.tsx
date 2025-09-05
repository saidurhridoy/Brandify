
import React, { useState, useMemo } from 'react';
import { MAGAZINES, CATEGORIES } from '../constants';
import MagazineCard from '../components/MagazineCard';
import CategoryChip from '../components/CategoryChip';
import SearchIcon from '../components/icons/SearchIcon';

interface HomePageProps {
  onSelectMagazine: (id: string) => void;
  onStartBooking: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectMagazine, onStartBooking }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredMagazines = useMemo(() => {
    return MAGAZINES.filter(magazine => {
      const matchesSearch = magazine.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? magazine.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-white p-12 rounded-lg shadow-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
          Amplify Your Brand, Effortlessly
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Discover premium magazines and book your advertising space in just a few clicks. The seamless marketplace for impactful branding.
        </p>
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search by brand category or magazine name..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={onStartBooking}
          className="mt-8 px-8 py-3 bg-brand-secondary text-white font-bold rounded-full hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Start Your Branding Journey
        </button>
      </section>
      
      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <CategoryChip category="All" isSelected={selectedCategory === null} onClick={() => setSelectedCategory(null)} />
          {CATEGORIES.map(cat => (
            <CategoryChip
              key={cat}
              category={cat}
              isSelected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      </section>

      {/* Featured Magazines Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Magazines</h2>
        {filteredMagazines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMagazines.map(magazine => (
              <MagazineCard key={magazine.id} magazine={magazine} onClick={onSelectMagazine} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No magazines found. Try adjusting your search or category.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
