import Pagination from 'tui-pagination';
import spriteUrl from '/img/sprite.svg';

export function paginateLibFn(data, itemsPerPage, box, renderFn) {
  const paginationContainer = document.querySelector(
    '#tui-pagination-container'
  );
  if (data.length <= itemsPerPage) {
    paginationContainer.classList.add('is-hidden');
    box.innerHTML = renderFn(data);
    return;
  }

  const visiblePages = window.innerWidth >= 768 ? 7 : 5;

  paginationContainer.classList.remove('is-hidden');
  const options = {
    totalItems: data.length,
    itemsPerPage,
    visiblePages,
    usageStatistics: false,
    template: {
      page: '<button type="button" class="tui-page-btn">{{page}}</button>',
      currentPage:
        '<button class="tui-page-btn tui-is-selected">{{page}}</button>',
      moveButton:
        '<button type="button" class="tui-page-btn tui-{{type}}">' +
        '<svg width="18px" height="18px">' +
        `<use href="${spriteUrl}#icon-arrow"></use>` +
        '</svg >' +
        '</button>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<svg width="18px" height="18px">' +
        `<use href="${spriteUrl}#icon-arrow"></use>` +
        '</svg >' +
        '</span>',
      moreButton:
        '<button type="button" class="tui-page-btn tui-{{type}}-is-ellip">...</button>',
    },
  };

  const instance = new Pagination(paginationContainer, options);
  onPaginationContainerClick(
    instance,
    { page: 1 },
    itemsPerPage,
    box,
    data,
    renderFn
  );

  instance.on('beforeMove', function (eventData) {
    onPaginationContainerClick(
      instance,
      eventData,
      itemsPerPage,
      box,
      data,
      renderFn
    );
  });

  return instance;
}

function onPaginationContainerClick(
  instance,
  eventData,
  itemsPerPage,
  box,
  data,
  renderFn
) {
  const curPage = eventData.page;
  const startIndex = (curPage - 1) * itemsPerPage;
  box.innerHTML = renderFn(data.slice(startIndex, startIndex + itemsPerPage));

  // console.log('PAGINATION ON instance: ', instance);
  // console.log('PAGINATION ON data: ', data);
}
