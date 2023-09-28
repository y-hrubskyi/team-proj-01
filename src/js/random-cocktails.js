import axios from 'axios';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/cocktails/';

export async function fetchRandomCocktails() {
  const params = {
    r: 9,
  };

  const response = await axios.get(BASE_URL, { params });
  const data = response.data;

  return responseProcessing(data);
}

async function responseProcessing(data) {
  try {
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchRandomCocktails();
