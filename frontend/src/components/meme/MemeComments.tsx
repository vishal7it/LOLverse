import React, { useState } from 'react';
import { Meme, useMeme } from '../../context/MemeContext';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Send } from 'lucide-react';

interface MemeCommentsProps {
  meme: Meme;
}

const MemeComments: React.FC<MemeCommentsProps> = ({ meme }) => {
  const { addComment } = useMeme();
  const { isAuthenticated, user, setShowAuthModal } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    if (commentText.trim()) {
      addComment(meme.id, commentText.trim());
      setCommentText('');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Comments ({meme.comments.length})
      </h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={isAuthenticated ? "Add a comment..." : "Login to comment"}
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            maxLength={140}
            disabled={!isAuthenticated}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed"
            disabled={!isAuthenticated || !commentText.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
          {commentText.length}/140
        </div>
      </form>
      
      {meme.comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No comments yet. Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {meme.comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <div className="flex items-start gap-3">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.username} 
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {comment.user.username}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeComments;