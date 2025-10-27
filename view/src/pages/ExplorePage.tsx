import { useState } from 'react';
import { fetchRandomMeal } from '../services/mealAPI';
import type { IMealDetails } from '../types/recipe.types';

const ExplorePage = () => {
  const [meal, setMeal] = useState<IMealDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRandomMeal = async () => {
    setIsLoading(true);
    setError(null);
    setMeal(null);
    try {
      const data = await fetchRandomMeal();
      if (data.meals && data.meals.length > 0) {
        setMeal(data.meals[0]);
      } else {
        setError('Nenhuma receita encontrada.');
      }
    } catch (err) {
      console.error(err);
      setError('Falha ao buscar receita.');
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Explore Novas Receitas</h1>
      <button
        onClick={handleGetRandomMeal}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Buscando...' : 'Me Traga uma Receita Aleatória!'}
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {meal && (
        <div className="mt-6 bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{meal.strMeal}</h2>
            <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">{meal.strCategory}</span>
            <p className="text-gray-700 mt-4 whitespace-pre-wrap">{meal.strInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;