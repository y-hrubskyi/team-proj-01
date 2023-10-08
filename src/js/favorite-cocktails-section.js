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
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.CURRENT_DATA,
    JSON.stringify(products)
  );
  const instance = paginateLibFn(
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
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_DATA,
      JSON.stringify(products)
    );
  }

  if (!products.length) {
    favoriteCocktailsList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
    return;
  }
  //! lib
  // paginateLibFn(
  //   products,
  //   6,
  //   favoriteCocktailsList,
  //   createFavoriteCocktailsMarkup
  // );

  //! lib remove
  // console.log('PRODUCTS: ', products);
  // console.log('INSTANCE: ', instance);

  const paginationContainer = document.querySelector(
    '#tui-pagination-container'
  );
  if (products.length <= instance?._options?.itemsPerPage) {
    paginationContainer.classList.add('is-hidden');
    favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(products);
    return;
  }

  const currentPage = instance.getCurrentPage();
  // console.log('currentPage: ', currentPage);
  const itemsPerPage = instance._options.itemsPerPage;
  // console.log('itemsPerPage: ', itemsPerPage);

  instance.setTotalItems(products.length);
  const totalItems = instance._options.totalItems;
  // console.log('totalItems: ', totalItems);

  const startIndex = (currentPage - 1) * itemsPerPage;
  favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(
    products.slice(startIndex, startIndex + itemsPerPage)
  );

  if (totalItems % itemsPerPage === 0) {
    instance.reset(products.length);

    if (currentPage * itemsPerPage > totalItems) {
      instance.movePageTo(currentPage - 1);
    } else {
      instance.movePageTo(currentPage);
    }
  }

  //* default
  //* favoriteCocktailsList.innerHTML = createFavoriteCocktailsMarkup(products);
}

renderFavoriteCocktails();
