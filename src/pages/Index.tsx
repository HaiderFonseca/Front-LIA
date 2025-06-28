
import React, { useState, useRef, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import TabsSection from '@/components/TabsSection';
import CollapsibleChat from '@/components/CollapsibleChat';
import PDFUploader from '@/components/PDFUploader';
import BookFloatingElements from '@/components/BookFloatingElements';
import { chatService } from '@/services/chatService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "¡Hola! Soy tu asistente de recomendaciones de libros. Cuéntame sobre tus gustos literarios, géneros favoritos, o qué tipo de historia te gustaría leer.",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Cargar mensajes del localStorage al iniciar
    const savedMessages = localStorage.getItem('bookRecommendationChat');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }
  }, []);

  const saveMessagesToStorage = (newMessages: Message[]) => {
    localStorage.setItem('bookRecommendationChat', JSON.stringify(newMessages));
  };

  // AQUÍ ES DONDE SE MANEJAN LOS MENSAJES - CONEXIÓN CON TU API
  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    // Guardar en localStorage
    saveMessagesToStorage(updatedMessages);

    try {
      // AQUÍ SE ENVÍA EL MENSAJE A TU MODELO DE FASTAPI
      const response = await chatService.sendMessage({
        message: messageText,
        conversationHistory: messages.map(msg => ({
          text: msg.text,
          isUser: msg.isUser,
          timestamp: msg.timestamp
        }))
      });

      // AQUÍ RECIBES LA RESPUESTA DE TU MODELO
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setIsTyping(false);
      
      // Guardar mensajes actualizados incluyendo respuesta de IA
      saveMessagesToStorage(finalMessages);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      // Mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta nuevamente.",
        isUser: false,
        timestamp: new Date()
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      saveMessagesToStorage(finalMessages);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative">
      <BookFloatingElements />
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BookWise AI</h1>
              <p className="text-sm text-gray-600">Sistema de Recomendaciones Inteligente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            <TabsSection />
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Chat colapsible */}
            <CollapsibleChat
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />

            {/* Uploader de PDFs */}
            <PDFUploader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
