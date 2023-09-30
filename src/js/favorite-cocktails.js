import { LOCAL_STORAGE_KEYS } from './constants';
import { renderFavoriteCocktails } from './render-functions';

const cocktailsItem = document.querySelector('.cocktails-item');
const favoriteContent = document.querySelector('.favorite-content');
const clearBtn = document.querySelector('.remove-from-localstorage-btn');

const products = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS));

cocktailsItem.classList.add('hidden');

renderFavoriteCocktails(products, cocktailsItem);
favoriteContent.classList.add('hidden');
cocktailsItem.classList.remove('hidden');

function clearCart() {
  if (cocktailsItem.length === 0) {
    favoriteContent.classList.remove('hidden');
  } else {
    localStorage.clear();
    renderFavoriteCocktails(products, cocktailsItem);
  }
}

clearBtn.addEventListener('click', clearCart);
