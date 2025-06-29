
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
  rating: string;
}

interface SystemStats {
  total_books: number;
  total_queries: number;
}


// ============ CLASE PRINCIPAL DEL SERVICIO ============
class ChatService {
  // ============ CONFIGURACIÓN DE CONEXIÓN ============
  // NOTA: Cambia esta URL según donde esté ejecutándose tu modelo
  private baseURL = 'http://localhost:8000';  // URL del modelo local
  
  // ============ MÉTODO PRINCIPAL: ENVIAR MENSAJE AL MODELO ============
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log('=== ENVIANDO TEXTO A /embed_text DEL MODELO LOCAL ===');
      console.log('URL del modelo:', 'http://34.123.171.27:8002/embed_text');
      console.log('Mensaje del usuario:', request.message);

      const response = await fetch('http://34.123.171.27:8002/embed_text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text: request.message,
          chat_id: 0,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      console.log('=== RESPUESTA RECIBIDA DE /embed_text ===');
      console.log('Respuesta completa:', data);
      console.log('Usando solo el campo "response":', data.response);

      return {
        response: data.response,
        confidence: 1, // Valor fijo ya que no viene del modelo
      };

    } catch (error) {
      console.error('=== ERROR AL CONECTAR CON EL MODELO ===');
      console.error('Detalles del error:', error);

      return {
        response: "Lo siento, no puedo conectarme con el sistema de recomendaciones en este momento. Por favor, verifica que el modelo esté ejecutándose y vuelve a intentar.",
        confidence: 0,
      };
    }
  }

  // ============ MÉTODO PARA SUBIR LIBROS AL SISTEMA RAG ============
  async uploadBook(bookData: BookUploadRequest): Promise<any> {
  try {
    console.log('=== SUBIENDO LIBRO AL SISTEMA RAG ===');
    console.log('Datos del libro:', bookData);

    const parsedRating = parseFloat(bookData.rating);
    if (isNaN(parsedRating)) {
      return { success: false, error: 'Rating inválido' };
    }

    const response = await fetch('http://34.123.171.27:8001/upload_document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: 0,
        titulo: bookData.title,
        texto: bookData.description,
        rating: parsedRating,
      }),
    });

    if (!response.ok) {
      return { success: false, error: `Error HTTP: ${response.status}` };
    }

    const result = await response.json();
    return { success: true, data: result };

  } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
        return { success: false, error: error.message };
      } else {
        console.error('Error desconocido:', error);
        return { success: false, error: 'Ocurrió un error inesperado.' };
      }
    }
  }

  // ============ MÉTODO PARA OBTENER ESTADÍSTICAS DEL SISTEMA ============
  async getSystemStats(): Promise<SystemStats | null> {
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        signal: controller.signal,
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
