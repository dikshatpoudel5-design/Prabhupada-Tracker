
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import Shloka from './pages/Shloka';
import Notes from './pages/Notes';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/shloka" element={<Shloka />} />
            <Route path="/notes/:bookId" element={<Notes />} />
          </Routes>
        </main>
        <footer className="bg-white py-6 border-t border-gray-100 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} Śrīla Prabhupāda Book Tracker - Serving the mission of ISKCON</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
