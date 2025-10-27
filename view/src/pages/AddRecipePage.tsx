import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCamera } from '../hooks/useCamera';
import { addUserRecipe } from '../services/userRecipeAPI';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const { videoRef, canvasRef, stream, error: cameraError, startCamera, stopCamera, takePhoto } = useCamera();
  
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Lida com a captura da foto
  const handleTakePhoto = async () => {
    const blob = await takePhoto();
    if (blob) {
      setPhotoBlob(blob);
      setPhotoPreview(URL.createObjectURL(blob)); // Cria preview
      stopCamera(); // Desliga a câmera após a foto
    }
  };

  // Lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoBlob || !title || !ingredients || !instructions) {
      setSubmitError('Todos os campos e a foto são obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addUserRecipe(title, ingredients, instructions, photoBlob);
      setIsSubmitting(false);
      // Sucesso! Limpa o formulário e navega para o diário
      navigate('/diary');
    } catch (err) {
      console.error(err);
      setSubmitError('Falha ao salvar a receita. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const isCameraOpen = stream !== null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Adicionar ao Diário</h1>
      
      {/* 1. Captura da Câmera */}
      <div className="mb-4 bg-gray-200 rounded-lg overflow-hidden">
        {/* Preview da foto tirada */}
        {photoPreview && !isCameraOpen && (
          <img src={photoPreview} alt="Preview da receita" className="w-full" />
        )}
        
        {/* Player de vídeo da câmera */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full ${isCameraOpen ? 'block' : 'hidden'}`}
        />
        
        {/* Canvas (oculto) para processar a imagem */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Botões da Câmera */}
      <div className="flex gap-2 mb-4">
        {!isCameraOpen ? (
          <button onClick={startCamera} className="flex-1 bg-blue-500 text-white p-3 rounded-lg shadow">
            {photoPreview ? 'Tirar Outra Foto' : 'Abrir Câmera'}
          </button>
        ) : (
          <>
            <button onClick={handleTakePhoto} className="flex-1 bg-green-500 text-white p-3 rounded-lg shadow">
              Tirar Foto
            </button>
            <button onClick={stopCamera} className="flex-1 bg-red-500 text-white p-3 rounded-lg shadow">
              Fechar Câmera
            </button>
          </>
        )}
      </div>
      {cameraError && <p className="text-red-500 text-sm mb-4">{cameraError}</p>}

      {/* 2. Formulário da Receita */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">Ingredientes</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={5}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">Instruções</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={8}
            required
          />
        </div>

        {submitError && <p className="text-red-500 text-center mb-4">{submitError}</p>}
        
        <button
          type="submit"
          disabled={isSubmitting || !photoBlob}
          className="w-full bg-green-600 text-white p-4 rounded-lg font-bold shadow-lg disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Receita'}
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;