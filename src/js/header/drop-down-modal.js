const dropDownModalBtn = document.querySelector('.modal-nav-favorite');
const dropDownModalEl = document.querySelector('.link-modal-nav-container');
const arrowModalEl = document.querySelector('.arrow-header-modal');

dropDownModalBtn.addEventListener('click', onDropDownModalBtnClick);

function onDropDownModalBtnClick() {
  if (!dropDownModalEl.classList.contains('is-open-drop-down-modal-menu')) {
    dropDownModalEl.classList.add('is-open-drop-down-modal-menu');
    arrowModalEl.classList.add('is-active-arrow');
    return;
  }
  dropDownModalEl.classList.remove('is-open-drop-down-modal-menu');
  arrowModalEl.classList.remove('is-active-arrow');
}
