
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-bold">
              <span className="text-brand-secondary">Brand</span>ify Marketplace
            </h2>
            <p className="text-gray-400 mt-1">Your one-stop ad booking platform.</p>
          </div>
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Brandify. All rights reserved.</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
