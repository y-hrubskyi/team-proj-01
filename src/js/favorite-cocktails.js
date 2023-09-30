//! demo version, not tested, will be change

// import { LOCAL_STORAGE_KEYS } from './constants';
// import { renderFavoriteCocktails } from './render-functions';

// const favoriteCocktailsList = document.querySelector(
//   '.favorite-cocktails-list'
// );
// const placeholderEmptyFavoriteList = document.querySelector(
//   '.placeholder-empty-favorite-list'
// );

// const products = JSON.parse(localStorage.getItem('favorites')) || [];

// if (products.length) {
//   renderFavoriteCocktails(products, favoriteCocktailsList);
// }

// const clearBtn = document.querySelector('.remove-from-localstorage-btn');
// placeholderEmptyFavoriteList.classList.add('visually-hidden');
// favoriteCocktailsList.classList.remove('visually-hidden');

// function clearCart() {
//   if (!favoriteCocktailsList.length) {
//     placeholderEmptyFavoriteList.classList.remove('visually-hidden');
//   } else {
//     localStorage.clear();
//     renderFavoriteCocktails(products, favoriteCocktailsList);
//   }
// }

// clearBtn.addEventListener('click', clearCart);
