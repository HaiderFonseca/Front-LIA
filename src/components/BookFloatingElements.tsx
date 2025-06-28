
import React from 'react';
import { Book, BookOpen } from 'lucide-react';

// ============ COMPONENTE DE ELEMENTOS FLOTANTES DECORATIVOS ============
// Este componente agrega libros flotantes y efectos visuales de fondo
// para crear una atmósfera literaria en la interfaz

const BookFloatingElements = () => {
  // ============ LISTA DE LIBROS POPULARES PARA MOSTRAR ============
  const popularBooks = [
    { 
      title: "Harry Potter", 
      author: "J.K. Rowling", 
      color: "text-gray-700",
      bgColor: "bg-white" 
    },
    { 
      title: "El Señor de los Anillos", 
      author: "J.R.R. Tolkien", 
      color: "text-gray-600",
      bgColor: "bg-gray-100" 
    },
    { 
      title: "1984", 
      author: "George Orwell", 
      color: "text-white",
      bgColor: "bg-gray-900" 
    },
    { 
      title: "Cien Años de Soledad", 
      author: "Gabriel García Márquez", 
      color: "text-gray-700",
      bgColor: "bg-white" 
    },
    { 
      title: "Don Quijote", 
      author: "Miguel de Cervantes", 
      color: "text-gray-800",
      bgColor: "bg-gray-200" 
    },
    { 
      title: "Orgullo y Prejuicio", 
      author: "Jane Austen", 
      color: "text-gray-600",
      bgColor: "bg-gray-50" 
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* ============ LIBROS FLOTANTES CON ANIMACIONES ============ */}
      
      {/* Libro 1 - Esquina superior izquierda */}
      <div 
        className="absolute top-20 left-10 opacity-15 animate-bounce" 
        style={{ animationDuration: '6s' }}
      >
        <div className={`${popularBooks[0].bgColor} p-3 rounded-lg shadow-lg border border-gray-200 transform rotate-12 hover:opacity-25 transition-opacity`}>
          <Book className={`w-8 h-8 ${popularBooks[0].color} mb-2`} />
          <div className={`text-xs ${popularBooks[0].color} font-medium max-w-20`}>
            {popularBooks[0].title}
          </div>
          <div className={`text-xs ${popularBooks[0].color} opacity-75`}>
            {popularBooks[0].author}
          </div>
        </div>
      </div>
      
      {/* Libro 2 - Esquina superior derecha */}
      <div 
        className="absolute top-40 right-20 opacity-15 animate-bounce" 
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      >
        <div className={`${popularBooks[1].bgColor} p-3 rounded-lg shadow-lg border border-gray-300 transform -rotate-12 hover:opacity-25 transition-opacity`}>
          <BookOpen className={`w-10 h-10 ${popularBooks[1].color} mb-2`} />
          <div className={`text-xs ${popularBooks[1].color} font-medium max-w-24`}>
            {popularBooks[1].title}
          </div>
          <div className={`text-xs ${popularBooks[1].color} opacity-75`}>
            {popularBooks[1].author}
          </div>
        </div>
      </div>
      
      {/* Libro 3 - Esquina inferior izquierda */}
      <div 
        className="absolute bottom-40 left-20 opacity-15 animate-bounce" 
        style={{ animationDuration: '7s', animationDelay: '2s' }}
      >
        <div className={`${popularBooks[2].bgColor} p-3 rounded-lg shadow-lg transform rotate-6 hover:opacity-25 transition-opacity`}>
          <Book className={`w-6 h-6 ${popularBooks[2].color} mb-2`} />
          <div className={`text-xs ${popularBooks[2].color} font-medium max-w-16`}>
            {popularBooks[2].title}
          </div>
          <div className={`text-xs ${popularBooks[2].color} opacity-80`}>
            {popularBooks[2].author}
          </div>
        </div>
      </div>
      
      {/* Libro 4 - Esquina inferior derecha */}
      <div 
        className="absolute bottom-20 right-10 opacity-15 animate-bounce" 
        style={{ animationDuration: '9s', animationDelay: '3s' }}
      >
        <div className={`${popularBooks[3].bgColor} p-3 rounded-lg shadow-lg border border-gray-200 transform -rotate-6 hover:opacity-25 transition-opacity`}>
          <BookOpen className={`w-7 h-7 ${popularBooks[3].color} mb-2`} />
          <div className={`text-xs ${popularBooks[3].color} font-medium max-w-20`}>
            {popularBooks[3].title}
          </div>
          <div className={`text-xs ${popularBooks[3].color} opacity-75`}>
            {popularBooks[3].author}
          </div>
        </div>
      </div>

      {/* Libro 5 - Centro superior */}
      <div 
        className="absolute top-32 left-1/2 transform -translate-x-1/2 opacity-10 animate-bounce" 
        style={{ animationDuration: '10s', animationDelay: '4s' }}
      >
        <div className={`${popularBooks[4].bgColor} p-2 rounded-lg shadow-lg border border-gray-200 transform rotate-3 hover:opacity-20 transition-opacity`}>
          <Book className={`w-5 h-5 ${popularBooks[4].color} mb-1`} />
          <div className={`text-xs ${popularBooks[4].color} font-medium max-w-18`}>
            {popularBooks[4].title}
          </div>
        </div>
      </div>

      {/* Libro 6 - Centro lateral */}
      <div 
        className="absolute top-1/2 right-32 transform -translate-y-1/2 opacity-10 animate-bounce" 
        style={{ animationDuration: '11s', animationDelay: '5s' }}
      >
        <div className={`${popularBooks[5].bgColor} p-2 rounded-lg shadow-lg border border-gray-200 transform -rotate-3 hover:opacity-20 transition-opacity`}>
          <BookOpen className={`w-5 h-5 ${popularBooks[5].color} mb-1`} />
          <div className={`text-xs ${popularBooks[5].color} font-medium max-w-20`}>
            {popularBooks[5].title}
          </div>
        </div>
      </div>
      
      {/* ============ GRADIENTES DE FONDO SUAVES ============ */}
      
      {/* Gradiente superior izquierdo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-gray-100/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Gradiente inferior derecho */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-gray-200/20 to-transparent rounded-full blur-3xl"></div>
      
      {/* Gradiente central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-gray-800/5 to-gray-600/5 rounded-full blur-3xl"></div>
      
      {/* Gradiente adicional para profundidad */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-bl from-gray-500/10 to-transparent rounded-full blur-2xl"></div>
    </div>
  );
};

export default BookFloatingElements;
