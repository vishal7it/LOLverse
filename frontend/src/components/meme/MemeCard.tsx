import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MessageSquare, Eye, Share2 } from 'lucide-react';
import { Meme, useMeme } from '../../context/MemeContext';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface MemeCardProps {
  meme: Meme;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const { upvoteMeme, downvoteMeme } = useMeme();
  const [hasVoted, setHasVoted] = useState<'up' | 'down' | null>(null);

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (hasVoted !== 'up') {
      upvoteMeme(meme.id);
      setHasVoted('up');
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (hasVoted !== 'down') {
      downvoteMeme(meme.id);
      setHasVoted('down');
    }
  };

  const netVotes = meme.stats.upvotes - meme.stats.downvotes;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/meme/${meme.id}`} className="block">
        <div className="relative">
          <img 
            src={meme.imageUrl} 
            alt={`${meme.topText} ${meme.bottomText}`.trim()} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4 text-center text-white text-shadow-lg">
            {meme.topText && (
              <h3 className="text-2xl font-bold uppercase tracking-wider">
                {meme.topText}
              </h3>
            )}
            {meme.bottomText && (
              <h3 className="text-2xl font-bold uppercase tracking-wider">
                {meme.bottomText}
              </h3>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <img
                src={meme.createdBy.avatar}
                alt={meme.createdBy.username}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {meme.createdBy.username}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(meme.createdAt))}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {meme.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full px-2 py-0.5 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <button
                onClick={handleUpvote}
                className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  hasVoted === 'up' ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownvote}
                className={`p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  hasVoted === 'down' ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {netVotes > 0 ? `+${netVotes}` : netVotes}
              </span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs">{meme.stats.comments}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-xs">{meme.stats.views}</span>
            </div>
          </div>
          
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;