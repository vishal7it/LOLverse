import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import MemeComments from '../components/meme/MemeComments';
import MemeStatistics from '../components/analytics/MemeStatistics';
import { ArrowLeft, Edit2, Trash2, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MemeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMeme, addView, deleteMeme } = useMeme();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const meme = getMeme(id || '');
  
  useEffect(() => {
    if (id && meme) {
      addView(id);
    }
  }, [id, meme, addView]);
  
  if (!meme) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-600 dark:text-gray-400 mb-4">Meme not found</p>
        <Link 
          to="/"
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Back to Feed
        </Link>
      </div>
    );
  }
  
  const isOwner = user && user.id === meme.createdBy.id;
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      deleteMeme(meme.id);
      navigate('/dashboard');
    }
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          to="/"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Feed</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img 
                src={meme.imageUrl} 
                alt={`${meme.topText} ${meme.bottomText}`.trim()} 
                className="w-full object-contain"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-4 text-center text-white text-shadow-lg">
                {meme.topText && (
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
                    {meme.topText}
                  </h3>
                )}
                {meme.bottomText && (
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
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
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {meme.createdBy.username}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(meme.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {isOwner && (
                    <>
                      <Link
                        to={`/edit/${meme.id}`}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={handleDelete}
                        className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {meme.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <MemeComments meme={meme} />
        </div>
        
        <div>
          <MemeStatistics meme={meme} detailed />
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;