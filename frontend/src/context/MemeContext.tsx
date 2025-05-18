import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockMemes, mockTemplates } from '../data/mockData';
import { useAuth } from './AuthContext';

export type Meme = {
  id: string;
  imageUrl: string;
  topText: string;
  bottomText: string;
  tags: string[];
  createdAt: string;
  createdBy: {
    id: string;
    username: string;
    avatar: string;
  };
  stats: {
    views: number;
    upvotes: number;
    downvotes: number;
    comments: number;
  };
  comments: {
    id: string;
    text: string;
    createdAt: string;
    user: {
      id: string;
      username: string;
      avatar: string;
    };
  }[];
};

export type Template = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
};

type SortOption = 'new' | 'top-day' | 'top-week' | 'top-all';

type MemeContextType = {
  memes: Meme[];
  templates: Template[];
  userMemes: Meme[];
  currentSort: SortOption;
  setCurrentSort: (sort: SortOption) => void;
  createMeme: (meme: Partial<Meme>) => void;
  updateMeme: (id: string, updates: Partial<Meme>) => void;
  deleteMeme: (id: string) => void;
  getMeme: (id: string) => Meme | undefined;
  upvoteMeme: (id: string) => void;
  downvoteMeme: (id: string) => void;
  addComment: (memeId: string, text: string) => void;
  addView: (id: string) => void;
};

const MemeContext = createContext<MemeContextType | undefined>(undefined);

export const useMeme = () => {
  const context = useContext(MemeContext);
  if (context === undefined) {
    throw new Error('useMeme must be used within a MemeProvider');
  }
  return context;
};

export const MemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memes, setMemes] = useState<Meme[]>(mockMemes);
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [currentSort, setCurrentSort] = useState<SortOption>('new');
  const { user } = useAuth();

  const userMemes = memes.filter(meme => meme.createdBy.id === user?.id);

  const getSortedMemes = () => {
    switch (currentSort) {
      case 'new':
        return [...memes].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'top-day':
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        return [...memes]
          .filter(meme => new Date(meme.createdAt) >= oneDayAgo)
          .sort((a, b) => 
            (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
          );
      case 'top-week':
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return [...memes]
          .filter(meme => new Date(meme.createdAt) >= oneWeekAgo)
          .sort((a, b) => 
            (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
          );
      case 'top-all':
        return [...memes].sort((a, b) => 
          (b.stats.upvotes - b.stats.downvotes) - (a.stats.upvotes - a.stats.downvotes)
        );
      default:
        return memes;
    }
  };

  useEffect(() => {
    // In a real app, we would fetch memes and templates from an API
    // For now, we're using mock data
  }, []);

  const createMeme = (meme: Partial<Meme>) => {
    if (!user) return;
    
    const newMeme: Meme = {
      id: `meme-${Date.now()}`,
      imageUrl: meme.imageUrl || '',
      topText: meme.topText || '',
      bottomText: meme.bottomText || '',
      tags: meme.tags || [],
      createdAt: new Date().toISOString(),
      createdBy: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
      stats: {
        views: 0,
        upvotes: 0,
        downvotes: 0,
        comments: 0,
      },
      comments: [],
    };
    
    setMemes(prevMemes => [newMeme, ...prevMemes]);
  };

  const updateMeme = (id: string, updates: Partial<Meme>) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id ? { ...meme, ...updates } : meme
      )
    );
  };

  const deleteMeme = (id: string) => {
    setMemes(prevMemes => prevMemes.filter(meme => meme.id !== id));
  };

  const getMeme = (id: string) => {
    return memes.find(meme => meme.id === id);
  };

  const upvoteMeme = (id: string) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id 
          ? { 
              ...meme, 
              stats: { 
                ...meme.stats, 
                upvotes: meme.stats.upvotes + 1 
              } 
            } 
          : meme
      )
    );
  };

  const downvoteMeme = (id: string) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id 
          ? { 
              ...meme, 
              stats: { 
                ...meme.stats, 
                downvotes: meme.stats.downvotes + 1 
              } 
            } 
          : meme
      )
    );
  };

  const addComment = (memeId: string, text: string) => {
    if (!user) return;
    
    setMemes(prevMemes => 
      prevMemes.map(meme => {
        if (meme.id === memeId) {
          const newComment = {
            id: `comment-${Date.now()}`,
            text,
            createdAt: new Date().toISOString(),
            user: {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
            },
          };
          
          return { 
            ...meme, 
            comments: [newComment, ...meme.comments],
            stats: {
              ...meme.stats,
              comments: meme.stats.comments + 1,
            }
          };
        }
        return meme;
      })
    );
  };

  const addView = (id: string) => {
    setMemes(prevMemes => 
      prevMemes.map(meme => 
        meme.id === id 
          ? { 
              ...meme, 
              stats: { 
                ...meme.stats, 
                views: meme.stats.views + 1 
              } 
            } 
          : meme
      )
    );
  };

  return (
    <MemeContext.Provider
      value={{
        memes: getSortedMemes(),
        templates,
        userMemes,
        currentSort,
        setCurrentSort,
        createMeme,
        updateMeme,
        deleteMeme,
        getMeme,
        upvoteMeme,
        downvoteMeme,
        addComment,
        addView,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};