
import React from 'react';
import { Magazine } from '../types';

interface MagazineCardProps {
  magazine: Magazine;
  onClick: (id: string) => void;
}

const MagazineCard: React.FC<MagazineCardProps> = ({ magazine, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
      onClick={() => onClick(magazine.id)}
    >
      <div className="relative">
        <img src={magazine.thumbnailUrl} alt={magazine.name} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
           <span className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Profile</span>
        </div>
      </div>
      <div className="p-4">
        <span className="inline-block bg-brand-secondary text-white text-xs font-semibold px-2 py-1 rounded-full uppercase">{magazine.category}</span>
        <h3 className="text-xl font-bold mt-2 text-brand-dark">{magazine.name}</h3>
        <p className="text-gray-600 mt-1 text-sm truncate">{magazine.description}</p>
      </div>
    </div>
  );
};

export default MagazineCard;
