import React from 'react';
import { Wand2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="w-full bg-gradient-to-r from-purple-900 to-indigo-800 dark:from-gray-900 dark:to-purple-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-8 w-8 text-purple-300" />
          <h1 className="text-2xl md:text-3xl font-bold text-white">AI ArtSmith</h1>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Gallery</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Community</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">About</a></li>
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-purple-800/50 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-purple-200" />
            ) : (
              <Moon className="h-5 w-5 text-purple-200" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;