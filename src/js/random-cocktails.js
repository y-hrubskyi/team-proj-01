import axios from 'axios';
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/cocktails/';

function getDeviceType() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    return 'desktop';
  } else {
    return 'tablet';
  }
}

export async function fetchRandomCocktails() {
  const deviceType = getDeviceType();
  const numberOfCocktails = deviceType === 'desktop' ? 9 : 8;

  const params = {
    r: numberOfCocktails,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    const data = response.data;
    responseProcessing(data);
  } catch (error) {
    console.log(error);
  }
}

async function responseProcessing(data) {
  try {
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

fetchRandomCocktails();
