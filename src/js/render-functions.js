// demo renderCocktails
export function renderCocktails(arr, box) {
  const markup = arr
    .map(
      item =>
        `<li class="cocktail-card" data-id="${item._id}">
            <img src="${item.drinkThumb}" alt"${item.drink}" width ="300"/>
            <h3 class="cocktail-title">${item.drink}</h3>
            <p class="cocktail-description">${item.description}</p>
            <div>
              <button type="button" class="card-button">Learn More</button>
              <button type="button" class="add-to-localstorage-btn">ADD</button>
              <button type="button" class="remove-from-localstorage-btn">REMOVE</button>
            </div>
          </li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}

// demo renderFavoriteCocktails
export function renderFavoriteCocktails(arr, box) {
  const markup = arr
    .map(
      item =>
        `<li class="cocktail-card" data-id="${item._id}">
            <img src="${item.drinkThumb}" alt"${item.drink}" width ="300"/>
            <h3 class="cocktail-title">${item.drink}</h3>
            <p class="cocktail-description">${item.description}</p>
            <div>
              <button type="button" class="card-button">Learn More</button>
              <button type="button" class="remove-from-localstorage-btn" aria-label="remove from local storage">
                <svg width="18px" height="18px" class="icon-trash">
                  <use href="./img/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}

// demo renderFavoriteIngredients
export function renderFavoriteIngredients(arr, box) {
  const markup = arr
    .map(
      item =>
        `<li class="favorite-ingredient-item" data-id="${item._id}>
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
              <use href="./img/sprite.svg#icon-trash"></use>
            </svg>
          </button>
        </div>
      </li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}

// renderModalCocktail

// renderModalIngredient
