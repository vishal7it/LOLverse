import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { Sun, Moon, Plus, User, Home, Trophy, Search } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useUI();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                MemeHub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Home className="w-4 h-4 mr-1" />
              <span>Feed</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/leaderboard') 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Trophy className="w-4 h-4 mr-1" />
              <span>Leaderboard</span>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/create" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/create') 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <Plus className="w-4 h-4 mr-1" />
                <span>Create</span>
              </Link>
            )}
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/dashboard') 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <User className="w-4 h-4 mr-1" />
                <span>My Memes</span>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:block">
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition duration-150"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;