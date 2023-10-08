import SlimSelect from 'slim-select';
import spriteUrl from '/img/sprite.svg';

import { searchCocktailsByFillter } from './services/drinkify-api-service';
import { LOCAL_STORAGE_KEYS } from './services/local-storage-service';
import { createCocktailsMarkup } from './render-functions';
import { getDeviceType } from './random-cocktails';
//? import { paginateArray } from './pagination';
import {
  setupClickHandlerOnOpenModal,
  setupClickHandlerOnWorkWithLocaleStorage,
} from './setup-handlers';
import { sortByRating } from './features/sort-by-rating';
import { paginateLibFn } from './tui-lib-pagination';

const keysList = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
];

export async function renderSearchResults({ firstLetter, cocktailName } = {}) {
  try {
    const searchResults = await searchCocktailsByFillter({
      firstLetter,
      cocktailName,
    });
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CURRENT_DATA,
      JSON.stringify(searchResults)
    );

    //* default
    //* const cocktailsToRender =
    //*   getDeviceType() === 'desktop'
    //*     ? searchResults.slice(0, 9)
    //*     : searchResults.slice(0, 8);

    //? manual
    //? const cocktailsToRender = getDeviceType() === 'desktop' ? 9 : 8;

    //! lib
    const itemsPerPage = getDeviceType() === 'desktop' ? 9 : 8;

    renderResultInfo();
    const searchCocktailsList = document.querySelector('.cocktails-list');
    newTextAfterSearch();

    //? manual
    //? const paginationFn = paginateArray(
    //?   searchResults,
    //?   cocktailsToRender,
    //?   searchCocktailsList,
    //?   createCocktailsMarkup
    //? );

    //! lib

    paginateLibFn(itemsPerPage, searchCocktailsList, createCocktailsMarkup);

    //* default
    //* searchCocktailsList.innerHTML = createCocktailsMarkup(cocktailsToRender);

    //? manual
    //? searchCocktailsList.innerHTML = createCocktailsMarkup(paginationFn);

    sortByRating(searchCocktailsList);
    setupClickHandlerOnWorkWithLocaleStorage(
      searchResults,
      searchCocktailsList,
      LOCAL_STORAGE_KEYS.COCKTAILS
    );
    setupClickHandlerOnOpenModal(searchCocktailsList);
  } catch {
    //? manual
    //? const paginationList = document.getElementById('pagination-list');
    //? const isActivePagination = document.querySelector('.pagination-container');
    //? paginationList.innerHTML = '';
    //? isActivePagination.classList.add('is-active-pagination');

    //! lib
    document
      .querySelector('#tui-pagination-container')
      .classList.add('is-hidden');

    renderNoResultInfo();
  }
}

// search by input //
function onSearchSubmit(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.search.value.trim();
  renderSearchResults({ cocktailName: searchQuery });
}

// search by letters
function onKeyboardLettersElClick(e) {
  if (!e.target.classList.contains('keyboard-btn')) {
    return;
  }

  const letter = e.target.textContent;
  renderSearchResults({ firstLetter: letter });
}

function onSelectLettersElChange(e) {
  const letter = e.target.value;
  renderSearchResults({ firstLetter: letter });
}

// no result image
function renderNoResultInfo() {
  const noResultsContainerEl = document.querySelector(
    '.cocktails-section .container'
  );

  noResultsContainerEl.innerHTML = `<div class="placeholder-empty-favorite-list">
    <svg class="empty-favorite-img">
      <use href="${spriteUrl}#icon-placeholder-empty-list"></use>
    </svg>
    <p class="empty-favorite-text">
      Sorry, we
      <span class="empty-favorite-text-span">didn’t find</span>
      any cocktail for you
    </p>
  </div>`;
}

// change cocktails to Searching results
function newTextAfterSearch() {
  const titleCocktailel = document.querySelector('.section-title');
  titleCocktailel.textContent = 'Searching results';
}

function renderResultInfo() {
  const resultsContainerEl = document.querySelector(
    '.cocktails-section .container'
  );

  resultsContainerEl.innerHTML = `
    <h2 class="section-title">Cocktails</h2>
    <button type="button" class="sort-by-rating hidden">best rating</button>
    <ul
      class="cocktails-list random-cocktails-list random-cocktails-list-js"
    ></ul>`;
}

// helpers
function createSelectLettersMarkup(arr) {
  return arr
    .map(key => `<option class="key-option" value="${key}">${key}</option>`)
    .join('');
}

function createKeybordLettersMarkup(arr) {
  return arr
    .map(
      key => `<li class="keyboard-item">
                <button class="keyboard-btn" type="button">${key}</button>
              </li>`
    )
    .join('');
}

// keyboard (tablet +)
const keyboardLettersEl = document.querySelector('[data-action="keyboard"]');
keyboardLettersEl.innerHTML = createKeybordLettersMarkup(keysList);
keyboardLettersEl.addEventListener('click', onKeyboardLettersElClick);

// select (mobile)
const selectLettersEl = document.querySelector('.select-letters');
selectLettersEl.innerHTML = createSelectLettersMarkup(keysList);
new SlimSelect({ select: selectLettersEl, settings: { showSearch: false } });
selectLettersEl.addEventListener('change', onSelectLettersElChange);

// form
const formEL = document.querySelector('.search-form');
formEL.addEventListener('submit', onSearchSubmit);
