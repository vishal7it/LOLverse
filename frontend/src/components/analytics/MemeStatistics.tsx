import React from 'react';
import { Meme } from '../../context/MemeContext';
import { Eye, ThumbsUp, ThumbsDown, MessageSquare, TrendingUp as Trending, Calendar } from 'lucide-react';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface MemeStatisticsProps {
  meme: Meme;
  detailed?: boolean;
}

const MemeStatistics: React.FC<MemeStatisticsProps> = ({ meme, detailed = false }) => {
  const netVotes = meme.stats.upvotes - meme.stats.downvotes;
  const upvotePercentage = meme.stats.upvotes + meme.stats.downvotes > 0 
    ? Math.round((meme.stats.upvotes / (meme.stats.upvotes + meme.stats.downvotes)) * 100) 
    : 0;
  
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 ${detailed ? 'divide-y divide-gray-200 dark:divide-gray-700' : ''}`}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Meme Statistics
      </h3>
      
      <div className={`${detailed ? 'py-4' : 'grid grid-cols-2 md:grid-cols-4 gap-4'}`}>
        <div className={`${detailed ? 'flex items-center justify-between mb-4' : ''}`}>
          <div className="flex items-center">
            <Eye className={`${detailed ? 'w-5 h-5 mr-2' : 'w-5 h-5 mr-2'} text-blue-500`} />
            <span className={`${detailed ? 'text-sm' : 'text-sm'} text-gray-700 dark:text-gray-300`}>
              Views
            </span>
          </div>
          <span className={`${detailed ? 'font-semibold' : 'block mt-1 font-semibold'} text-gray-900 dark:text-gray-100`}>
            {meme.stats.views.toLocaleString()}
          </span>
        </div>
        
        <div className={`${detailed ? 'flex items-center justify-between mb-4' : ''}`}>
          <div className="flex items-center">
            <ThumbsUp className={`${detailed ? 'w-5 h-5 mr-2' : 'w-5 h-5 mr-2'} text-green-500`} />
            <span className={`${detailed ? 'text-sm' : 'text-sm'} text-gray-700 dark:text-gray-300`}>
              Upvotes
            </span>
          </div>
          <span className={`${detailed ? 'font-semibold' : 'block mt-1 font-semibold'} text-gray-900 dark:text-gray-100`}>
            {meme.stats.upvotes.toLocaleString()}
          </span>
        </div>
        
        <div className={`${detailed ? 'flex items-center justify-between mb-4' : ''}`}>
          <div className="flex items-center">
            <ThumbsDown className={`${detailed ? 'w-5 h-5 mr-2' : 'w-5 h-5 mr-2'} text-red-500`} />
            <span className={`${detailed ? 'text-sm' : 'text-sm'} text-gray-700 dark:text-gray-300`}>
              Downvotes
            </span>
          </div>
          <span className={`${detailed ? 'font-semibold' : 'block mt-1 font-semibold'} text-gray-900 dark:text-gray-100`}>
            {meme.stats.downvotes.toLocaleString()}
          </span>
        </div>
        
        <div className={`${detailed ? 'flex items-center justify-between mb-4' : ''}`}>
          <div className="flex items-center">
            <MessageSquare className={`${detailed ? 'w-5 h-5 mr-2' : 'w-5 h-5 mr-2'} text-purple-500`} />
            <span className={`${detailed ? 'text-sm' : 'text-sm'} text-gray-700 dark:text-gray-300`}>
              Comments
            </span>
          </div>
          <span className={`${detailed ? 'font-semibold' : 'block mt-1 font-semibold'} text-gray-900 dark:text-gray-100`}>
            {meme.stats.comments.toLocaleString()}
          </span>
        </div>
      </div>
      
      {detailed && (
        <>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Trending className="w-5 h-5 mr-2 text-orange-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Net Votes
                </span>
              </div>
              <span className={`font-semibold ${netVotes >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netVotes > 0 ? `+${netVotes}` : netVotes}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Upvote Ratio
              </span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${upvotePercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {upvotePercentage}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Created
                </span>
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {formatDistanceToNow(new Date(meme.createdAt))} ago
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemeStatistics;