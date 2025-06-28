
import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PDFUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    // TODO: Aquí conectarás con tu API de FastAPI
    console.log('Uploading files to FastAPI:', uploadedFiles);
    
    // Ejemplo de como enviar a tu API:
    /*
    const formData = new FormData();
    uploadedFiles.forEach(file => {
      formData.append('files', file);
    });
    
    try {
      const response = await fetch('YOUR_FASTAPI_ENDPOINT/upload-pdfs', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log('Upload result:', result);
    } catch (error) {
      console.error('Upload error:', error);
    }
    */
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Subir PDFs para Análisis
      </h3>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-gray-600 bg-gray-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          Arrastra y suelta tus PDFs aquí o
        </p>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            Selecciona archivos
          </Button>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-900 mb-2">Archivos seleccionados:</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
                <div className="flex items-center gap-2">
                  <File className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button 
            onClick={uploadFiles}
            className="mt-4 bg-gray-900 hover:bg-gray-800 text-white"
          >
            Subir y Analizar PDFs
          </Button>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
