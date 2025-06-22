import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useLocalStorage('fitplanner-sessions', []);
  const [darkMode, setDarkMode] = useLocalStorage('fitplanner-darkmode', false);

  const addSession = (sessionData) => {
    const newSession = {
      id: Date.now().toString(),
      ...sessionData,
      createdAt: new Date().toISOString(),
      completed: false
    };
    setSessions(prev => [...prev, newSession]);
  };

  const updateSession = (id, sessionData) => {
    setSessions(prev => 
      prev.map(session => 
        session.id === id 
          ? { ...session, ...sessionData, updatedAt: new Date().toISOString() }
          : session
      )
    );
  };

  const deleteSession = (id) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const toggleSessionComplete = (id) => {
    setSessions(prev =>
      prev.map(session =>
        session.id === id
          ? { 
              ...session, 
              completed: !session.completed,
              completedAt: !session.completed ? new Date().toISOString() : null
            }
          : session
      )
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value = {
    sessions,
    addSession,
    updateSession,
    deleteSession,
    toggleSessionComplete,
    darkMode,
    toggleDarkMode
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};