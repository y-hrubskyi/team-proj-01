import axios from 'axios';
import { renderCard } from './render-card';
renderCard;
const BASE_URL = 'https://drinkify.b.goit.study/api/v1/cocktails/';
const randonCocktailsBox = document.querySelector('.randon-cocktails-box-js');
console.log(randonCocktailsBox);

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

    const imgArray = data.map(img => img.drinkThumb);
    const arrayOfPromises = imgArray.map(img =>
      fetch(img).then(response.json).catch()
    );
    const results = await Promise.allSettled(arrayOfPromises);
    results.forEach((result, index) => {
      if (!result.value.ok) {
        data[index].drinkThumb = './img/placeholders/placeholder.jpg';
      }
    });

    responseProcessing(data);
  } catch (error) {
    console.log(error);
  }
}

async function responseProcessing(data) {
  try {
    renderCard(data, randonCocktailsBox);
  } catch (error) {
    console.log(error);
  }
}

fetchRandomCocktails();
