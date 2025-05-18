import React from 'react';
import { Heart } from 'lucide-react';
import { useUI } from '../../context/UIContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useUI();
  
  return (
    <footer className={`py-6 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border-t border-gray-200 dark:border-gray-700`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              MemeHub
            </span>
            <p className="text-sm mt-1">The Internet's Playground for Memes</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm hover:text-purple-500 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-purple-500 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-purple-500 transition-colors duration-200">
              Community Guidelines
            </a>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-pink-500" /> in 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;