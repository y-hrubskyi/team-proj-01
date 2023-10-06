const paginationList = document.getElementById('pagination-list');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');
const isActivePagination = document.querySelector('.pagination-container');
let widthContainer = window.innerWidth;

console.log(widthContainer);
export function paginateArray(arrDatas, rowPerPage, box, renderFn) {
  let current_page = 1;
  if (arrDatas.length <= rowPerPage) {
    current_page = 1;
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
      }
    }

    if (paginatedPages > 7) {
      const dotsPagination = `<li><button type="button" class="button-list-pagination">...</button></li>`;
      if (widthContainer > 768) {
        if (current_page <= 4) {
          markup = markup.slice(0, 3).concat(dotsPagination, markup.slice(-1));
        } else if (current_page >= paginatedPages - 3) {
          markup = markup.slice(0, 3).concat(dotsPagination, markup.slice(-1));
        } else {
          markup = markup.slice(0, 3).concat(dotsPagination, markup.slice(-1));
        }
        return;
      } else {
        if (current_page <= 4) {
          markup = markup.slice(0, 3).concat(dotsPagination, markup.slice(-1));
        } else if (current_page >= paginatedPages - 3) {
          markup = markup.slice(0, 3).concat(dotsPagination, markup.slice(-3));
        } else {
          markup = markup
            .slice(0, 1)
            .concat(
              markup.slice(current_page - 2, current_page),
              dotsPagination,
              markup.slice(-1)
            );
        }
      }
    }

    paginationList.innerHTML = markup.join('');
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
      paginationList.innerHTML = markup.join('');
      return;
    } else {
      current_page -= 1;
    }

    box.innerHTML = '';
    const paginatedData = displayList(arrDatas, rowPerPage, current_page);
    box.innerHTML = renderFn(paginatedData);
    createButton(pageVal);
  }
  function onRightButtonClick() {
    if (current_page === pageVal) {
      paginationList.innerHTML = markup.join('');
      return;
    } else {
      current_page += 1;
    }

    box.innerHTML = '';
    const paginatedData = displayList(arrDatas, rowPerPage, current_page);
    box.innerHTML = renderFn(paginatedData);
    createButton(pageVal);
  }

  const paginatedData = displayList(arrDatas, rowPerPage, current_page);

  createButton(pageVal);
  return paginatedData;
}
