
import React, { useState, useEffect } from 'react';
import { ShlokaData } from '../types';
import { fetchShloka } from '../services/geminiService';

const Shloka: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ShlokaData | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('shlokaHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent, manualQuery?: string) => {
    if (e) e.preventDefault();
    const searchQuery = manualQuery || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    const data = await fetchShloka(searchQuery);
    if (data) {
      setResult(data);
      const newHistory = [searchQuery, ...history.filter(h => h !== searchQuery)].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('shlokaHistory', JSON.stringify(newHistory));
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#8B0000] mb-2">Shloka Search</h1>
        <p className="text-gray-600">Find verses by reference (e.g., "Bg 2.13", "Sb 1.1.1")</p>
      </header>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bg 18.66..."
            className="flex-grow p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9933] focus:border-[#FF9933] outline-none"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#FF9933] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e68a2e] disabled:opacity-50 transition-all shadow-md"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {history.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recent:</span>
          {history.map((h) => (
            <button 
              key={h}
              onClick={() => {
                setQuery(h);
                handleSearch(undefined, h);
              }}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {h}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 animate-in fade-in duration-500">
           <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-orange-100 text-[#FF9933] text-sm font-bold rounded-full">
              {result.reference}
            </div>
            
            <div className="text-center scripture text-2xl md:text-3xl text-gray-800 leading-relaxed font-bold">
              {result.sanskrit}
            </div>

            <div className="text-center italic text-gray-600 text-sm md:text-base leading-relaxed px-4">
              {result.transliteration}
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                <span className="font-bold text-[#8B0000]">Translation: </span>
                {result.translation}
              </p>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-400">Search for a verse to display its wisdom here.</p>
        </div>
      )}
    </div>
  );
};

export default Shloka;
