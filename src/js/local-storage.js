export function addToLocalStorage(card, svgIcon) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isInFavorite = favorites.find(favCard => favCard._id === card._id);
  if (isInFavorite) {
    return;
  }

  favorites.push(card);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  svgIcon.classList.add('active-svg-heart');
  console.log('Карта в ЛОКАЛСТОРДЖ');
}

export function removeFromLocalStorage(card, svgIcon) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(favCard => favCard._id === card._id);
  if (index === -1) {
    return;
  }

  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  svgIcon.classList.remove('active-svg-heart');
  console.log('Карта в удалена с ЛОКАЛСТОРДЖ');
}
