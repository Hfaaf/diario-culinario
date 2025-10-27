export interface IMealDetails {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
}

export interface IMealApiResponse {
  meals: IMealDetails[] | null;
}

export interface IUserRecipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string; 
  createdAt: string;
}