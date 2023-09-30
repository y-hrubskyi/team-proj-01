const dropDownBtn = document.querySelector('.header-nav-favorite');
const dropDownEl = document.querySelector('.header-link-nav-container');
const arrowEl = document.querySelector('.arrow-header');

dropDownBtn.addEventListener('click', onDropDownBtnClick);

function onDropDownBtnClick() {
  if (!dropDownEl.classList.contains('is-open-drop-down-menu')) {
    dropDownEl.classList.add('is-open-drop-down-menu');
    // dropDownEl.classList.remove('visually-hidden');
    arrowEl.classList.add('is-active-arrow');
    return;
  }
  dropDownEl.classList.remove('is-open-drop-down-menu');
  // dropDownEl.classList.add('visually-hidden');
  arrowEl.classList.remove('is-active-arrow');
}
