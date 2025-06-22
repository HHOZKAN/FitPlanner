import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import { Calendar, Filter, Search } from 'lucide-react';
import SessionCard from '../components/SessionCard';

const History = () => {
  const { sessions } = useContext(SessionContext);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, name

  const filteredSessions = sessions
    .filter(session => {
      if (filter === 'completed') return session.completed;
      if (filter === 'pending') return !session.completed;
      return true;
    })
    .filter(session => 
      session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.exercises.some(exercise => 
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date-desc':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const completedSessions = sessions.filter(s => s.completed).length;
  const totalSessions = sessions.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Historique
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {totalSessions} séance{totalSessions > 1 ? 's' : ''} au total, {completedSessions} terminée{completedSessions > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucune séance dans l'historique
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vos séances apparaîtront ici une fois créées
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher une séance ou un exercice..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">Toutes les séances</option>
                  <option value="completed">Terminées</option>
                  <option value="pending">En attente</option>
                </select>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="date-desc">Plus récent</option>
                  <option value="date-asc">Plus ancien</option>
                  <option value="name">Par nom</option>
                </select>
              </div>
            </div>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="text-center py-8">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Aucun résultat
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default History;