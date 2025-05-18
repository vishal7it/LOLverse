import React from 'react';
import { useMeme } from '../context/MemeContext';
import MemeGrid from '../components/meme/MemeGrid';
import { Flame, Clock, Calendar, Award } from 'lucide-react';

const Home: React.FC = () => {
  const { currentSort, setCurrentSort } = useMeme();
  
  const sortOptions = [
    { value: 'new', label: 'New', icon: <Clock className="w-4 h-4 mr-1" /> },
    { value: 'top-day', label: 'Top Today', icon: <Flame className="w-4 h-4 mr-1" /> },
    { value: 'top-week', label: 'Top Week', icon: <Calendar className="w-4 h-4 mr-1" /> },
    { value: 'top-all', label: 'All Time', icon: <Award className="w-4 h-4 mr-1" /> },
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Meme Feed</h1>
        <p className="text-gray-600 dark:text-gray-400">Discover the latest and greatest memes from the community</p>
      </div>
      
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setCurrentSort(option.value as any)}
            className={`flex items-center px-4 py-2 border-b-2 -mb-px font-medium text-sm transition-colors duration-200 whitespace-nowrap ${
              currentSort === option.value
                ? 'border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
      
      <MemeGrid title="" />
    </div>
  );
};

export default Home;