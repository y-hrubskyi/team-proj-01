export function renderCard(arr, box) {
  const markup = arr
    .map(
      item =>
        `<li class="cocktail-card" data-id="${item._id}">
      <img class="cocktail-card-img" src="${item.drinkThumb}" alt="${item.drink}" width ="300"/>
          <h3 class="cocktail-title">${item.drink}</h3>
      <p class="cocktail-description">${item.description}</p>
       <div>
        <div class="render-cards-buttons-wrapper">
       <button type="button" class="card-button" href="#">Learn More</button>
       <button class="add-to-localstorage-btn" href="#"><svg width="18px" height="18px" class="svg-icon-heart">
              <use href="./img/sprite.svg#icon-heart"></use>
            </svg></button>
       <button class="remove-from-localstorage-btn" href="#">REMOVE</button>
       </div>
       </div></li>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}
