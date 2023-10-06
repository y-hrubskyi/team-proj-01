import { LOCAL_STORAGE_KEYS } from './services/local-storage-service';
//? import { paginateArray } from './pagination';
import { createFavoriteCocktailsMarkup } from './render-functions';
import { setupClickHandlerOnOpenModal } from './setup-handlers';
import { paginateLibFn } from './tui-lib-pagination';

// let rows = 6;

const favoriteCocktailsList = document.querySelector(
  '.favorite-cocktails-list'
);
const placeholderEmptyFavoriteList = document.querySelector(
  '.placeholder-empty-favorite-list'
);

function renderFavoriteCocktails() {
  const products =
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.COCKTAILS)) || [];

  if (!products.length) {
    favoriteCocktailsList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
    return;
  }

  //? manual
  //? const paginationFn = paginateArray(
  //?   products,
  //?   rows,
  //?   favoriteCocktailsList,
  //?   createFavoriteCocktailsMarkup
  //? );

  //? manual
  //? favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(paginationFn);

  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');

  favoriteCocktailsList.classList.remove('visually-hidden');

  //* default
  //* favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(products);

  //! lib
  const instance = paginateLibFn(
    products,
    6,
    favoriteCocktailsList,
    createFavoriteCocktailsMarkup
  );

  favoriteCocktailsList.addEventListener('click', e => {
    clickHandler(e, instance);
  });
  setupClickHandlerOnOpenModal(
    favoriteCocktailsList,
    createFavoriteCocktailsMarkup,
    instance
  );
}

function clickHandler(e, instance) {
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
    //! lib
    // paginateLibFn(
    //   products,
    //   6,
    //   favoriteCocktailsList,
    //   createFavoriteCocktailsMarkup
    // );

    //! lib remove
    const currentPage = instance.getCurrentPage();
    const itemsPerPage = instance._options.itemsPerPage;

    instance.setTotalItems(products.length);
    const totalItems = instance._options.totalItems;

    const startIndex = (currentPage - 1) * itemsPerPage;
    favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(
      products.slice(startIndex, startIndex + itemsPerPage)
    );

    if (totalItems % itemsPerPage === 0) {
      instance.reset(products.length);
      instance.movePageTo(currentPage - 1);
    }

    //* default
    //* favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(products);
  }
}

renderFavoriteCocktails();
