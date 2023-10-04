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
  }

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

  let markup = [];

  function createButton(paginatedPages) {
    markup = [];
    paginationList.innerHTML = '';
    if (arrDatas.length <= 9) {
      paginationList.innerHTML = markup.join('');
      return;
    } else {
      for (let i = 0; i < paginatedPages; i++) {
        if (current_page === i + 1) {
          const cart = `<li><button type="button" class="button-list-pagination active" name="${
            i + 1
          }">${i + 1}</button></li>`;
          markup.push(cart);
        } else {
          const cart = `<li><button type="button" class="button-list-pagination" name="${
            i + 1
          }">${i + 1}</button></li>`;
          markup.push(cart);
          console.log(markup);
        }
      }

      if (markup.length < 8) {
        paginationList.innerHTML = markup.join('');
        return;
      }

      // let start = 0;
      // let startEnd = 3;
      // let end = markup.length;
      // let endStart = end - 3;

      // console.log(start);
      // console.log(startEnd);
      // const markupStart = markup.slice(start, startEnd);
      // const markupEnd = markup.slice(endStart, end);

      // markupPagination.push(markupStart.join(''), markupEnd.join(''));

      const dotsPagination = `<li><button type="button" class="button-list-pagination ">...</button></li>`;

      markup.splice(3, 0, dotsPagination);

      paginationList.innerHTML = markup.join('');
    }
  }

  paginationList.addEventListener('click', onButtonClick);
  function onButtonClick(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }
    current_page = parseInt(e.target.name);
    createButton(pageVal);
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
      paginationList.innerHTML = '';
      box.innerHTML = '';
      current_page -= 1;

      createButton(pageVal);
      const paginatedData = displayList(arrDatas, rowPerPage, current_page);
      box.innerHTML = renderFn(paginatedData);
    }
  }
  function onRightButtonClick() {
    if (current_page === pageVal) {
      return;
    } else {
      paginationList.innerHTML = '';
      box.innerHTML = '';
      current_page += 1;

      createButton(pageVal);
      const paginatedData = displayList(arrDatas, rowPerPage, current_page);
      box.innerHTML = renderFn(paginatedData);
    }
  }

  const paginatedData = displayList(arrDatas, rowPerPage, current_page);

  createButton(pageVal);
  return paginatedData;
}
