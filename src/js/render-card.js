export function renderCard(arr, box) {
  const markup = arr
    .map(
      item =>
        `<div class="cocktail-card">
      <img src="${item.drinkThumb}" alt"${item.drink}" width ="300"/>
          <h2 class="cocktail-title">${item.drink}</h2>
      <p class="cocktail-description">${item.description}</p>
       <div>
       <button type="button" class="card-button" href="#">Learn More</button>
       <button class="card-svg" href="#">SVG</button>
       </div></div>`
    )
    .join('');
  box.insertAdjacentHTML('beforeend', markup);
}
