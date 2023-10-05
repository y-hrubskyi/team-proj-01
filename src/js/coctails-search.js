import axios from 'axios';
import spriteUrl from '/img/sprite.svg';

import { LOCAL_STORAGE_KEYS } from './constants';
import { createCocktailsMarkup } from './render-functions';
import { getDeviceType } from './random-cocktails';
import { paginateArray } from './pagination';
import {
  setupClickHandlerOnOpenModal,
  setupClickHandlerOnWorkWithLocaleStorage,
} from './setup-handlers';
import { sortByRating } from './sort-by-rating';
import { searchCocktailsByFillter } from './drinkify-api-service';

export async function renderSearchResults({ firstLetter, cocktailName } = {}) {
  try {
    const searchResults = await searchCocktailsByFillter({
      firstLetter,
      cocktailName,
    }); //add function render card with informaton of no resuts

    const cocktailsToRender = getDeviceType() === 'desktop' ? 9 : 8;
    renderResultInfo();
    const searchCocktailsList = document.querySelector(
      '.random-cocktails-list-js'
    );
    newTextAfterSearch();
    const paginationFn = paginateArray(
      searchResults,
      cocktailsToRender,
      searchCocktailsList,
      createCocktailsMarkup
    );

    searchCocktailsList.innerHTML = createCocktailsMarkup(paginationFn);
    sortByRating(searchCocktailsList);
    setupClickHandlerOnWorkWithLocaleStorage(
      searchResults,
      searchCocktailsList,
      LOCAL_STORAGE_KEYS.COCKTAILS
    );
    setupClickHandlerOnOpenModal(searchCocktailsList);
  } catch {
    const paginationList = document.getElementById('pagination-list');
    const isActivePagination = document.querySelector('.pagination-container');
    paginationList.innerHTML = '';
    isActivePagination.classList.add('is-active-pagination');

    renderNoResultInfo();
  }
}

// search by input //

const formEL = document.querySelector('.search-form');
formEL.addEventListener('submit', onSearchSubmit);

function onSearchSubmit(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.search.value.trim();
  renderSearchResults({ cocktailName: searchQuery });
}

// search by leters

const radiosLetersEL = document.querySelector('[data-action="keyboard"]');
radiosLetersEL.addEventListener('click', onLetterClick);

function onLetterClick(e) {
  if (!e.target.classList.contains('keyboard-btn')) {
    return;
  }

  const letter = e.target.textContent;
  renderSearchResults({ firstLetter: letter });
}

const radionbuttonsEL = document.querySelector('.custom-select');
radionbuttonsEL.addEventListener('click', onRadioButtonClick);

function onRadioButtonClick(e) {
  const letter = e.target.dataset.id;
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

// change coctails to Searching results

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
