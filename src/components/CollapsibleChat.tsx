
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';

// Interfaz para los mensajes del chat
interface Message {
  id: string;
  text: string;
  isUser: boolean;  // true = usuario, false = IA
  timestamp: Date;
}

// Props del componente de chat
interface CollapsibleChatProps {
  messages: Message[];                    // Array de mensajes a mostrar
  onSendMessage: (message: string) => void; // Función para enviar mensaje
  isTyping: boolean;                      // Indicador de "escribiendo..."
  inputValue: string;                     // Valor del input
  setInputValue: (value: string) => void; // Función para actualizar input
  isExpanded?: boolean;                   // Si el chat está expandido por defecto
  showHeader?: boolean;                   // Si mostrar el header colapsible
}

const CollapsibleChat: React.FC<CollapsibleChatProps> = ({
  messages,
  onSendMessage,
  isTyping,
  inputValue,
  setInputValue,
  isExpanded = true,
  showHeader = true
}) => {
  // Estado para controlar si el chat está expandido (solo si showHeader es true)
  const [isExpandedState, setIsExpandedState] = useState(isExpanded);

  // ============ FUNCIÓN PARA ENVIAR MENSAJE ============
  const handleSend = () => {
    if (inputValue.trim()) {
      console.log('=== ENVIANDO MENSAJE DESDE CHAT ===');
      console.log('Mensaje:', inputValue);
      console.log('Total mensajes actuales:', messages.length);
      
      // Llamar a la función del componente padre
      onSendMessage(inputValue);
    }
  };

  // ============ MANEJO DE TECLA ENTER ============
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Determinar si el chat debe estar expandido
  const shouldShowContent = showHeader ? isExpandedState : true;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header colapsible (opcional) */}
      {showHeader && (
        <div 
          className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setIsExpandedState(!isExpandedState)}
        >
          <h3 className="text-lg font-semibold text-gray-900">
            💬 Chat de Recomendaciones LIA
          </h3>
          {isExpandedState ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </div>
      )}

      {/* Contenido del chat */}
      {shouldShowContent && (
        <>
          {/* Área de mensajes */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* ============ RENDERIZADO DE MENSAJES ============ */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {/* ============ INDICADOR DE "ESCRIBIENDO..." ============ */}
            {isTyping && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="p-2 bg-gray-200 rounded-full">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                </div>
                <div className="bg-white rounded-2xl px-4 py-3 max-w-xs shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ============ ÁREA DE INPUT ============ */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3 items-end">
              {/* Input de texto */}
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta sobre libros, géneros, recomendaciones..."
                className="flex-1 border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                disabled={isTyping}
              />
              
              {/* Botón de envío */}
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Información adicional */}
            <div className="mt-2 text-xs text-gray-500 text-center">
              {isTyping ? (
                <span>🤖 LIA está procesando tu solicitud...</span>
              ) : (
                <span>
                  💡 Presiona Enter para enviar • {messages.length} mensajes en el historial
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapsibleChat;
