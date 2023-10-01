import { addToLocalStorage, removeFromLocalStorage } from './local-storage';

export function setupClickHandlerOnAddToLS(data, box) {
  box.addEventListener('click', function (e) {
    const button = e.target.closest('.add-to-localstorage-btn');

    if (button) {
      const cardId = button.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        const svgIcon = button.querySelector('.svg-icon-heart');
        if (svgIcon.classList.contains('active-svg-heart')) {
          removeFromLocalStorage(selectedCard, svgIcon);
        } else {
          addToLocalStorage(selectedCard, svgIcon);
        }
      }
    }
  });
}
