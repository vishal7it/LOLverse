import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

type User = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email?: string, password?: string) => void;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // For demo purposes, simulate login with localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('memeHubUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email?: string, password?: string) => {
    // For demo purposes, we'll just use a mock user
    // In a real app, this would validate credentials against a backend
    const mockUser = mockUsers[0];
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('memeHubUser', JSON.stringify(mockUser));
    setShowAuthModal(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('memeHubUser');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        showAuthModal,
        setShowAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};