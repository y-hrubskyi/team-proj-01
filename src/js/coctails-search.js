import axios from 'axios';
import spriteUrl from '/img/sprite.svg';

import { BASE_URL, LOCAL_STORAGE_KEYS } from './constants';
import { createCocktailsMarkup } from './render-functions';
import { getDeviceType } from './random-cocktails';
import { paginateArray } from './pagination';
import {
  setupClickHandlerOnOpenModal,
  setupClickHandlerOnWorkWithLocaleStorage,
} from './setup-handlers';

const randomCocktailsList = document.querySelector('.random-cocktails-list-js');
const isActivePagination = document.querySelector('.pagination-container');

export async function searchCocktailsByFillter({
  firstLetter,
  cocktailName,
} = {}) {
  const requestURL = new URL(`${BASE_URL}/cocktails/search/`);
  if (firstLetter) {
    requestURL.searchParams.append(`f`, firstLetter);
  }
  if (cocktailName) {
    requestURL.searchParams.append(`s`, cocktailName);
  }

  const response = await axios.get(requestURL);
  return response.data;
}

export async function renderSearchResults({ firstLetter, cocktailName } = {}) {
  try {
    const searchResults = await searchCocktailsByFillter({
      firstLetter,
      cocktailName,
    }); //add function render card with informaton of no resuts

    const cocktailsToRender = getDeviceType() === 'desktop' ? 9 : 8;
    renderResultInfo();
    const randomCocktailsList = document.querySelector(
      '.random-cocktails-list-js'
    );
    newTextAfterSearch();
    const paginationFn = paginateArray(
      searchResults,
      cocktailsToRender,
      randomCocktailsList,
      createCocktailsMarkup
    );

    randomCocktailsList.innerHTML = createCocktailsMarkup(paginationFn);
    setupClickHandlerOnWorkWithLocaleStorage(
      searchResults,
      randomCocktailsList,
      LOCAL_STORAGE_KEYS.COCKTAILS
    );
    setupClickHandlerOnOpenModal(randomCocktailsList);
  } catch {
    renderNoResultInfo();
    isActivePagination.classList.add('is-active-pagination');
  }
}

// renderSearchResults();
// search input //

const formEL = document.querySelector('.header__form');
const inputEL = document.querySelector('.form__input');

function onSearchSubmit(e) {
  e.preventDefault();
  const searchQuery = inputEL.value.trim();
  renderSearchResults({ cocktailName: searchQuery });
}

formEL.addEventListener('submit', onSearchSubmit);

// search by leters

const radiosLetersEL = document.querySelector('[data-action="keyboard"]');

function onLetterClick(e) {
  const letter = e.target.textContent;
  renderSearchResults({ firstLetter: letter });
}

radiosLetersEL.addEventListener('click', onLetterClick);

const radionbuttonsEL = document.querySelector('.custom-select');

function onRadioButtonClick(e) {
  console.log(e.target);
  const letter = e.target.dataset.id;
  renderSearchResults({ firstLetter: letter });
}

radionbuttonsEL.addEventListener('click', onRadioButtonClick);

// no result image

function renderNoResultInfo() {
  const noResultsContainerEl = document.querySelector('.cocktails-section');

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

// change coctails to Searching results

function newTextAfterSearch() {
  const titleCocktailel = document.querySelector('.section-title');
  titleCocktailel.textContent = 'Searching results';
}

function renderResultInfo() {
  const resultsContainerEl = document.querySelector('.cocktails-section ');

  resultsContainerEl.innerHTML = `<div class="container">
    <h2 class="section-title">Cocktails</h2>
    <ul
      class="cocktails-list random-cocktails-list random-cocktails-list-js"
    ></ul>
  </div>`;
}
