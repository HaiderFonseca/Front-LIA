
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CollapsibleChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const CollapsibleChat: React.FC<CollapsibleChatProps> = ({
  messages,
  onSendMessage,
  isTyping,
  inputValue,
  setInputValue
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Header colapsible */}
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-900">
          Chat de Recomendaciones
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </div>

      {/* Contenido del chat */}
      {isExpanded && (
        <>
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
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

          {/* Input área */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3 items-end">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje sobre libros..."
                className="flex-1 border-gray-300 focus:border-gray-600 focus:ring-gray-600"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollapsibleChat;
