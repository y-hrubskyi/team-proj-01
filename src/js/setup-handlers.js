import { addToLocalStorage, removeFromLocalStorage } from './local-storage';

export function setupClickHandlerOnWorkWithLocaleStorage(data, box, key) {
  box.addEventListener('click', function (e) {
    const button = e.target.closest('.add-to-localstorage-btn');

    if (button) {
      const cardId = button.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        const svgIcon = button.querySelector('.svg-icon-heart');
        if (svgIcon.classList.contains('is-active')) {
          removeFromLocalStorage(selectedCard, svgIcon, key);
        } else {
          addToLocalStorage(selectedCard, svgIcon, key);
        }
      }
    }
  });
}
