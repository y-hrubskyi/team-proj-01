export function setupClickHandlers(data, box) {
  box.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-svg')) {
      const cardId = e.target.closest('.cocktail-card').dataset.id;
      const selectedCard = data.find(item => item._id === cardId);
      if (selectedCard) {
        addToLocalStorage(selectedCard);
      }
    }
  });
}

function addToLocalStorage(card) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.push(card);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  console.log('Карта в ЛОКАЛСТОРДЖ');
}
