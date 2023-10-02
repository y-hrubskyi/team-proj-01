import axios from 'axios';

import { BASE_URL, LOCAL_STORAGE_KEYS } from './constants';
import { renderCocktails } from './render-functions';
import { setupClickHandlerOnWorkWithLocaleStorage } from './setup-handlers';

const randomCocktailsList = document.querySelector('.random-cocktails-list-js');

export function getDeviceType() {
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

    const imgArray = data.map(img => img.drinkThumb);
    const arrayOfPromises = imgArray.map(img =>
      fetch(img).then(response.json).catch()
    );
    const results = await Promise.allSettled(arrayOfPromises);
    results.forEach((result, index) => {
      if (!result.value.ok) {
        data[index].drinkThumb = './img/placeholder.jpg';
      }
    });

    responseProcessing(data);
  } catch (error) {
    console.log(error);
  }
}

async function responseProcessing(data) {
  try {
    renderCocktails(data, randomCocktailsList);
    setupClickHandlerOnWorkWithLocaleStorage(
      data,
      randomCocktailsList,
      LOCAL_STORAGE_KEYS.COCKTAILS
    );
  } catch (error) {
    console.log(error);
  }
}

fetchRandomCocktails();
