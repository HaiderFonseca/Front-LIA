
// Servicio para conectar con tu API de FastAPI
// Aquí está claramente estructurado donde hacer las peticiones

interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    text: string;
    isUser: boolean;
    timestamp: Date;
  }>;
}

interface ChatResponse {
  response: string;
  confidence?: number;
  recommendations?: string[];
}

class ChatService {
  private baseURL = 'http://localhost:8000'; // Cambia por tu URL de FastAPI
  
  // AQUÍ ES DONDE ENVÍAS LA PETICIÓN A TU MODELO
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      console.log('Sending message to FastAPI:', request);
      
      // TODO: Reemplaza esta URL con tu endpoint real
      const response = await fetch(`${this.baseURL}/chat/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request.message,
          history: request.conversationHistory
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // AQUÍ RECIBES LA RESPUESTA DE TU MODELO
      console.log('Received response from FastAPI:', data);
      
      return {
        response: data.response || data.recommendation,
        confidence: data.confidence,
        recommendations: data.recommendations
      };
      
    } catch (error) {
      console.error('Error calling FastAPI:', error);
      
      // Fallback response mientras desarrollas
      return {
        response: "Lo siento, hay un problema de conexión con el servidor. Por favor, intenta más tarde.",
        confidence: 0
      };
    }
  }

  // Método para subir PDFs (si lo necesitas)
  async uploadPDFs(files: File[]): Promise<any> {
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${this.baseURL}/upload/pdfs`, {
        method: 'POST',
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error('Error uploading PDFs:', error);
      throw error;
    }
  }
}

export const chatService = new ChatService();
export type { ChatRequest, ChatResponse };
