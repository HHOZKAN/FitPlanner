import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { Calendar, Clock, CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';

const SessionCard = ({ session, showActions = true }) => {
  const { deleteSession, toggleSessionComplete } = useContext(SessionContext);

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      deleteSession(session.id);
    }
  };

  const handleToggleComplete = (e) => {
    e.preventDefault();
    toggleSessionComplete(session.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link to={`/session/${session.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {session.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{formatDate(session.date)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={16} />
              <span>{formatTime(session.time)}</span>
            </div>
          </div>
        </div>
        {showActions && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleComplete}
              className={`p-2 rounded-full transition-colors ${
                session.completed
                  ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                  : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              title={session.completed ? 'Marquer comme non fait' : 'Marquer comme fait'}
            >
              {session.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
            <Link
              to={`/session/${session.id}/edit`}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors"
              title="Modifier"
            >
              <Edit size={20} />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
              title="Supprimer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{session.exercises.length}</span> exercice{session.exercises.length > 1 ? 's' : ''}
        </div>
        {session.exercises.slice(0, 3).map((exercise, index) => (
          <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
            • {exercise.name} - {exercise.sets} séries
          </div>
        ))}
        {session.exercises.length > 3 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ... et {session.exercises.length - 3} autre{session.exercises.length - 3 > 1 ? 's' : ''}
          </div>
        )}
      </div>

      {session.notes && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300">{session.notes}</p>
        </div>
      )}

      {session.completed && (
        <div className="mt-4 flex items-center space-x-2 text-green-600 dark:text-green-400">
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Séance terminée</span>
        </div>
      )}
    </div>
  );
};

export default SessionCard;