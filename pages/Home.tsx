
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShlokaData } from '../types';
import { fetchDailyShloka } from '../services/geminiService';

const Home: React.FC = () => {
  const [dailyShloka, setDailyShloka] = useState<ShlokaData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkDailyShloka = async () => {
      const stored = localStorage.getItem('dailyShloka');
      const today = new Date().toDateString();

      if (stored) {
        const parsed = JSON.parse(stored) as ShlokaData;
        if (parsed.date === today) {
          setDailyShloka(parsed);
          return;
        }
      }

      setLoading(true);
      const fetched = await fetchDailyShloka();
      if (fetched) {
        const dataToStore = { ...fetched, date: today };
        setDailyShloka(dataToStore);
        localStorage.setItem('dailyShloka', JSON.stringify(dataToStore));
      }
      setLoading(false);
    };

    checkDailyShloka();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#8B0000] mb-2">Śrīla Prabhupāda Book Tracker</h1>
        <p className="text-gray-600 italic">"Books are the basis."</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link to="/books" className="group bg-white p-6 rounded-xl shadow-sm border border-orange-50 hover:border-orange-200 transition-all text-center">
          <div className="w-16 h-16 bg-orange-100 text-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Books</h3>
          <p className="text-gray-500 text-sm">Track your reading progress</p>
        </Link>

        <Link to="/shloka" className="group bg-white p-6 rounded-xl shadow-sm border border-orange-50 hover:border-orange-200 transition-all text-center">
          <div className="w-16 h-16 bg-orange-100 text-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Shloka</h3>
          <p className="text-gray-500 text-sm">Search and explore verses</p>
        </Link>

        <Link to="/notes/general" className="group bg-white p-6 rounded-xl shadow-sm border border-orange-50 hover:border-orange-200 transition-all text-center">
          <div className="w-16 h-16 bg-orange-100 text-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF9933] group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Notes</h3>
          <p className="text-gray-500 text-sm">Save realizations & insights</p>
        </Link>
      </section>

      <section className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100">
        <h2 className="text-2xl font-bold text-[#8B0000] mb-6 flex items-center">
          <span className="mr-2">🪷</span> Daily Shloka
        </h2>

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-8 bg-gray-100 rounded"></div>
            <div className="h-20 bg-gray-100 rounded"></div>
          </div>
        ) : dailyShloka ? (
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-orange-100 text-[#FF9933] text-sm font-bold rounded-full">
              {dailyShloka.reference}
            </div>
            
            <div className="text-center scripture text-2xl md:text-3xl text-gray-800 leading-relaxed font-bold">
              {dailyShloka.sanskrit}
            </div>

            <div className="text-center italic text-gray-600 text-sm md:text-base leading-relaxed px-4">
              {dailyShloka.transliteration}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                <span className="font-bold text-[#8B0000]">Translation: </span>
                {dailyShloka.translation}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Could not load today's shloka. Please try again later.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
