import { LOCAL_STORAGE_KEYS } from './services/local-storage-service';
import { openModal } from './setup-handlers';

export function setupModalCloseListeners(renderFunctionAfterChangeSmth) {
  document
    .querySelector('.modal-close-btn')
    .addEventListener('click', onModalCloseBtnClick);
  document
    .querySelector('.back-modal-close-btn')
    .addEventListener('click', event => {
      onBackModalCloseBtnClick(event, renderFunctionAfterChangeSmth);
    });
  document
    .querySelector('.backdrop')
    .addEventListener('click', onBackdropClick);
  document.addEventListener('keyup', onKeyUp);
}

function onModalCloseBtnClick() {
  removeListeners();
  closeModal();
}

async function onBackModalCloseBtnClick(event, renderFunctionAfterChangeSmth) {
  removeListeners();

  if (!event.target.closest('.modal-container').dataset.cocktailId) {
    closeModal();
    return;
  }
  console.log(event.target.closest('.modal-container').dataset.cocktailId);

  try {
    const prevModalData =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.PREV_MODAL_DATA)) ||
      {};
    console.log(prevModalData);
    openModal(prevModalData, renderFunctionAfterChangeSmth);
  } catch (error) {
    console.log(error);
  }
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
  backdrop.querySelector('.modal').innerHTML = '';
  backdrop.classList.remove('backdrop');
  document.body.classList.remove('no-scrolling-body');
}

function removeListeners() {
  document
    .querySelector('.modal-close-btn')
    .removeEventListener('click', onModalCloseBtnClick);
  document
    .querySelector('.back-modal-close-btn')
    .removeEventListener('click', onBackModalCloseBtnClick);
  document
    .querySelector('.backdrop')
    .removeEventListener('click', onBackdropClick);
  document.removeEventListener('keyup', onKeyUp);
}
