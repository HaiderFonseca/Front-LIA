
import React, { useState, useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import TabsSection from '@/components/TabsSection';
import CollapsibleChat from '@/components/CollapsibleChat';
import BookFloatingElements from '@/components/BookFloatingElements';
import { chatService } from '@/services/chatService';

// Interfaz para los mensajes del chat de recomendaciones
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Interfaz para los libros que se agregan a la biblioteca
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  review: string;
  dateAdded: Date;
}

const Index = () => {
  // ============ ESTADO DEL CHAT DE RECOMENDACIONES ============
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "¡Hola! Soy LIA, tu asistente inteligente de recomendaciones de libros. Cuéntame qué tipo de libro buscas, tu género favorito, o describe el tipo de historia que te gustaría leer.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // ============ ESTADO DE LOS LIBROS DE LA BIBLIOTECA ============
  const [books, setBooks] = useState<Book[]>([]);

  // ============ CARGA DE DATOS DESDE LOCALSTORAGE AL INICIAR ============
  useEffect(() => {
    // Cargar mensajes del chat guardados
    const savedMessages = localStorage.getItem('liaRecommendationChat');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error cargando mensajes guardados:', error);
      }
    }

    // Cargar libros guardados de la biblioteca
    const savedBooks = localStorage.getItem('liaLibraryBooks');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks).map((book: any) => ({
          ...book,
          dateAdded: new Date(book.dateAdded)
        }));
        setBooks(parsedBooks);
      } catch (error) {
        console.error('Error cargando libros guardados:', error);
      }
    }
  }, []);

  // ============ FUNCIÓN PARA GUARDAR MENSAJES EN LOCALSTORAGE ============
  const saveMessagesToStorage = (newMessages: Message[]) => {
    localStorage.setItem('liaRecommendationChat', JSON.stringify(newMessages));
  };

  // ============ FUNCIÓN PARA GUARDAR LIBROS EN LOCALSTORAGE ============
  const saveBooksToStorage = (newBooks: Book[]) => {
    localStorage.setItem('liaLibraryBooks', JSON.stringify(newBooks));
  };

  // ============ FUNCIÓN PRINCIPAL DEL CHAT - AQUÍ SE CONECTA CON EL MODELO ============
  const handleSendMessage = async (messageText: string) => {
    // 1. Crear mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    // 2. Actualizar UI inmediatamente con el mensaje del usuario
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true); // Mostrar indicador de "escribiendo..."

    // 3. Guardar en localStorage
    saveMessagesToStorage(updatedMessages);

    try {
      // ============ AQUÍ SE ENVÍA EL MENSAJE AL MODELO LOCAL ============
      // NOTA: Este es el punto donde debes conectar tu modelo de IA
      // INPUT: messageText (mensaje del usuario) + conversationHistory (historial completo)
      // FORMATO DE ENTRADA: { message: string, history: Array<{text, isUser, timestamp}> }
      
      console.log('=== ENVIANDO AL MODELO LOCAL ===');
      console.log('Mensaje del usuario:', messageText);
      console.log('Historial completo:', messages);
      
      const response = await chatService.sendMessage({
        message: messageText,
        conversationHistory: messages.map(msg => ({
          text: msg.text,
          isUser: msg.isUser,
          timestamp: msg.timestamp
        }))
      });

      // ============ AQUÍ SE RECIBE LA RESPUESTA DEL MODELO ============
      // NOTA: La respuesta viene en formato { response: string, confidence?: number }
      // OUTPUT: response.response contiene la recomendación del modelo
      
      console.log('=== RESPUESTA DEL MODELO ===');
      console.log('Recomendación recibida:', response.response);
      console.log('Confianza:', response.confidence);

      // 4. Crear mensaje de respuesta de la IA
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date()
      };

      // 5. Actualizar UI con la respuesta de la IA
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setIsTyping(false);
      
      // 6. Guardar mensajes actualizados incluyendo respuesta de IA
      saveMessagesToStorage(finalMessages);
      
    } catch (error) {
      console.error('Error enviando mensaje al modelo:', error);
      setIsTyping(false);
      
      // Mensaje de error para el usuario
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
        isUser: false,
        timestamp: new Date()
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveMessagesToStorage(finalMessages);
    }
  };

  // ============ FUNCIÓN PARA AGREGAR NUEVO LIBRO A LA BIBLIOTECA ============
  const handleAddBook = (bookData: Omit<Book, 'id' | 'dateAdded'>) => {
    const newBook: Book = {
      id: Date.now().toString(),
      ...bookData,
      dateAdded: new Date()
    };

    // Actualizar estado y localStorage
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    saveBooksToStorage(updatedBooks);

    // ============ AQUÍ SE DEBE ENVIAR EL LIBRO AL SISTEMA RAG ============
    // NOTA: Este es donde debes conectar con tu sistema RAG para indexar el nuevo libro
    // FORMATO DE DATOS DEL LIBRO:
    // {
    //   id: string,
    //   title: string,
    //   author: string, 
    //   description: string,
    //   review: string,
    //   dateAdded: Date
    // }
    
    console.log('=== NUEVO LIBRO AGREGADO A LA BIBLIOTECA ===');
    console.log('Datos del libro:', newBook);
    console.log('Total de libros en biblioteca:', updatedBooks.length);
    
    // TODO: Aquí debes llamar a tu función para indexar el libro en el RAG
    // Ejemplo: ragService.indexBook(newBook);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      {/* Elementos flotantes decorativos */}
      <BookFloatingElements />
      
      {/* Header principal de LIA */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LIA</h1>
              <p className="text-sm text-gray-600">Lectura + IA - Sistema Inteligente de Biblioteca</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal con pestañas */}
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        <TabsSection 
          onAddBook={handleAddBook}
          books={books}
          chatMessages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
    </div>
  );
};

export default Index;
