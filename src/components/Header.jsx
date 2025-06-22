import React, { useState, useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(SessionContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-slate-700 transition-all duration-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FitPlanner
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 dark:hover:from-gray-700 dark:hover:to-slate-700 transition-all duration-200 hover:scale-105"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;