
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BOOKS } from '../constants';

const Notes: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [noteText, setNoteText] = useState('');
  const [bookTitle, setBookTitle] = useState('General Notes');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (bookId && bookId !== 'general') {
      const book = BOOKS.find(b => b.id === bookId);
      if (book) setBookTitle(book.title);
    } else {
      setBookTitle('General Realizations');
    }

    const storedNotes = localStorage.getItem('bookNotes');
    if (storedNotes) {
      const parsed = JSON.parse(storedNotes);
      setNoteText(parsed[bookId || 'general'] || '');
    }
  }, [bookId]);

  const handleSave = (val: string) => {
    setNoteText(val);
    const storedNotes = localStorage.getItem('bookNotes');
    const notes = storedNotes ? JSON.parse(storedNotes) : {};
    notes[bookId || 'general'] = val;
    localStorage.setItem('bookNotes', JSON.stringify(notes));
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <Link to="/books" className="text-sm text-[#FF9933] font-bold hover:underline mb-1 inline-block">← Back to Books</Link>
          <h1 className="text-3xl font-bold text-[#8B0000]">{bookTitle}</h1>
        </div>
        <div className={`text-sm font-medium transition-opacity ${saved ? 'text-green-600 opacity-100' : 'opacity-0'}`}>
          ✓ Auto-saved
        </div>
      </header>

      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-orange-100 p-4 mb-20">
        <textarea 
          value={noteText}
          onChange={(e) => handleSave(e.target.value)}
          placeholder="Write your realizations, points to remember, and insights here..."
          className="w-full h-full p-4 text-gray-800 leading-relaxed outline-none resize-none placeholder-gray-300 scripture text-xl"
        />
      </div>
    </div>
  );
};

export default Notes;
