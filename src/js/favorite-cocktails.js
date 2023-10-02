//! demo version, not tested, will be change

import { LOCAL_STORAGE_KEYS } from './constants';
import { renderFavoriteCocktails } from './render-functions';

const favoriteCocktailsList = document.querySelector(
  '.favorite-cocktails-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

const products =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS)) || [];
console.log(products);

if (products.length) {
  renderFavoriteCocktails(products, favoriteCocktailsList);
  placeholderEmptyFavoriteList.classList.add('hidden');
}

favoriteCocktailsList.classList.remove('hidden');

//! удаление ещё нужно реализовать

const clearBtn = document.querySelector('.remove-from-localstorage-btn');

function clickHandler(e) {
  const button = e.target.closest('.remove-from-localstorage-btn');
  if (!button) return;

  const cardId = button.closest('.cocktail-card').dataset.id;

  let products =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS)) || [];
  const indexToRemove = products.findIndex(product => product._id === cardId);

  if (indexToRemove !== -1) {
    products.splice(indexToRemove, 1);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.COCKTAILS,
      JSON.stringify(products)
    );
  }

  window.location.href = '../favorite-cocktails.html';
  renderFavoriteCocktails(products, favoriteCocktailsList);
}

clearBtn.addEventListener('click', clickHandler);
