import { addToLocalStorage, removeFromLocalStorage } from './local-storage';
import { renderModalCocktail, renderModalIngredient } from './render-functions';
import { runModalCloseListeners } from './modal-close-listeners';
import { getCocktailById, getIngredientById } from './drinkify-api-service';

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

export async function setupClickHandlerOnOpenModal(box) {
  box.addEventListener('click', async function (e) {
    const button = e.target.closest('.learn-more-btn');
    if (!button) {
      return;
    }

    const cocktailId = button.closest('.cocktail-card').dataset.id;
    try {
      const cocktail = await getCocktailById(cocktailId);
      renderModalCocktail(...cocktail);
      runModalCloseListeners();

      const ingredientsList = document.querySelector(
        '.per-cocktail-ingredients-list'
      );
      ingredientsList.addEventListener('click', async function (e) {
        const button = e.target.closest('.per-cocktail-ingredient-btn');
        if (!button) {
          return;
        }
        const ingredientId = button.dataset.id;
        const ingredient = await getIngredientById(ingredientId);
        renderModalIngredient(...ingredient);
        runModalCloseListeners();
      });
    } catch (error) {
      console.log(error);
    }
  });
}
