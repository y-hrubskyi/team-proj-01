import { LOCAL_STORAGE_KEYS } from './constants';
import { renderFavoriteCocktails } from './render-functions';
import { removeFromLocalStorage } from './local-storage';

const favoriteCocktailsList = document.querySelector(
  '.favorite-ingredients-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

const products =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS)) || [];
console.log(products);

if (products.length) {
  renderFavoriteCocktails(products, favoriteCocktailsList);
  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');
  favoriteCocktailsList.classList.remove('visually-hidden');
}
