import {
  LOCAL_STORAGE_KEYS,
  addToLocalStorage,
  removeFromLocalStorage,
} from './services/local-storage-service';
import { renderModalCocktail, renderModalIngredient } from './render-functions';
import { setupModalCloseListeners } from './modal-close-listeners';
import {
  getCocktailById,
  getIngredientById,
} from './services/drinkify-api-service';

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
  renderFunctionAfterChangeSmth,
  instance
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
      // console.log('Карта в ЛОКАЛСТОРДЖ');

      target.classList.remove('add-to-localstorage-btn');
      target.classList.add('remove-from-localstorage-btn');
      target.textContent = 'remove from favorite';
      target.classList.add('modal-remove-button');
      target.ariaLabel = 'remove from favorite';

      //render favorite list if we are on favorite section
      renderFavoriteListWithOpenModal(
        favorites,
        renderFunctionAfterChangeSmth,
        instance
      );
      //render svg-icon if we are on main section
      document
        .querySelector(`[data-id="${id}"] .svg-icon-heart`)
        ?.classList?.add('is-active');
    } else if (target.closest('.remove-from-localstorage-btn')) {
      const favorites = JSON.parse(localStorage.getItem(key)) || [];

      const index = favorites.findIndex(favCard => favCard._id === id);
      if (index === -1) {
        return;
      }

      favorites.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(favorites));
      // console.log('Карта удалена с ЛОКАЛСТОРДЖ');

      target.classList.remove('remove-from-localstorage-btn');
      target.classList.add('add-to-localstorage-btn');
      target.textContent = 'add to favorite';
      target.classList.remove('modal-remove-button');
      target.ariaLabel = 'add to favorite';

      //render favorite list if we are on favorite section
      renderFavoriteListWithOpenModal(
        favorites,
        renderFunctionAfterChangeSmth,
        instance
      );
      //render svg-icon if we are on main section
      document
        .querySelector(`[data-id="${id}"] .svg-icon-heart`)
        ?.classList?.remove('is-active');
    }
  });
}

function renderFavoriteListWithOpenModal(
  data,
  renderFunctionAfterChangeSmth,
  instance
) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_DATA, JSON.stringify(data));
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

  try {
    //! lib remove
    // console.log('PRODUCTS: ', data);
    // console.log('INSTANCE: ', instance);

    const paginationContainer = document.querySelector(
      '#tui-pagination-container'
    );
    if (data.length <= instance._options.itemsPerPage) {
      paginationContainer.classList.add('is-hidden');
      instance.movePageTo(1);
      favoriteList.innerHTML = renderFunctionAfterChangeSmth(products);
      return;
    }

    const currentPage = instance.getCurrentPage();
    // console.log('currentPage: ', currentPage);
    const itemsPerPage = instance._options.itemsPerPage;
    // console.log('itemsPerPage: ', itemsPerPage);

    instance.setTotalItems(data.length);
    const totalItems = instance._options.totalItems;
    // console.log('totalItems: ', totalItems);

    const startIndex = (currentPage - 1) * itemsPerPage;
    favoriteList.innerHTML = renderFunctionAfterChangeSmth(
      data.slice(startIndex, startIndex + itemsPerPage)
    );

    if (totalItems % itemsPerPage === 0) {
      instance.reset(data.length);

      if (currentPage * itemsPerPage > totalItems) {
        instance.movePageTo(currentPage - 1);
      } else {
        instance.movePageTo(currentPage);
      }
    }

    if (totalItems % itemsPerPage === 1) {
      instance.reset(data.length);
      instance.movePageTo(currentPage);
      paginationContainer.classList.remove('is-hidden');
    }

    //* default
    //* favoriteList.innerHTML = renderFunctionAfterChangeSmth(data);
  } catch (error) {}
}

export async function setupClickHandlerOnOpenModal(
  box,
  renderFunctionAfterChangeSmth,
  instance
) {
  box.addEventListener('click', async function (e) {
    const button = e.target.closest('.learn-more-btn');
    if (!button) {
      return;
    }

    const cocktailId = button.closest('.cocktail-card').dataset.id;
    try {
      const cocktail = await getCocktailById(cocktailId);
      openModal(cocktail, renderFunctionAfterChangeSmth, instance);
    } catch (error) {
      console.log(error);
    }
  });
}

export async function openModal(
  cocktail,
  renderFunctionAfterChangeSmth,
  instance
) {
  renderModalCocktail(...cocktail);
  setupModalCloseListeners();
  setupClickHandlerOnModalOnWorkWithLocaleStorage(
    cocktail,
    LOCAL_STORAGE_KEYS.COCKTAILS,
    renderFunctionAfterChangeSmth,
    instance
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

    setupModalCloseListeners(renderFunctionAfterChangeSmth);
    setupClickHandlerOnModalOnWorkWithLocaleStorage(
      ingredient,
      LOCAL_STORAGE_KEYS.INGREDIENTS
    );
    document.querySelector('.modal-container').dataset.cocktailId =
      cocktail[0]._id;
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.PREV_MODAL_DATA,
      JSON.stringify(cocktail)
    );
  });
}
