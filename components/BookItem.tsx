
import React from 'react';
import { Book } from '../types';
import { Link } from 'react-router-dom';

interface BookItemProps {
  book: Book;
  isRead: boolean;
  onToggle: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, isRead, onToggle }) => {
  return (
    <div 
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-2 rounded-lg border transition-all ${
        isRead ? 'bg-green-50 border-green-200' : 'bg-white border-gray-100 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-3 mb-3 sm:mb-0">
        <input 
          type="checkbox"
          checked={isRead}
          onChange={() => onToggle(book.id)}
          className="w-5 h-5 rounded border-gray-300 text-[#FF9933] focus:ring-[#FF9933]"
        />
        <span className={`text-lg font-medium ${isRead ? 'text-green-800' : 'text-gray-800'}`}>
          {book.title}
        </span>
      </div>
      
      <div className="flex space-x-2 w-full sm:w-auto">
        <a 
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
        >
          Link
        </a>
        <Link 
          to={`/notes/${book.id}`}
          className="flex-1 sm:flex-none text-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#FF9933] text-white rounded hover:bg-[#e68a2e] transition-colors"
        >
          Note
        </Link>
      </div>
    </div>
  );
};

export default BookItem;
