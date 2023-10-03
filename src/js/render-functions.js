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
export function createFavoriteCocktailsMarkup(arr, box) {
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
                  <button type="button" class="learn-more-cocktail-btn">Learn More</button>
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

// demo renderFavoriteIngredients
export function renderFavoriteIngredients(arr, box) {
  const markup = arr
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
              <button type="button" class="learn-more-ingredient-btn">learn more</button>
              <button type="button" class="remove-ingredient-btn remove-from-localstorage-btn" aria-label="remove from locale storage">
                <svg width="18px" height="18px" class="icon-trash">
                  <use href="${spriteUrl}#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}

// renderModalCocktail
export function renderModalCocktail(cocktail) {
  const backdrop = prepareForRenderModal();
  const ingredientsList = cocktail.ingredients
    .map(createIngredientItemMarkup)
    .join('');

  const markup = `<div class="modal cocktail-modal" data-id="${cocktail._id}">
                    <button type="button" class="modal-close-btn" aria-label="close modal window">
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
                        class="add-or-remove-btn"
                        type="button"
                        aria-label="add or remove cocktail"
                      >
                        add to favorite
                      </button>

                      <button
                        class="back-modal-close-btn"
                        type="button"
                        aria-label="close modal window"
                      >
                        BACK
                      </button>
                    </div>
                  </div>`;
  backdrop.innerHTML = markup;
}

// renderModalIngredient
export function renderModalIngredient(ingredient) {
  const backdrop = prepareForRenderModal();

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

  const markup = `<div class="modal ingredient-modal" data-id="${
    ingredient._id
  }">
                    <button
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
                        class="add-or-remove-btn"
                        type="button"
                        aria-label="add or remove ingredient"
                      >
                        add to favorite
                      </button>
                      <button
                        class="back-modal-close-btn"
                        type="button"
                        aria-label="close modal window"
                      >
                        BACK
                      </button>
                    </div>
                  </div>`;
  backdrop.innerHTML = markup;
}

// helpers
function prepareForRenderModal() {
  document.body.classList.add('no-scrolling-body');
  const backdrop = document.querySelector('[backdrop-modal]');
  backdrop.classList.add('backdrop');

  return backdrop;
}

function createIngredientItemMarkup(ingredient) {
  return `<li class="per-cocktail-ingredient-item">
            <button type="button" class="per-cocktail-ingredient-btn" data-id="${ingredient.ingredientId}">${ingredient.title}</button>
          </li>`;
}
