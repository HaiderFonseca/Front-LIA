
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, Save, AlertCircle } from 'lucide-react';
import { chatService } from '@/services/chatService';

// Interfaz para los datos del libro (sin id y dateAdded que se generan automáticamente)
interface BookFormData {
  title: string;
  author: string;
  description: string;
  rating: string;
}

// Props del componente
interface AddBookFormProps {
  onAddBook: (bookData: BookFormData) => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook }) => {
  // Estado del formulario
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    description: '',
    rating: ''
  });

  // Estado para mostrar errores de validación
  const [errors, setErrors] = useState<Partial<BookFormData>>({});
  
  // Estado para mostrar mensaje de éxito
  const [showSuccess, setShowSuccess] = useState(false);

  // ============ FUNCIÓN DE VALIDACIÓN ============
  const validateForm = (): boolean => {
    const newErrors: Partial<BookFormData> = {};

    // Validar título (obligatorio)
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    // Validar autor (obligatorio)
    if (!formData.author.trim()) {
      newErrors.author = 'El autor es obligatorio';
    }

    // Validar descripción (obligatorio, mínimo 20 caracteres)
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
    }

    const ratingFloat = parseFloat(formData.rating);
    if (isNaN(ratingFloat)) {
      newErrors.rating = 'La calificación es obligatoria';
    } else if (ratingFloat < 0 || ratingFloat > 5) {
      newErrors.rating = 'Debe estar entre 0 y 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ============ MANEJO DE CAMBIOS EN EL FORMULARIO ============
  const handleInputChange = (field: keyof BookFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  const handleFloatInputChange = (field: keyof BookFormData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // ============ FUNCIÓN PARA ENVIAR EL FORMULARIO ============
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('=== INTENTANDO AGREGAR NUEVO LIBRO ===');
    console.log('Datos del formulario:', formData);

    if (!validateForm()) {
      console.log('Formulario inválido:', errors);
      return;
    }

    try {
      const result = await chatService.uploadBook(formData);

      if (result?.success) {
        console.log('Libro agregado correctamente en el backend.');
        console.log('Mensaje del backend:', result.message);
        onAddBook(formData);
        // Mostrar mensaje de éxito
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Limpiar formulario
        setFormData({
          title: '',
          author: '',
          description: '',
          rating: ''
        });

      } else {
        console.warn(' El backend no confirmó el éxito.');
        console.warn('Respuesta:', result);

        // Aquí podrías mostrar un mensaje de error al usuario también
      }

    } catch (error) {
      console.error(' Error al agregar libro:', error);
      // Aquí también podrías mostrar un mensaje visual de error
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Mensaje de éxito */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">
            ¡Libro agregado exitosamente a la biblioteca!
          </span>
        </div>
      )}

      {/* Formulario principal */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo: Título del libro */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-medium text-gray-700">
            Título del Libro *
          </Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Ej: Cien años de soledad"
            className={`w-full ${errors.title ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
          />
          {errors.title && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.title}
            </div>
          )}
        </div>

        {/* Campo: Autor */}
        <div className="space-y-2">
          <Label htmlFor="author" className="text-sm font-medium text-gray-700">
            Autor *
          </Label>
          <Input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            placeholder="Ej: Gabriel García Márquez"
            className={`w-full ${errors.author ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
          />
          {errors.author && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.author}
            </div>
          )}
        </div>

        {/* Campo: Descripción */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium text-gray-700">
            Descripción del Libro *
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe el contenido, género, temática principal del libro..."
            rows={4}
            className={`w-full resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
          />
          <div className="flex justify-between items-center">
            {errors.description && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.description}
              </div>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {formData.description.length} caracteres (mínimo 20)
            </span>
          </div>
        </div>

        {/* Campo: Calificación */}
        <div className="space-y-2">
          <Label htmlFor="rating" className="text-sm font-medium text-gray-700">
            Calificación (de 0 a 5) *
          </Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating}
            onChange={(e) => handleInputChange('rating', e.target.value)}
            placeholder="Ej: 4.5"
            className={`w-full ${errors.rating ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}`}
          />
          {errors.rating && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.rating}
            </div>
          )}
        </div>


        {/* Botón de envío */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-2 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Agregar Libro a la Biblioteca
          </Button>
        </div>
      </form>

      {/* Información adicional */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Información Importante</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Todos los campos son obligatorios para una mejor indexación</li>
          <li>• La descripción y reseña ayudan al sistema RAG a hacer mejores recomendaciones</li>
          <li>• Los datos se guardan localmente y se envían al modelo para indexación</li>
          <li>• Asegúrate de que la información sea precisa y completa</li>
        </ul>
      </div>
    </div>
  );
};

export default AddBookForm;
