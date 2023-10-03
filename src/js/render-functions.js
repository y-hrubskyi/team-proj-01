import { LOCAL_STORAGE_KEYS } from './constants';
import { isInLocaleStorage } from './local-storage';
import spriteUrl from '/img/sprite.svg';

// renderCocktails
export function renderCocktails(arr, box) {
  const markup = arr
    .map(
      item =>
        `<li class="cocktail-card" data-id="${item._id}">
            <img class="cocktail-card-img" src="${item.drinkThumb}" alt="${item.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${item.drink}</h3>
              <p class="cocktail-description">${item.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn learn-more-btn" data-modal-open>Learn More</button>
                  <button type="button" class="add-to-localstorage-btn">
                    <svg width="18px" height="18px" class="svg-icon-heart">
                      <use href="${spriteUrl}#icon-heart"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}

// demo createFavoriteCocktailsMarkup
export function createFavoriteCocktailsMarkup(arr) {
  return arr
    .map(
      item =>
        `<li class="cocktail-card" data-id="${item._id}">
            <img class="cocktail-card-img" src="${item.drinkThumb}" alt="${item.drink}" width="307" height="257"/>
            <div class="cocktail-info">
              <h3 class="cocktail-title">${item.drink}</h3>
              <p class="cocktail-description">${item.description}</p>
              <div>
                <div class="cocktail-card-btns-wrapper">
                  <button type="button" class="learn-more-cocktail-btn learn-more-btn">Learn More</button>
                  <button type="button" class="add-to-localstorage-btn remove-from-localstorage-btn">
                    <svg width="18px" height="18px" class="icon-trash">
                      <use href="${spriteUrl}#icon-trash"></use>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </li>`
    )
    .join('');
}

// demo createFavoriteIngredientsMarkup
export function createFavoriteIngredientsMarkup(arr) {
  return arr
    .map(
      item =>
        `<li class="favorite-ingredient-item" data-id="${item._id}">
            <h3 class="fav-ingredient-title">${item.title}</h3>
            <h4 class="is-alcoholic-drink-title">${
              item.alcolol === 'Yes' ? 'Alcoholic' : 'Non-Alcoholic'
            }</h4>
            <p class="fav-ingredient-description">
              ${item.description}
            </p>
            <div class="ingredient-card-btns">
              <button type="button" class="learn-more-ingredient-btn learn-more-btn">learn more</button>
              <button type="button" class="remove-ingredient-btn remove-from-localstorage-btn" aria-label="remove from locale storage">
                <svg width="18px" height="18px" class="icon-trash">
                  <use href="${spriteUrl}#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>`
    )
    .join('');
}

// renderModalCocktail
export function renderModalCocktail(cocktail) {
  const backdrop = prepareForRenderModal();
  const params = setupParamsForRender(cocktail, LOCAL_STORAGE_KEYS.COCKTAILS);

  const ingredientsList = cocktail.ingredients
    .map(createIngredientItemMarkup)
    .join('');

  const modal = backdrop.querySelector('.modal');
  modal.dataset.id = cocktail._id;

  const markup = `<button type="button" class="modal-close-btn" aria-label="close modal window">
                    <svg class="modal-close-icon">
                      <use href="${spriteUrl}#icon-close-modal"></use>
                    </svg>
                  </button>
                  <div class="cocktail-about-wrapper">
                    <img
                      class="cocktail-img"
                      src="${cocktail.drinkThumb}"
                      alt="${cocktail.drink}"
                      width="295"
                      height="277"
                    />
                    <div class="cocktail-ingredients-container">
                      <h3 class="cocktail-title">${cocktail.drink}</h3>
                      <h4 class="cocktail-ingredients-title">Ingredients:</h4>
                      <h5 class="cocktail-per-cocktail">Per cocktail</h5>
                      <ul class="per-cocktail-ingredients-list">
                        ${ingredientsList}
                      </ul>
                    </div>
                  </div>
                  <div class="cocktail-instruction-wrapper">
                    <h4 class="cocktail-instruction-title">Instructions:</h4>
                    <p class="cocktail-instruction">
                      ${cocktail.instructions}
                    </p>
                  </div>
                  <div class="modal-btns">
                    <button
                      class="add-or-remove-btn ${params.actionClass} ${params.styleClass}"
                      type="button"
                      aria-label="${params.ariaLabel}"
                    >
                      ${params.textContent}
                    </button>
                    <button
                      class="back-modal-close-btn"
                      type="button"
                      aria-label="close modal window"
                    >
                      BACK
                    </button>
                  </div>`;
  modal.innerHTML = markup;
}

