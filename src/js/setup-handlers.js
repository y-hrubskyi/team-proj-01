import { addToLocalStorage, removeFromLocalStorage } from './local-storage';
import { renderModalCocktail, renderModalIngredient } from './render-functions';
import { setupModalCloseListeners } from './modal-close-listeners';
import { getCocktailById, getIngredientById } from './drinkify-api-service';
import { LOCAL_STORAGE_KEYS } from './constants';

export function setupClickHandlerOnWorkWithLocaleStorage(data, box, key) {
  box.addEventListener('click', function (e) {
    const button = e.target.closest('.add-or-remove-from-ls-btn');

    if (button) {
      const cardId = button.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        const svgIcon = button.querySelector('.svg-icon-heart');
        if (svgIcon.classList.contains('is-active')) {
          removeFromLocalStorage(selectedCard, svgIcon, key);
          button.ariaLabel = 'add to favorite';
        } else {
          addToLocalStorage(selectedCard, svgIcon, key);
          button.ariaLabel = 'remove from favorite';
        }
      }
    }
  });
}

export function setupClickHandlerOnModalOnWorkWithLocaleStorage(
  card,
  key,
  renderFunction
) {
  const modal = document.querySelector('.modal-container');

  modal.addEventListener('click', function (e) {
    const target = e.target;
    const id = modal.dataset.id;
    const favorites = JSON.parse(localStorage.getItem(key)) || [];

    if (target.closest('.add-to-localstorage-btn')) {
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

      //render favorite list if we are on favorite section
      renderFavoriteListWithOpenModal(favorites, renderFunction);
      //render svg-icon if we are on main section
      document
        .querySelector(`[data-id="${id}"] .svg-icon-heart`)
        ?.classList?.add('is-active');
    } else if (target.closest('.remove-from-localstorage-btn')) {
      // console.log('repeated click?');
      const favorites = JSON.parse(localStorage.getItem(key)) || [];

      const index = favorites.findIndex(favCard => favCard._id === id);
      if (index === -1) {
        return;
      }

      favorites.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(favorites));
      console.log('Карта удалена с ЛОКАЛСТОРДЖ');

      target.classList.remove('remove-from-localstorage-btn');
      target.classList.add('add-to-localstorage-btn');
      target.textContent = 'add to favorite';
      target.classList.remove('modal-remove-button');
      target.ariaLabel = 'add to favorite';

      //render favorite list if we are on favorite section
      renderFavoriteListWithOpenModal(favorites, renderFunction);
      //render svg-icon if we are on main section
      document
        .querySelector(`[data-id="${id}"] .svg-icon-heart`)
        ?.classList?.remove('is-active');
    }
  });
}

function renderFavoriteListWithOpenModal(data, renderFunction) {
  const favoriteList = document.querySelector(
    '.favorite-section .favorite-list'
  );
  if (!favoriteList) return;

  const placeholderEmptyFavoriteList = document.querySelector(
    '.placeholder-empty-favorite-list'
  );

  if (!data.length) {
    favoriteList.classList.add('visually-hidden');
    placeholderEmptyFavoriteList.classList.remove('visually-hidden');
    placeholderEmptyFavoriteList
      .closest('.favorite-section')
      .classList.add('is-empty');
    return;
  }

  placeholderEmptyFavoriteList.classList.add('visually-hidden');
  placeholderEmptyFavoriteList
    .closest('.favorite-section')
    .classList.remove('is-empty');

  favoriteList.classList.remove('visually-hidden');
  favoriteList.innerHTML = renderFunction(data);
}

export async function setupClickHandlerOnOpenModal(box, renderFunction) {
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
        LOCAL_STORAGE_KEYS.COCKTAILS,
        renderFunction
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
