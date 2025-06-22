import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { Plus, Calendar, TrendingUp } from 'lucide-react';
import CalendarView from '../components/CalendarView';
import Stats from '../components/Stats';

const Dashboard = () => {
  const { sessions } = useContext(SessionContext);

  const upcomingSessions = sessions
    .filter(session => {
      const sessionDate = new Date(session.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return sessionDate >= today && !session.completed;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gérez vos séances d'entraînement
          </p>
        </div>
        <Link
          to="/create"
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Nouvelle séance</span>
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aucune séance planifiée
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Commencez par créer votre première séance d'entraînement
          </p>
          <Link
            to="/create"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            <span>Créer ma première séance</span>
          </Link>
        </div>
      ) : (
        <>
          <Stats />
          
          {upcomingSessions.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Prochaines séances
                </h2>
                <Link 
                  to="/history"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  Voir tout
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {upcomingSessions.map(session => (
                  <div key={session.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <Link to={`/session/${session.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {session.name}
                      </h3>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>{new Date(session.date).toLocaleDateString('fr-FR')} à {session.time}</div>
                        <div>{session.exercises.length} exercice{session.exercises.length > 1 ? 's' : ''}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <CalendarView />
        </>
      )}
    </div>
  );
};

export default Dashboard;