import React, { createContext, useContext, useState, useEffect } from 'react';

type UIContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('memeHubDarkMode');
    return savedDarkMode === 'true' ? true : false;
  });

  useEffect(() => {
    localStorage.setItem('memeHubDarkMode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <UIContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </UIContext.Provider>
  );
};