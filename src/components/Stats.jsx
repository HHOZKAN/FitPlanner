import React, { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';
import { BarChart3, Calendar, Clock, TrendingUp, Target } from 'lucide-react';

const Stats = () => {
  const { sessions } = useContext(SessionContext);

  const completedSessions = sessions.filter(session => session.completed);
  const totalSessions = sessions.length;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions.length / totalSessions) * 100) : 0;

  const totalExercises = sessions.reduce((total, session) => total + session.exercises.length, 0);
  const totalDuration = sessions.reduce((total, session) => {
    return total + session.exercises.reduce((sessionTotal, exercise) => {
      return sessionTotal + (parseInt(exercise.duration) || 0);
    }, 0);
  }, 0);

  const exerciseFrequency = {};
  sessions.forEach(session => {
    session.exercises.forEach(exercise => {
      if (exercise.name.trim()) {
        exerciseFrequency[exercise.name] = (exerciseFrequency[exercise.name] || 0) + 1;
      }
    });
  });

  const favoriteExercises = Object.entries(exerciseFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const thisWeekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return sessionDate >= weekStart && sessionDate <= weekEnd;
  });

  const stats = [
    {
      title: 'Séances totales',
      value: totalSessions,
      icon: Calendar,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Séances terminées',
      value: completedSessions.length,
      icon: Target,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: 'Taux de réussite',
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Temps total (min)',
      value: totalDuration,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Exercices favoris
          </h3>
          {favoriteExercises.length > 0 ? (
            <div className="space-y-3">
              {favoriteExercises.map(([exercise, count], index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                    {exercise}
                  </span>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / favoriteExercises[0][1]) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-6 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Aucun exercice enregistré pour le moment
            </p>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Cette semaine
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Séances planifiées</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {thisWeekSessions.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Séances terminées</span>
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                {thisWeekSessions.filter(s => s.completed).length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Exercices totaux</span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {thisWeekSessions.reduce((total, session) => total + session.exercises.length, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;