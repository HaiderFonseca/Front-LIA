
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Users, MessageCircle, Upload } from 'lucide-react';

const TabsSection = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Tabs defaultValue="home" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 border border-gray-200">
          <TabsTrigger 
            value="home" 
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <Book className="w-4 h-4" />
            Inicio
          </TabsTrigger>
          <TabsTrigger 
            value="chat"
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <MessageCircle className="w-4 h-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger 
            value="about"
            className="flex items-center gap-2 text-gray-700 data-[state=active]:bg-white data-[state=active]:text-gray-900"
          >
            <Users className="w-4 h-4" />
            Acerca de
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-gray-900 rounded-full mb-4">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sistema de Recomendaciones de Libros
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Descubre tu próxima lectura favorita con nuestro sistema inteligente de 
                recomendaciones impulsado por machine learning.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <MessageCircle className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chat Inteligente</h3>
                <p className="text-gray-600">
                  Conversa con nuestro asistente IA para obtener recomendaciones personalizadas
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <Upload className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sube PDFs</h3>
                <p className="text-gray-600">
                  Analiza tus documentos para obtener recomendaciones más precisas
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-100">
                <Book className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Libros Populares</h3>
                <p className="text-gray-600">
                  Explora las recomendaciones basadas en títulos populares y clásicos
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Utiliza el chat para comenzar a recibir recomendaciones personalizadas
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Acerca del Proyecto</h2>
              <p className="text-lg text-gray-600 mb-8">
                Proyecto final de Machine Learning - Sistema de Recomendaciones de Libros
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">H</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Haider</h3>
                <p className="text-gray-600">Desarrollador</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">V</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Valentina</h3>
                <p className="text-gray-600">Desarrolladora</p>
              </div>

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
                Proyecto Final - Machine Learning
              </h4>
              <p className="text-gray-600">
                Este sistema utiliza algoritmos de machine learning para analizar preferencias 
                de lectura y proporcionar recomendaciones personalizadas de libros basadas en 
                el comportamiento del usuario y análisis de contenido.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
