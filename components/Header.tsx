
import React from 'react';

interface HeaderProps {
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={onLogoClick}
          >
            <h1 className="text-2xl font-bold text-brand-primary">
              <span className="text-brand-secondary">Brand</span>ify
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="text-gray-600 hover:text-brand-primary transition duration-150 ease-in-out">Home</a>
            <a href="#" className="text-gray-600 hover:text-brand-primary transition duration-150 ease-in-out">About</a>
            <a href="#" className="text-gray-600 hover:text-brand-primary transition duration-150 ease-in-out">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
