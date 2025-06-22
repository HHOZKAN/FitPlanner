import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionProvider } from './context/SessionContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SessionDetail from './pages/SessionDetail';
import SessionEdit from './pages/SessionEdit';
import History from './pages/History';

function App() {
  return (
    <SessionProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 transition-all duration-300">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/session/:id" element={<SessionDetail />} />
                <Route path="/session/:id/edit" element={<SessionEdit />} />
                <Route path="/create" element={<SessionEdit />} />
                <Route path="/history" element={<History />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </SessionProvider>
  );
}

export default App;