import { createCocktailsMarkup } from './render-functions';

const paginationList = document.getElementById('pagination-list');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const isActivePagination = document.querySelector('.pagination-container');

let current_page = 1;

export function paginateArray(arrDatas, rowPerPage, box, renderFn) {
  if (arrDatas.length <= rowPerPage) {
    isActivePagination.classList.add('is-active-pagination');
    paginationList.innerHTML = '';
    box.innerHTML = '';
    return arrDatas;
  } else {
    isActivePagination.classList.remove('is-active-pagination');

    const pageVal = Math.ceil(arrDatas.length / rowPerPage);

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
    let marcapPagination = [];
    function createButton(paginatedPages) {
      for (let i = 0; i < paginatedPages; i++) {
        const cart = `<li><button type="button" class="button-list-pagination" name="${
          i + 1
        }">${i + 1}</button></li>`;
        marcap.push(cart);
      }

      if (marcap.length < 7) {
        paginationList.innerHTML = marcap.join('');
        return;
      }

      let start = 0;
      let startEnd = 3;
      let end = marcap.length;
      let endStart = end - 3;

      console.log(start);
      console.log(startEnd);
      const marcapStart = marcap.slice(start, startEnd);
      const marcapEnd = marcap.slice(endStart, end);

      marcapPagination.push(marcapStart.join(''), marcapEnd.join(''));

      paginationList.innerHTML = marcapPagination.join('');
    }

    paginationList.addEventListener('click', onButtonClick);
    function onButtonClick(e) {
      box.innerHTML = '';
      if (e.target.tagName !== 'BUTTON') {
        return;
      }
      current_page = parseInt(e.target.name);
      const paginatedData = displayList(arrDatas, rowPerPage, current_page);
      box.innerHTML = renderFn(paginatedData);
      current_page = 1;
    }

    leftButton.addEventListener('click', onLeftButtonClick);
    rightButton.addEventListener('click', onRightButtonClick);
    function onLeftButtonClick() {
      if (current_page === 1) {
        return;
      } else {
        box.innerHTML = '';
        current_page -= 1;

        const paginatedData = displayList(arrDatas, rowPerPage, current_page);
        box.innerHTML = renderFn(paginatedData);
      }
    }
    function onRightButtonClick() {
      if (current_page === pageVal) {
        return;
      } else {
        box.innerHTML = '';
        current_page += 1;

        const paginatedData = displayList(arrDatas, rowPerPage, current_page);
        box.innerHTML = renderFn(paginatedData);
      }
    }

    const paginatedData = displayList(arrDatas, rowPerPage, current_page);

    createButton(pageVal);
    return paginatedData;
  }
}
