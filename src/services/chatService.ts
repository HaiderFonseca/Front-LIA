
// ============================================================================
// SERVICIO DE CHAT PARA LIA (Lectura + IA)
// ============================================================================
// Este archivo maneja la comunicación entre la interfaz y el modelo de IA local
// Aquí es donde debes conectar tu modelo de recomendaciones de libros

// ============ INTERFACES DE DATOS ============

// Interfaz para la solicitud de chat que se envía al modelo
interface ChatRequest {
  message: string;                    // Mensaje del usuario
  conversationHistory?: Array<{       // Historial de conversación
    text: string;                     // Contenido del mensaje
    isUser: boolean;                  // true = usuario, false = IA
    timestamp: Date;                  // Cuándo se envió
  }>;
}

// Interfaz para la respuesta del modelo de IA
interface ChatResponse {
  response: string;                   // Respuesta/recomendación generada
  confidence?: number;                // Nivel de confianza (0-1)
  recommendations?: string[];         // Lista de libros recomendados
  sources?: string[];                 // Fuentes usadas por RAG
}

// Interfaz para subir libros al sistema RAG
interface BookUploadRequest {
  title: string;
  author: string;
  description: string;
  review: string;
}

// ============ CLASE PRINCIPAL DEL SERVICIO ============
class ChatService {
  // ============ CONFIGURACIÓN DE CONEXIÓN ============
  // NOTA: Cambia esta URL según donde esté ejecutándose tu modelo
  private baseURL = 'http://localhost:8000';  // URL del modelo local
  
  // ============ MÉTODO PRINCIPAL: ENVIAR MENSAJE AL MODELO ============
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log('=== ENVIANDO SOLICITUD AL MODELO LOCAL ===');
      console.log('URL del modelo:', this.baseURL);
      console.log('Mensaje del usuario:', request.message);
      console.log('Historial de conversación:', request.conversationHistory?.length || 0, 'mensajes');
      
      // ============ AQUÍ SE REALIZA LA PETICIÓN AL MODELO ============
      // NOTA: Ajusta la URL y el formato según tu implementación
      const response = await fetch(`${this.baseURL}/chat/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          // ============ FORMATO DE ENTRADA PARA EL MODELO ============
          message: request.message,           // Pregunta del usuario
          history: request.conversationHistory, // Historial completo
          // Puedes agregar más campos aquí según necesites:
          // user_id: 'user123',
          // session_id: 'session456',
          // max_results: 5,
        }),
      });

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('=== RESPUESTA RECIBIDA DEL MODELO ===');
      console.log('Respuesta completa:', data);
      console.log('Recomendación:', data.response || data.recommendation);
      console.log('Confianza:', data.confidence);
      
      // ============ FORMATO DE SALIDA ESPERADO ============
      // NOTA: Ajusta estos campos según lo que devuelve tu modelo
      return {
        response: data.response || data.recommendation || data.answer,
        confidence: data.confidence,
        recommendations: data.recommendations || data.book_list,
        sources: data.sources || data.references
      };
      
    } catch (error) {
      console.error('=== ERROR AL CONECTAR CON EL MODELO ===');
      console.error('Error details:', error);
      
      // ============ MENSAJE DE ERROR PARA EL USUARIO ============
      // Respuesta de fallback cuando hay problemas de conexión
      return {
        response: "Lo siento, no puedo conectarme con el sistema de recomendaciones en este momento. Por favor, verifica que el modelo esté ejecutándose y vuelve a intentar.",
        confidence: 0
      };
    }
  }

  // ============ MÉTODO PARA SUBIR LIBROS AL SISTEMA RAG ============
  async uploadBook(bookData: BookUploadRequest): Promise<any> {
    try {
      console.log('=== SUBIENDO LIBRO AL SISTEMA RAG ===');
      console.log('Datos del libro:', bookData);
      
      // ============ PETICIÓN PARA INDEXAR NUEVO LIBRO ============
      const response = await fetch(`${this.baseURL}/books/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // ============ FORMATO PARA INDEXAR LIBRO EN RAG ============
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          review: bookData.review,
          // Campos adicionales que puedes necesitar:
          // genre: bookData.genre,
          // publication_year: bookData.year,
          // isbn: bookData.isbn,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('=== LIBRO INDEXADO EXITOSAMENTE ===');
      console.log('Resultado:', result);
      
      return result;
      
    } catch (error) {
      console.error('=== ERROR AL SUBIR LIBRO ===');
      console.error('Error:', error);
      throw error;
    }
  }

  // ============ MÉTODO PARA OBTENER ESTADÍSTICAS DEL SISTEMA ============
  async getSystemStats(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/stats`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const stats = await response.json();
      
      console.log('=== ESTADÍSTICAS DEL SISTEMA ===');
      console.log('Total de libros indexados:', stats.total_books);
      console.log('Consultas realizadas:', stats.total_queries);
      
      return stats;
      
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return null;
    }
  }

  // ============ MÉTODO PARA PROBAR CONEXIÓN ============
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        timeout: 5000, // 5 segundos de timeout
      });
      
      return response.ok;
      
    } catch (error) {
      console.error('Error probando conexión:', error);
      return false;
    }
  }
}

// ============ INSTANCIA SINGLETON DEL SERVICIO ============
export const chatService = new ChatService();

// ============ EXPORTAR TIPOS PARA USO EN OTROS ARCHIVOS ============
export type { ChatRequest, ChatResponse, BookUploadRequest };

// ============================================================================
// INSTRUCCIONES PARA CONECTAR TU MODELO:
// ============================================================================
// 
// 1. CAMBIAR LA URL BASE:
//    - Actualiza 'baseURL' con la dirección donde corre tu modelo
//    - Ejemplo: 'http://localhost:3001' o 'http://127.0.0.1:5000'
//
// 2. AJUSTAR ENDPOINTS:
//    - /chat/recommend: Para recomendaciones de libros
//    - /books/add: Para agregar libros al sistema RAG
//    - /stats: Para obtener estadísticas (opcional)
//    - /health: Para verificar estado del sistema (opcional)
//
// 3. ADAPTAR FORMATO DE DATOS:
//    - Modifica el JSON que se envía según lo que espera tu modelo
//    - Ajusta la interpretación de la respuesta según tu formato
//
// 4. MANEJO DE ERRORES:
//    - Personaliza los mensajes de error según tus necesidades
//    - Agrega logging adicional si es necesario
//
// 5. CAMPOS ADICIONALES:
//    - Agrega campos como user_id, session_id, etc. según necesites
//    - Incluye parámetros de configuración del modelo
//
// ============================================================================
