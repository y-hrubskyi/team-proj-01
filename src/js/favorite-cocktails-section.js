import { LOCAL_STORAGE_KEYS } from './constants';
import { renderFavoriteCocktails } from './render-functions';
import { removeFromLocalStorage } from './local-storage';

let rows = 6;

const favoriteCocktailsList = document.querySelector(
  '.favorite-cocktails-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

const products =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS)) || [];
console.log(products);

if (products.length > rows) {
  const paginationFn = paginateArray(products, rows);
  renderCocktails(paginationFn, favoriteCocktailsList);
}

if (products.length) {
  renderFavoriteCocktails(products, favoriteCocktailsList);
  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');
  favoriteCocktailsList.classList.remove('visually-hidden');
}

//! удаление ещё нужно реализовать
// const clearBtn = document.querySelector('.remove-from-localstorage-btn');

// function clearCart() {
//   if (favoriteCocktailsList.length === 0) {
//     placeholderEmptyFavoriteList.classList.remove('visually-hidden');
//   } else {
//     const products = JSON.parse(localStorage.getItem('favorites')) || [];

//     products.splice(product => product._id, 1);
//     localStorage.setItem('favorites', JSON.stringify(products));

//     window.location.href = '../favorite-cocktails.html';
//     renderFavoriteCocktails(products, favoriteCocktailsList);
//   }
// }

// clearBtn.addEventListener('click', clearCart);
