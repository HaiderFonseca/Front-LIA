
import React, { useState, useRef, useEffect } from 'react';
import { Send, Book, MessageCircle, BookOpen, Library } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ChatMessage';
import BookFloatingElements from '@/components/BookFloatingElements';

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
      text: "Hello! I'm your personal book recommendation assistant. Tell me about your reading preferences, favorite genres, or what kind of mood you're in for your next read!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load messages from localStorage on component mount
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    // Save to localStorage
    saveMessagesToStorage(updatedMessages);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBookRecommendation(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      setIsTyping(false);
      
      // Save updated messages including AI response
      saveMessagesToStorage(finalMessages);
    }, 1500);
  };

  const generateBookRecommendation = (userInput: string): string => {
    // Simple recommendation logic - in a real app, this would connect to your AI model
    const recommendations = [
      "Based on your interests, I'd recommend 'The Seven Husbands of Evelyn Hugo' by Taylor Jenkins Reid. It's a captivating story about a reclusive Hollywood icon who finally decides to tell her life story.",
      "You might enjoy 'Klara and the Sun' by Kazuo Ishiguro. It's a beautiful, thought-provoking novel told from the perspective of an artificial friend observing human nature.",
      "I think you'd love 'The Midnight Library' by Matt Haig. It explores the concept of parallel lives and the choices we make, wrapped in a magical and philosophical narrative.",
      "Consider reading 'Circe' by Madeline Miller. It's a stunning retelling of Greek mythology that gives voice to one of literature's most fascinating characters.",
      "You should check out 'The Invisible Life of Addie LaRue' by V.E. Schwab. It's an enchanting tale about a woman cursed to be forgotten by everyone she meets."
    ];
    
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      <BookFloatingElements />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">BookWise AI</h1>
              <p className="text-sm text-amber-600">Your Personal Reading Companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-32">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 min-h-[70vh] flex flex-col">
          
          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[60vh]">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="p-2 bg-amber-100 rounded-full">
                  <Book className="w-4 h-4 text-amber-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-amber-200 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me about your reading preferences or ask for recommendations..."
                className="min-h-[50px] pr-12 border-amber-200 focus:border-amber-400 focus:ring-amber-400 bg-white/80 backdrop-blur-sm resize-none"
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-amber-600 mt-2 text-center">
            Your reading journey awaits - ask me anything about books!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
