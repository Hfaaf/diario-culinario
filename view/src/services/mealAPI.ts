import axios from 'axios';
import type { IMealApiResponse } from '../types/recipe.types';

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchRandomMeal = async (): Promise<IMealApiResponse> => {
  const response = await axios.get(`${API_URL}/random.php`);
  return response.data;
};