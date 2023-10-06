import { LOCAL_STORAGE_KEYS } from './services/local-storage-service';
import { getIngredientById } from './services/drinkify-api-service';
import { setupModalCloseListeners } from './modal-close-listeners';
//? import { paginateArray } from './pagination';
import {
  createFavoriteIngredientsMarkup,
  renderModalIngredient,
} from './render-functions';
import { setupClickHandlerOnModalOnWorkWithLocaleStorage } from './setup-handlers';
import { paginateLibFn } from './tui-lib-pagination';

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

  //? manual
  //? const paginationFn = paginateArray(
  //?   products,
  //?   rows,
  //?   favoriteIngredientsList,
  //?   createFavoriteIngredientsMarkup
  //? );

  //! lib
  const instance = paginateLibFn(
    products,
    6,
    favoriteIngredientsList,
    createFavoriteIngredientsMarkup
  );
  console.log(instance);

  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');

  favoriteIngredientsList.classList.remove('visually-hidden');
  //? manual
  //? favoriteIngredientsList.innerHTML =
  //?   createFavoriteIngredientsMarkup(paginationFn);

  //* default
  //* favoriteIngredientsList.innerHTML = createFavoriteIngredientsMarkup(products);
  favoriteIngredientsList.addEventListener('click', e => {
    clickHandler(e, instance);
  });
}

function clickHandler(e, instance) {
  const target = e.target;

  if (target.closest('.remove-from-localstorage-btn')) {
    onRemoveBtnCLick(target, instance);
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

function onRemoveBtnCLick(button, instance) {
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
    //* default
    //* favoriteIngredientsList.innerHTML =
    //*  createFavoriteIngredientsMarkup(products);

    //! lib
    // paginateLibFn(
    //   products,
    //   6,
    //   favoriteIngredientsList,
    //   createFavoriteIngredientsMarkup
    // );

    console.log(instance);
    const currentPage = instance.getCurrentPage();
    console.log('curPage: ', currentPage);
    const itemsPerPage = instance._options.itemsPerPage;
    console.log('itemsPerPage: ', itemsPerPage);

    instance.setTotalItems(products.length);
    const totalItems = instance._options.totalItems;
    console.log('totalItems ', totalItems);

    const startIndex = (currentPage - 1) * itemsPerPage;
    favoriteIngredientsList.innerHTML = createFavoriteIngredientsMarkup(
      products.slice(startIndex, startIndex + itemsPerPage)
    );

    if (totalItems % itemsPerPage === 0) {
      instance.reset(products.length);
      instance.movePageTo(currentPage - 1);
    }

    console.log('products: ', products);
  }
}

// import Pagination from 'tui-pagination';
// prepareForRender();

// function prepareForRender() {
//   const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS));
//   const options = {
//     totalItems: data.length,
//     itemsPerPage: 3,
//     visiblePages: 5,
//     usageStatistics: false,
//     // firstItemClassName: 'smth',
//     // lastItemClassName: 'smth',
//     // template: {
//     //   page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     //   currentPage:
//     //     '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     //   moveButton:
//     //     '<a href="#" class="tui-page-btn tui-{{type}}">' +
//     //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//     //     '</a>',
//     //   disabledMoveButton:
//     //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//     //     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//     //     '</span>',
//     //   moreButton:
//     //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//     //     '<span class="tui-ico-ellip">...</span>' +
//     //     '</a>',
//     // },
//   };

//   const container = document.querySelector('#tui-pagination-container');
//   const instance = new Pagination(container, options);
//   // console.log(instance);

//   instance.on('beforeMove', function (eventData) {
//     console.log('EVENT DATA BEFORE MOVE ');
//     console.log(eventData);
//     onPaginateClick(eventData);
//   });

//   // instance.on('afterMove', function (eventData) {
//   //   console.log('EVENT DATA AFTER MOVE');
//   //   console.log(eventData);
//   // });

//   // container.addEventListener('click', onPaginateClick);
//   // console.log(instance._options.itemsPerPage);

//   function onPaginateClick(eventData) {
//     // const perPage =
//     const curPage = eventData.page;

//     const itemsPerPage = instance._options.itemsPerPage;
//     console.log(curPage);

//     const data = JSON.parse(
//       localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS)
//     );
//     instance.setTotalItems(data.length);

//     const list = document.querySelector('.favorite-list');
//     const startIndex = (curPage - 1) * itemsPerPage;
//     list.innerHTML = createFavoriteIngredientsMarkup(
//       data.slice(startIndex, startIndex + itemsPerPage)
//     );

//     console.log(data);
//   }
// }

// const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.INGREDIENTS));
// document.querySelector('.favorite-list').innerHTML =
//   createFavoriteIngredientsMarkup(data.slice(0, rows));

renderFavoriteIngredients();
