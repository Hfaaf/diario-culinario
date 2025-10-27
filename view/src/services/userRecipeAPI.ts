import axios from 'axios';
import type { IUserRecipe } from '../types/recipe.types';

const API_URL = 'https://localhost:44317/api/UserRecipes';

// Busca todas as receitas do diário
export const getUserRecipes = async (): Promise<IUserRecipe[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addUserRecipe = async (
  title: string,
  ingredients: string,
  instructions: string,
  imageFile: Blob
): Promise<IUserRecipe> => {
  
  const formData = new FormData();
  formData.append('Title', title);
  formData.append('Ingredients', ingredients);
  formData.append('Instructions', instructions);
  formData.append('ImageFile', imageFile, 'recipe.jpg'); 

  const response = await axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};