import { LOCAL_STORAGE_KEYS } from './constants';
import { paginateArray } from './pagination';
import {
  createFavoriteCocktailsMarkup,
  createCocktailsMarkup,
} from './render-functions';
import { setupClickHandlerOnOpenModal } from './setup-handlers';

let rows = 6;

const favoriteCocktailsList = document.querySelector(
  '.favorite-cocktails-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

function renderFavoriteCocktails() {
  const products =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS)) || [];

  if (products.length) {
    const paginationFn = paginateArray(
      products,
      rows,
      favoriteCocktailsList,
      createFavoriteCocktailsMarkup
    );
    favoriteCocktailsList.innerHTML = createCocktailsMarkup(paginationFn);
    placeholderEmptyFavoriteList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.remove('is-empty');

    favoriteCocktailsList.classList.remove('visually-hidden');
    favoriteCocktailsList.innerHTML =
      createFavoriteCocktailsMarkup(paginationFn);
    favoriteCocktailsList.addEventListener('click', clickHandler);
    setupClickHandlerOnOpenModal(
      favoriteCocktailsList,
      createFavoriteCocktailsMarkup
    );
  }
}

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

  if (!products.length) {
    favoriteCocktailsList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
  } else {
    favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(products);
  }
}

renderFavoriteCocktails();
