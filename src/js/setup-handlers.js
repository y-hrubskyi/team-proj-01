import { addToLocalStorage, removeFromLocalStorage } from './local-storage';
import { renderModalCocktail, renderModalIngredient } from './render-functions';
import { setupModalCloseListeners } from './modal-close-listeners';
import { getCocktailById, getIngredientById } from './drinkify-api-service';
import { LOCAL_STORAGE_KEYS } from './constants';

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

export function setupClickHandlerOnModalOnWorkWithLocaleStorage(card, key) {
  const modal = document.querySelector('.modal-container');

  modal.addEventListener('click', function (e) {
    const target = e.target;
    const id = modal.dataset.id;

    console.log(target, id);

    if (target.closest('.add-to-localstorage-btn')) {
      const favorites = JSON.parse(localStorage.getItem(key)) || [];
      const isInFavorite = favorites.find(favCard => favCard._id === id);
      if (isInFavorite) {
        return;
      }

      favorites.push(...card);
      localStorage.setItem(key, JSON.stringify(favorites));
      console.log('Карта в ЛОКАЛСТОРДЖ');

      target.classList.remove('add-to-localstorage-btn');
      target.classList.add('remove-from-localstorage-btn');
      target.textContent = 'remove from favorite';
      target.classList.add('modal-remove-button');
      target.ariaLabel = 'remove from favorite';
    } else if (target.closest('.remove-from-localstorage-btn')) {
      console.log('repeated click?');
      const favorites = JSON.parse(localStorage.getItem(key)) || [];

      const index = favorites.findIndex(favCard => favCard._id === id);
      if (index === -1) {
        return;
      }

      favorites.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(favorites));
      console.log('Карта в удалена с ЛОКАЛСТОРДЖ');

      target.classList.remove('remove-from-localstorage-btn');
      target.classList.add('add-to-localstorage-btn');
      target.textContent = 'add to favorite';
      target.classList.remove('modal-remove-button');
      target.ariaLabel = 'add to favorite';
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
      setupModalCloseListeners();
      setupClickHandlerOnModalOnWorkWithLocaleStorage(
        cocktail,
        LOCAL_STORAGE_KEYS.COCKTAILS
      );

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
        setupModalCloseListeners();
        setupClickHandlerOnModalOnWorkWithLocaleStorage(
          ingredient,
          LOCAL_STORAGE_KEYS.INGREDIENTS
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
}
