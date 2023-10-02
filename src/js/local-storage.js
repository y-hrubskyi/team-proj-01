export function addToLocalStorage(card, svgIcon, key) {
  const favorites = JSON.parse(localStorage.getItem(key)) || [];
  const isInFavorite = favorites.find(favCard => favCard._id === card._id);
  if (isInFavorite) {
    return;
  }

  favorites.push(card);
  localStorage.setItem(key, JSON.stringify(favorites));
  svgIcon.classList.add('is-active');
  console.log('Карта в ЛОКАЛСТОРДЖ');
}

export function removeFromLocalStorage(card, svgIcon, key) {
  const favorites = JSON.parse(localStorage.getItem(key)) || [];
  const index = favorites.findIndex(favCard => favCard._id === card._id);
  if (index === -1) {
    return;
  }

  favorites.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(favorites));
  svgIcon.classList.remove('is-active');
  console.log('Карта в удалена с ЛОКАЛСТОРДЖ');
}
