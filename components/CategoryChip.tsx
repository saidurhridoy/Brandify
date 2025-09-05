
import React from 'react';

interface CategoryChipProps {
  category: string;
  isSelected?: boolean;
  onClick: (category: string) => void;
}

const CategoryChip: React.FC<CategoryChipProps> = ({ category, isSelected = false, onClick }) => {
  const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105";
  const selectedClasses = "bg-brand-primary text-white shadow-md";
  const unselectedClasses = "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200";

  return (
    <button
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
      onClick={() => onClick(category)}
    >
      {category}
    </button>
  );
};

export default CategoryChip;
