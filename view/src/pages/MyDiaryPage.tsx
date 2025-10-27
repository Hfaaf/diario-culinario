import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserRecipes } from '../services/userRecipeAPI';
import type { IUserRecipe } from '../types/recipe.types';

const BACKEND_URL = 'http://localhost:5100'; 

const MyDiaryPage = () => {
  const [recipes, setRecipes] = useState<IUserRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getUserRecipes();
        setRecipes(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar seu diário.');
      }
      setIsLoading(false);
    };

    loadRecipes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Meu Diário Culinário</h1>
      
      {isLoading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && recipes.length === 0 && (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-lg">Seu diário está vazio.</p>
          <Link to="/add" className="text-blue-600 font-semibold">
            Adicione sua primeira receita!
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={`${BACKEND_URL}${recipe.imageUrl}`} 
              alt={recipe.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-bold">{recipe.title}</h2>
              <p className="text-sm text-gray-500">{new Date(recipe.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDiaryPage;