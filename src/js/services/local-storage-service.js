export const LOCAL_STORAGE_KEYS = {
  COCKTAILS: 'favoriteCocktails',
  INGREDIENTS: 'favoriteIngredients',
  PREV_MODAL_DATA: 'prevModalData',
};

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

export function isInLocaleStorage({ _id: id }, key) {
  const favorites = JSON.parse(localStorage.getItem(key)) || [];
  if (!favorites.length) return false;

  return favorites.some(item => item._id === id);
}
