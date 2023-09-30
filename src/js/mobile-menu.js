const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
const bodyEl = document.body;

openMenuBtn.addEventListener('click', onOpenMenuBtnClick);
closeMenuBtn.addEventListener('click', onCloseMenuBtnClick);

function onOpenMenuBtnClick() {
  mobileMenu.classList.add('is-open');
  bodyEl.classList.add('no-scrolling-body');
}

function onCloseMenuBtnClick() {
  mobileMenu.classList.remove('is-open');
  bodyEl.classList.remove('no-scrolling-body');
}
