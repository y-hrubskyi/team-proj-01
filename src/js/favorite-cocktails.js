//! demo version, not tested, will be change

import { LOCAL_STORAGE_KEYS } from './constants';
import { renderFavoriteCocktails } from './render-functions';
import { removeFromLocalStorage } from './local-storage';

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
// const clearBtn = document.querySelector('.remove-from-localstorage-btn');

// function clearCart() {
//   if (favoriteCocktailsList.length === 0) {
//     placeholderEmptyFavoriteList.classList.remove('hidden');
//   } else {
//     const products = JSON.parse(localStorage.getItem('favorites')) || [];

//     products.splice(product => product._id, 1);
//     localStorage.setItem('favorites', JSON.stringify(products));

//     window.location.href = '../favorite-cocktails.html';
//     renderFavoriteCocktails(products, favoriteCocktailsList);
//   }
// }

// clearBtn.addEventListener('click', clearCart);