// renderModalIngredient
export function renderModalIngredient(ingredient) {
  const backdrop = prepareForRenderModal();
  const params = setupParamsForRender(
    ingredient,
    LOCAL_STORAGE_KEYS.INGREDIENTS
  );

  const emptyField = 'not specified';

  let description = '';
  if (ingredient.description) {
    const titleLength = ingredient.title.split(' ').length;
    description = ingredient.description
      .split(' ')
      .slice(titleLength)
      .join(' ');
  }

  let flavour = '';
  if (ingredient.flavour) {
    flavour = ingredient.flavour.split('');
    flavour[0] = flavour[0].toUpperCase();
    flavour = flavour.join('');
  }

  const modal = backdrop.querySelector('.modal');
  modal.dataset.id = ingredient._id;

  const markup = `<button
                    type="button"
                    class="modal-close-btn"
                    aria-label="close modal window"
                  >
                    <svg class="modal-close-icon">
                      <use href="${spriteUrl}#icon-close-modal"></use>
                    </svg>
                  </button>
                  <h2 class="ingredient-title">${ingredient.title}</h2>
                  <h3 class="ingredient-type">${ingredient.type}</h3>
                  <p class="ingredient-description">
                    <span class="ingredient-description-name">${
                      ingredient.title
                    }</span> ${description || emptyField}
                  </p>
                  <ul class="ingredient-properties-list">
                    <li class="ingredient-properties-item">Type: ${
                      ingredient.type || emptyField
                    }</li>
                    <li class="ingredient-properties-item">Country of origin: ${
                      ingredient.country || emptyField
                    }</li>
                    <li class="ingredient-properties-item">
                      Alcohol by volume: ${ingredient.abv || emptyField}
                    </li>
                    <li class="ingredient-properties-item">
                      Flavour: ${flavour || emptyField}
                    </li>
                  </ul>
                  <div class="modal-btns">
                    <button
                      class="add-or-remove-btn ${params.actionClass} ${
    params.styleClass
  }
                      type="button"
                      aria-label="${params.ariaLabel}"
                    >
                      ${params.textContent}
                    </button>
                    <button
                      class="back-modal-close-btn"
                      type="button"
                      aria-label="close modal window"
                    >
                      BACK
                    </button>
                  </div>`;
  modal.innerHTML = markup;
}

// helpers
function prepareForRenderModal() {
  document.body.classList.add('no-scrolling-body');
  const backdrop = document.querySelector('[backdrop-modal]');
  backdrop.classList.add('backdrop');

  return backdrop;
}

export function setupParamsForRender(obj, key) {
  const isAlreadyInLocaleStorage = isInLocaleStorage(obj, key);
  const params = {};

  if (isAlreadyInLocaleStorage) {
    params.actionClass = 'remove-from-localstorage-btn';
    params.textContent = 'remove from favorite';
    params.styleClass = 'modal-remove-button';
    params.ariaLabel = 'remove from favorite';
    console.log('is in locale storage');
  } else {
    params.actionClass = 'add-to-localstorage-btn';
    params.textContent = 'add to favorite';
    params.styleClass = '';
    params.ariaLabel = 'add to favorite';
    console.log(`isn't in locale storage`);
  }
  console.log('PARAMS: ', params);

  return params;
}

function createIngredientItemMarkup(ingredient) {
  return `<li class="per-cocktail-ingredient-item">
            <button type="button" class="per-cocktail-ingredient-btn" data-id="${ingredient.ingredientId}">${ingredient.title}</button>
          </li>`;
}
