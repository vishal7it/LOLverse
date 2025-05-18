import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMeme, Meme } from '../context/MemeContext';
import MemeGrid from '../components/meme/MemeGrid';
import { Plus, SortAsc, SortDesc, BarChart2, List } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { userMemes } = useMeme();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const [sortOption, setSortOption] = useState<'newest' | 'popular'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  if (!isAuthenticated) {
    setShowAuthModal(true);
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg mt-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Please log in to view your dashboard</p>
      </div>
    );
  }
  
  const sortedMemes = [...userMemes].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes);
    }
  });
  
  const MemeListItem: React.FC<{ meme: Meme }> = ({ meme }) => {
    const netVotes = meme.stats.upvotes - meme.stats.downvotes;
    
    return (
      <Link to={`/meme/${meme.id}`} className="block">
        <div className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
          <img 
            src={meme.imageUrl} 
            alt={`${meme.topText} ${meme.bottomText}`.trim()} 
            className="w-16 h-16 object-cover rounded mr-4"
          />
          <div className="flex-grow min-w-0">
            <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {meme.topText ? meme.topText : 'Untitled meme'}
            </div>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{new Date(meme.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{meme.tags.length > 0 ? meme.tags.map(tag => `#${tag}`).join(', ') : 'No tags'}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 ml-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{meme.stats.views}</span> views
            </div>
            <div className="text-sm">
              <span className={`font-medium ${netVotes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netVotes > 0 ? `+${netVotes}` : netVotes}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Your Memes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your meme collection and track their performance
          </p>
        </div>
        <Link 
          to="/create"
          className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span>Create New</span>
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button
            onClick={() => setSortOption('newest')}
            className={`flex items-center px-3 py-1.5 rounded-l-md border ${
              sortOption === 'newest'
                ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
            }`}
          >
            <SortDesc className="w-4 h-4 mr-1" />
            <span>Newest</span>
          </button>
          <button
            onClick={() => setSortOption('popular')}
            className={`flex items-center px-3 py-1.5 rounded-r-md border ${
              sortOption === 'popular'
                ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
            }`}
          >
            <SortAsc className="w-4 h-4 mr-1" />
            <span>Popular</span>
          </button>
        </div>
        
        <div className="flex">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center p-1.5 rounded-l-md border ${
              viewMode === 'grid'
                ? 'bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center p-1.5 rounded-r-md border ${
              viewMode === 'list'
                ? 'bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
                : 'bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {sortedMemes.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg mt-8">
          <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any memes yet</p>
          <Link 
            to="/create"
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Create First Meme</span>
          </Link>
        </div>
      ) : (
        viewMode === 'grid' ? (
          <MemeGrid 
            memes={sortedMemes} 
            title="" 
            emptyMessage="You haven't created any memes yet" 
          />
        ) : (
          <div className="space-y-2">
            {sortedMemes.map((meme) => (
              <MemeListItem key={meme.id} meme={meme} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Dashboard;