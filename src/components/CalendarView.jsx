import React, { useContext, useState } from 'react';
import { SessionContext } from '../context/SessionContext';
import { ChevronLeft, ChevronRight, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import SessionCard from './SessionCard';
import { 
  getWeekDates, 
  formatDate, 
  isToday, 
  isSameDay,
  getMonthName,
  addWeeks,
  subWeeks
} from '../utils/dateUtils';

const CalendarView = () => {
  const { sessions } = useContext(SessionContext);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDates = getWeekDates(currentWeek);

  const getSessionsForDate = (date) => {
    return sessions.filter(session => 
      isSameDay(new Date(session.date), date)
    );
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Semaine du {formatDate(weekDates[0])}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
          >
            Aujourd'hui
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={goToPreviousWeek}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goToNextWeek}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDates.map((date, index) => {
          const dayName = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][date.getDay()];
          const daySessions = getSessionsForDate(date);
          
          return (
            <div
              key={index}
              className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 min-h-[200px] ${
                isToday(date) 
                  ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' 
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {dayName}
                  </div>
                  <div className={`text-lg font-semibold ${
                    isToday(date) 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {date.getDate()}
                  </div>
                </div>
                <Link
                  to={`/create?date=${date.toISOString().split('T')[0]}`}
                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  title="Ajouter une séance"
                >
                  <Plus size={16} />
                </Link>
              </div>

              <div className="space-y-2">
                {daySessions.map(session => (
                  <div
                    key={session.id}
                    className={`p-2 rounded border text-xs ${
                      session.completed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Link to={`/session/${session.id}`}>
                      <div className="font-medium truncate">{session.name}</div>
                      <div className="text-xs opacity-75">{session.time}</div>
                    </Link>
                  </div>
                ))}
                {daySessions.length === 0 && (
                  <div className="text-xs text-gray-400 dark:text-gray-500 italic">
                    Aucune séance
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;