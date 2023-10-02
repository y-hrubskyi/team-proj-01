export function runModalCloseListeners() {
  document
    .querySelector('.modal-close-btn')
    .addEventListener('click', onCloseModalBtnClick);
  document
    .querySelector('.back-btn-cocktail')
    .addEventListener('click', onCloseModalBtnClick);
  document
    .querySelector('.backdrop')
    .addEventListener('click', onBackdropClick);
  document.addEventListener('keyup', onKeyUp);
}

function onCloseModalBtnClick() {
  removeListeners();
  closeModal();
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    removeListeners();
    closeModal();
  }
}

function onKeyUp(event) {
  if (event.code === 'Escape') {
    removeListeners();
    closeModal();
  }
}

function closeModal() {
  const backdrop = document.querySelector('.backdrop');
  backdrop.innerHTML = '';
  backdrop.classList.remove('backdrop');
  document.body.classList.remove('no-scrolling-body');
}

function removeListeners() {
  document
    .querySelector('.modal-close-btn')
    .removeEventListener('click', onCloseModalBtnClick);
  document
    .querySelector('.backdrop')
    .removeEventListener('click', onBackdropClick);
  document.removeEventListener('keyup', onKeyUp);
}
