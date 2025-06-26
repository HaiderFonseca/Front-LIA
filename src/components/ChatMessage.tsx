
import React from 'react';
import { Book, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start gap-3 animate-fade-in ${message.isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`p-2 rounded-full ${message.isUser ? 'bg-amber-600' : 'bg-amber-100'}`}>
        {message.isUser ? (
          <User className={`w-4 h-4 ${message.isUser ? 'text-white' : 'text-amber-600'}`} />
        ) : (
          <Book className="w-4 h-4 text-amber-600" />
        )}
      </div>
      
      <div className={`max-w-xs lg:max-w-md ${message.isUser ? 'text-right' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.isUser
              ? 'bg-amber-600 text-white'
              : 'bg-gray-100 text-gray-800'
          } shadow-sm`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
