import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Plus, History, BarChart3 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Calendar, label: 'Dashboard' },
    { path: '/create', icon: Plus, label: 'Nouvelle séance' },
    { path: '/history', icon: History, label: 'Historique' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl border-r border-gray-200/50 dark:border-gray-700/50 hidden md:block">
      <nav className="p-6">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-slate-700 hover:shadow-md'
                  }`}
                >
                  <Icon size={20} className={`transition-transform duration-200 ${
                    isActive(item.path) ? '' : 'group-hover:scale-110'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;