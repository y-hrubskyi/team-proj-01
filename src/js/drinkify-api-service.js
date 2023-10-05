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

export async function searchCocktailsByFillter({
  firstLetter,
  cocktailName,
} = {}) {
  const requestURL = new URL(`${BASE_URL}/cocktails/search/`);
  if (firstLetter) {
    requestURL.searchParams.append(`f`, firstLetter);
  }
  if (cocktailName) {
    requestURL.searchParams.append(`s`, cocktailName);
  }

  const response = await axios.get(requestURL);
  return response.data;
}
