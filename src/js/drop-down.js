const dropDownBtn = document.querySelector('.header-nav-favorite');
const dropDownEl = document.querySelector('.header-link-nav-container');
const arrowEl = document.querySelector('.arrow-header');

dropDownBtn.addEventListener('click', onDropDownBtnClick);
document.body.addEventListener('click', onBodyClick);

function onDropDownBtnClick() {
  if (!dropDownEl.classList.contains('is-open-drop-down-menu')) {
    dropDownEl.classList.add('is-open-drop-down-menu');
    arrowEl.classList.add('is-active-arrow');
    return;
  }
  dropDownEl.classList.remove('is-open-drop-down-menu');
  arrowEl.classList.remove('is-active-arrow');
}

function onBodyClick(e) {
  if (
    e.target !== dropDownEl &&
    e.target !== dropDownBtn &&
    e.target !== arrowEl
  ) {
    dropDownEl.classList.remove('is-open-drop-down-menu');
    arrowEl.classList.remove('is-active-arrow');
  }
}
