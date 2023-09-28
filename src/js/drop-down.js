const dropDownBt = document.querySelector('.header-nav-favorite');
const dropDownEl = document.querySelector('.header-link-nav-container');
const arrowEl = document.querySelector('.arrow-header');

dropDownBt.addEventListener('click', onDropDownButtonClick);

function onDropDownButtonClick() {
  if (dropDownEl.classList.contains('is-open-drop-down-menu') === false) {
    dropDownEl.classList.add('is-open-drop-down-menu');
    arrowEl.classList.add('is-active-arrow');
    return;
  }
  dropDownEl.classList.remove('is-open-drop-down-menu');
  arrowEl.classList.remove('is-active-arrow');
}
