import React from 'react';
import MemeCard from './MemeCard';
import { useMeme, Meme } from '../../context/MemeContext';

interface MemeGridProps {
  memes?: Meme[];
  title?: string;
  emptyMessage?: string;
}

const MemeGrid: React.FC<MemeGridProps> = ({ 
  memes: propMemes, 
  title = "Latest Memes", 
  emptyMessage = "No memes found" 
}) => {
  const { memes: contextMemes } = useMeme();
  const memes = propMemes || contextMemes;

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h2>
      )}
      
      {memes.length === 0 ? (
        <div className="flex items-center justify-center h-48 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memes.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MemeGrid;