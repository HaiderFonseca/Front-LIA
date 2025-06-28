
import React from 'react';
import { Book, BookOpen } from 'lucide-react';

const BookFloatingElements = () => {
  const popularBooks = [
    { title: "Harry Potter", author: "J.K. Rowling", color: "text-gray-700" },
    { title: "El Señor de los Anillos", author: "J.R.R. Tolkien", color: "text-gray-600" },
    { title: "1984", author: "George Orwell", color: "text-gray-800" },
    { title: "Cien Años de Soledad", author: "Gabriel García Márquez", color: "text-gray-500" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Libros flotantes con títulos populares */}
      <div className="absolute top-20 left-10 opacity-20 animate-bounce" style={{ animationDuration: '6s' }}>
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 transform rotate-12">
          <Book className="w-8 h-8 text-gray-700 mb-1" />
          <div className="text-xs text-gray-600 font-medium">{popularBooks[0].title}</div>
          <div className="text-xs text-gray-500">{popularBooks[0].author}</div>
        </div>
      </div>
      
      <div className="absolute top-40 right-20 opacity-20 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <div className="bg-gray-100 p-2 rounded-lg shadow-lg border border-gray-300 transform -rotate-12">
          <BookOpen className="w-10 h-10 text-gray-800 mb-1" />
          <div className="text-xs text-gray-700 font-medium">{popularBooks[1].title}</div>
          <div className="text-xs text-gray-600">{popularBooks[1].author}</div>
        </div>
      </div>
      
      <div className="absolute bottom-40 left-20 opacity-20 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>
        <div className="bg-gray-900 text-white p-2 rounded-lg shadow-lg transform rotate-6">
          <Book className="w-6 h-6 mb-1" />
          <div className="text-xs font-medium">{popularBooks[2].title}</div>
          <div className="text-xs opacity-80">{popularBooks[2].author}</div>
        </div>
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20 animate-bounce" style={{ animationDuration: '9s', animationDelay: '3s' }}>
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200 transform -rotate-6">
          <BookOpen className="w-7 h-7 text-gray-600 mb-1" />
          <div className="text-xs text-gray-700 font-medium">{popularBooks[3].title}</div>
          <div className="text-xs text-gray-500">{popularBooks[3].author}</div>
        </div>
      </div>
      
      {/* Gradientes neutros de fondo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-gray-200/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-gray-800/10 to-gray-600/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default BookFloatingElements;
