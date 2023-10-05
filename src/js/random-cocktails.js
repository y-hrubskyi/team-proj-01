// import placeholder from '/img/placeholder.jpg';

import { LOCAL_STORAGE_KEYS } from './services/local-storage-service';
import { getRandomCocktails } from './services/drinkify-api-service';
import { createCocktailsMarkup } from './render-functions';
import {
  setupClickHandlerOnOpenModal,
  setupClickHandlerOnWorkWithLocaleStorage,
} from './setup-handlers';
import { sortByRating } from './features/sort-by-rating';

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
    const data = await getRandomCocktails(params);

    // demo check on available img
    // const imgArray = data.map(img => img.drinkThumb);
    // console.log(imgArray);
    // const arrayOfPromises = imgArray.map(img =>
    //   fetch(img).then(response.json).catch()
    // );
    // console.log(arrayOfPromises);
    // const results = await Promise.allSettled(arrayOfPromises);
    // console.log(results);
    // results.forEach((result, index) => {
    //   if (!result.value.ok) {
    //     data[index].drinkThumb = placeholder;
    //   }
    // });

    responseProcessing(data);
  } catch (error) {
    console.log(error);
  }
}

async function responseProcessing(data) {
  try {
    randomCocktailsList.innerHTML = createCocktailsMarkup(data);
    setupClickHandlerOnWorkWithLocaleStorage(
      data,
      randomCocktailsList,
      LOCAL_STORAGE_KEYS.COCKTAILS
    );
    setupClickHandlerOnOpenModal(randomCocktailsList);
    sortByRating(randomCocktailsList);
  } catch (error) {
    console.log(error);
  }
}

fetchRandomCocktails();
