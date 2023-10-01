import { addToLocalStorage, removeFromLocalStorage } from './local-storage';

export function setupClickHandlerOnAddToLS(data, box) {
  box.addEventListener('click', function (e) {
    const button = e.target.closest('.add-to-localstorage-btn');
    if (button) {
      const cardId = button.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        addToLocalStorage(selectedCard);
      }
    }
  });
}

export function setupClickHandlerOnRemoveFromLS(data, box) {
  box.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-from-localstorage-btn')) {
      const cardId = e.target.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        removeFromLocalStorage(selectedCard);
      }
    }
  });
}
