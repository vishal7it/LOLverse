import React from 'react';
import MemeCreator from '../components/meme/MemeCreator';

const Create: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create a Meme</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a template, customize your text, and share your creation with the world
        </p>
      </div>
      
      <MemeCreator />
    </div>
  );
};

export default Create;