import { LOCAL_STORAGE_KEYS } from './constants';
import { getIngredientById } from './drinkify-api-service';
import { setupModalCloseListeners } from './modal-close-listeners';
import { paginateArray } from './pagination';
import {
  createFavoriteIngredientsMarkup,
  renderModalIngredient,
} from './render-functions';
import { setupClickHandlerOnModalOnWorkWithLocaleStorage } from './setup-handlers';

const favoriteIngredientsList = document.querySelector(
  '.favorite-ingredients-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

let rows = 6;

function renderFavoriteIngredients() {
  const products =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS)) || [];

  if (!products.length) {
    favoriteIngredientsList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
    return;
  }

  const paginationFn = paginateArray(
    products,
    rows,
    favoriteIngredientsList,
    createFavoriteIngredientsMarkup
  );

  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');

  favoriteIngredientsList.classList.remove('visually-hidden');
  favoriteIngredientsList.innerHTML =
    createFavoriteIngredientsMarkup(paginationFn);
  favoriteIngredientsList.addEventListener('click', clickHandler);
}

function clickHandler(e) {
  const target = e.target;

  if (target.closest('.remove-from-localstorage-btn')) {
    onRemoveBtnCLick(target);
  }
  if (target.closest('.learn-more-btn')) {
    onLearnMoreBtnCLick(target);
  }
}

async function onLearnMoreBtnCLick(button) {
  const ingredientId = button.closest('.favorite-ingredient-item').dataset.id;
  const ingredient = await getIngredientById(ingredientId);
  renderModalIngredient(...ingredient);
  setupModalCloseListeners();
  setupClickHandlerOnModalOnWorkWithLocaleStorage(
    ingredient,
    LOCAL_STORAGE_KEYS.INGREDIENTS,
    createFavoriteIngredientsMarkup
  );
}

function onRemoveBtnCLick(button) {
  const cardId = button.closest('.favorite-ingredient-item').dataset.id;

  let products =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS)) || [];
  const indexToRemove = products.findIndex(product => product._id === cardId);

  if (indexToRemove !== -1) {
    products.splice(indexToRemove, 1);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.INGREDIENTS,
      JSON.stringify(products)
    );
  }

  if (!products.length) {
    favoriteIngredientsList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
  } else {
    favoriteIngredientsList.innerHTML =
      createFavoriteIngredientsMarkup(products);
  }
}

renderFavoriteIngredients();
