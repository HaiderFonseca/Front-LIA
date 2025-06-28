
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Users, MessageCircle, Plus } from 'lucide-react';
import AddBookForm from './AddBookForm';
import CollapsibleChat from './CollapsibleChat';
import type { Book as BookType } from '@/pages/Index';

// Interfaz para los mensajes del chat
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Props que recibe el componente de pestañas
interface TabsSectionProps {
  onAddBook: (bookData: Omit<BookType, 'id' | 'dateAdded'>) => void;
  books: BookType[];
  chatMessages: Message[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({
  onAddBook,
  books,
  chatMessages,
  onSendMessage,
  isTyping,
  inputValue,
  setInputValue
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="home" className="w-full">
        {/* Navegación de pestañas */}
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border border-gray-200">
          <TabsTrigger 
            value="home" 
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <Book className="w-4 h-4" />
            Inicio
          </TabsTrigger>
          <TabsTrigger 
            value="add-book"
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <Plus className="w-4 h-4" />
            Agregar Libro
          </TabsTrigger>
          <TabsTrigger 
            value="chat"
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <MessageCircle className="w-4 h-4" />
            Recomendaciones
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <Users className="w-4 h-4" />
            Acerca de
          </TabsTrigger>
        </TabsList>

        {/* PESTAÑA DE INICIO - Explicación del sistema LIA */}
        <TabsContent value="home" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gray-900 rounded-full mb-4">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                LIA - Lectura + IA
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Sistema inteligente de biblioteca que utiliza IA para gestionar libros 
                y proporcionar recomendaciones personalizadas basadas en tus preferencias de lectura.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Funcionalidad 1: Agregar Libros */}
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <Plus className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestión de Biblioteca</h3>
                <p className="text-gray-600">
                  Agrega nuevos libros a la biblioteca con título, autor, descripción y reseñas
                </p>
              </div>

              {/* Funcionalidad 2: Recomendaciones IA */}
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Recomendaciones IA</h3>
                <p className="text-gray-600">
                  Conversa con LIA para obtener recomendaciones personalizadas usando RAG
                </p>
              </div>

              {/* Funcionalidad 3: Base de Datos */}
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <Book className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Base de Conocimiento</h3>
                <p className="text-gray-600">
                  Sistema RAG que indexa y busca en la colección de libros disponibles
                </p>
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                ¿Cómo funciona LIA?
              </h4>
              <p className="text-gray-600 mb-4">
                LIA utiliza un sistema RAG (Retrieval-Augmented Generation) que combina 
                la búsqueda en la base de datos de libros con inteligencia artificial 
                para proporcionar recomendaciones precisas y contextuales.
              </p>
              <div className="text-sm text-gray-500">
                <p><strong>Libros en biblioteca:</strong> {books.length}</p>
                <p><strong>Mensajes de chat:</strong> {chatMessages.length}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* PESTAÑA AGREGAR LIBRO - Formulario para nuevos libros */}
        <TabsContent value="add-book" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gray-900 rounded-full mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Agregar Nuevo Libro
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Complete el formulario para agregar un nuevo libro a la biblioteca. 
                Esta información se utilizará para generar recomendaciones más precisas.
              </p>
            </div>

            {/* Componente del formulario */}
            <AddBookForm onAddBook={onAddBook} />

            {/* Lista de libros agregados */}
            {books.length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  📚 Libros en la Biblioteca ({books.length})
                </h3>
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {books.map((book) => (
                    <div key={book.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{book.title}</h4>
                          <p className="text-gray-600 text-sm">{book.author}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Agregado: {book.dateAdded.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {book.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* PESTAÑA CHAT - Sistema de recomendaciones */}
        <TabsContent value="chat" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gray-900 rounded-full mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Chat de Recomendaciones
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Conversa con LIA para obtener recomendaciones personalizadas de libros 
                basadas en tus preferencias y el catálogo disponible.
              </p>
            </div>

            {/* Componente del chat */}
            <CollapsibleChat
              messages={chatMessages}
              onSendMessage={onSendMessage}
              isTyping={isTyping}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isExpanded={true} // Siempre expandido en esta pestaña
              showHeader={false} // No mostrar header porque ya está en la pestaña
            />
          </div>
        </TabsContent>

        {/* PESTAÑA ACERCA DE - Información del equipo */}
        <TabsContent value="about" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Acerca del Proyecto</h2>
              <p className="text-lg text-gray-600 mb-8">
                Proyecto Final - Machine Learning
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Haider */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">H</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Haider</h3>
                <p className="text-gray-600">Desarrollador</p>
              </div>

              {/* Valentina */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">V</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Valentina</h3>
                <p className="text-gray-600">Desarrolladora</p>
              </div>

              {/* Erich */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">E</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Erich</h3>
                <p className="text-gray-600">Desarrollador</p>
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                LIA - Lectura + IA
              </h4>
              <p className="text-gray-600 mb-4">
                Sistema inteligente de recomendación de libros desarrollado como proyecto 
                final del curso de Machine Learning. Utiliza técnicas de RAG (Retrieval-Augmented Generation) 
                para combinar búsqueda semántica con generación de texto, proporcionando 
                recomendaciones contextuales y precisas basadas en el catálogo de la biblioteca.
              </p>
              <div className="text-sm text-gray-500">
                <p><strong>Tecnologías:</strong> React, TypeScript, Machine Learning, RAG</p>
                <p><strong>Objetivo:</strong> Automatizar y mejorar la experiencia de recomendación de libros</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
