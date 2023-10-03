import { off } from 'process';
import { renderCocktails } from './render-functions';

const plaginationList = document.getElementById('plagination-list');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
let current_page = 1;
export function paginateArray(arrDatas, rowPerPage) {
  function displayList(arrDatas, rowPerPage, page) {
    page--;
    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = [];
    for (let i = start; i < end && i < arrDatas.length; i++) {
      paginatedData.push(arrDatas[i]);
    }
    return paginatedData;
  }

  let marcap = [];
  function createButton(paginatedPages) {
    for (let i = 0; i < paginatedPages; i++) {
      const cart = `<li><button type="button" class="button-list-pagination" name="${
        i + 1
      }">${i + 1}</button></li>`;
      marcap.push(cart);
    }
    console.log(marcap.join(''));
    plaginationList.innerHTML = marcap.join('');
  }

  plaginationList.addEventListener('click', onButtonClick);
  leftButton.addEventListener('click', onBackButtonClick);
  function onButtonClick(e) {
    const randomCocktailsList = document.querySelector(
      '.random-cocktails-list-js'
    );
    randomCocktailsList.innerHTML = '';
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    current_page = parseInt(e.target.name);
    const paginatedData = displayList(arrDatas, rowPerPage, current_page);
    renderCocktails(paginatedData, randomCocktailsList);
    current_page = 1;
  }

  const pageVal = Math.ceil(arrDatas.length / rowPerPage);
  const paginatedData = displayList(arrDatas, rowPerPage, current_page);

  createButton(pageVal);
  return paginatedData;
}
