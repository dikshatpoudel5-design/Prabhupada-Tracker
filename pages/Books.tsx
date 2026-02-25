
import React, { useState, useEffect } from 'react';
import { BOOKS } from '../constants';
import BookItem from '../components/BookItem';

const Books: React.FC = () => {
  const [bookStatus, setBookStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = localStorage.getItem('bookStatus');
    if (stored) {
      setBookStatus(JSON.parse(stored));
    }
  }, []);

  const toggleBookStatus = (id: string) => {
    const newStatus = { ...bookStatus, [id]: !bookStatus[id] };
    setBookStatus(newStatus);
    localStorage.setItem('bookStatus', JSON.stringify(newStatus));
  };

  const categories = [1, 2, 3, 4];
  const categoryLabels = [
    "Introductory Literature",
    "Self Realization & Deeper Understanding",
    "Primary Scriptural Studies",
    "Advanced Canonical Texts"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B0000] mb-2">Book Reading Tracker</h1>
        <p className="text-gray-600">Mark books as read as you complete them.</p>
      </header>

      {categories.map((cat, idx) => (
        <div key={cat} className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-[#FF9933] uppercase tracking-widest bg-orange-50 px-4 py-1 rounded">
              Category {cat}: {categoryLabels[idx]}
            </h2>
            <div className="flex-grow h-px bg-orange-100 ml-4"></div>
          </div>
          
          <div className="space-y-2">
            {BOOKS.filter(b => b.category === cat).map(book => (
              <BookItem 
                key={book.id} 
                book={book} 
                isRead={!!bookStatus[book.id]} 
                onToggle={toggleBookStatus} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
