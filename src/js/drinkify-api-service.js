import axios from 'axios';
import { BASE_URL } from './constants';

export async function getCocktailById(id) {
  const response = await axios.get(`${BASE_URL}/cocktails/lookup/?id=${id}`);
  return response.data;
}

export async function getIngredientById(id) {
  const response = await axios.get(`${BASE_URL}/ingredients/${id}`);
  return response.data;
}
