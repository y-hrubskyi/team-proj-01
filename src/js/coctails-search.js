import axios from 'axios';

import { BASE_URL, LOCAL_STORAGE_KEYS } from './constants';
import { renderCocktails } from './render-functions';
import { getDeviceType } from './random-cocktails';
import { paginateArray } from './pagination';
import {
  setupClickHandlerOnOpenModal,
  setupClickHandlerOnWorkWithLocaleStorage,
} from './setup-handlers';

const randomCocktailsList = document.querySelector('.random-cocktails-list-js');

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
  try {
    const response = await axios.get(requestURL);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function renderSearchResults({ firstLetter, cocktailName } = {}) {
  if (!firstLetter && !cocktailName) return; //add function render card with informaton of no resuts
  const searchResults = await searchCocktailsByFillter({
    firstLetter,
    cocktailName,
  }); //add function render card with informaton of no resuts

  const cocktailsToRender = getDeviceType() === 'desktop' ? 9 : 8;
  randomCocktailsList.innerHTML = '';
  const paginationFn = paginateArray(
    searchResults,
    cocktailsToRender,
    randomCocktailsList
  );

  renderCocktails(paginationFn, randomCocktailsList);

  setupClickHandlerOnWorkWithLocaleStorage(
    searchResults,
    randomCocktailsList,
    LOCAL_STORAGE_KEYS.COCKTAILS
  );
  setupClickHandlerOnOpenModal(randomCocktailsList);
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

const radionbuttonsEL = document.querySelector('.radios');

function onRadioButtonClick(e) {
  const letter = e.target.dataset.id;
  renderSearchResults({ firstLetter: letter });
}

radionbuttonsEL.addEventListener('click', onRadioButtonClick);
