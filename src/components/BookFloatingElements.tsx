
import React from 'react';
import { Book, BookOpen, Library, Bookmark } from 'lucide-react';

const BookFloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Books */}
      <div className="absolute top-20 left-10 opacity-10 animate-bounce" style={{ animationDuration: '6s' }}>
        <Book className="w-12 h-12 text-amber-600 transform rotate-12" />
      </div>
      
      <div className="absolute top-40 right-20 opacity-10 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>
        <BookOpen className="w-16 h-16 text-red-500 transform -rotate-12" />
      </div>
      
      <div className="absolute bottom-40 left-20 opacity-10 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>
        <Library className="w-14 h-14 text-orange-600 transform rotate-6" />
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-10 animate-bounce" style={{ animationDuration: '9s', animationDelay: '3s' }}>
        <Bookmark className="w-10 h-10 text-amber-700 transform -rotate-6" />
      </div>
      
      <div className="absolute top-60 left-1/2 opacity-5 animate-bounce" style={{ animationDuration: '10s', animationDelay: '4s' }}>
        <Book className="w-8 h-8 text-red-600 transform rotate-45" />
      </div>
      
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-red-200/10 to-amber-200/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default BookFloatingElements;
