// export function sortByRating(cocktailsList) {
//   const sortButton = document.querySelector('.sort-by-rating');
//   sortButton.classList.remove('hidden');
//   sortButton.addEventListener('click', () =>
//     Array.from(cocktailsList.children)
//       .sort((a, b) => b.dataset.rating - a.dataset.rating)
//       .forEach(card => cocktailsList.appendChild(card))
//   );
// }

export function sortByRating(cocktailsList) {
  const sortButton = document.querySelector('.sort-by-rating');
  sortButton.classList.remove('hidden');

  sortButton.addEventListener('click', () => {
    const spanElements = Array.from(
      cocktailsList.querySelectorAll('.rating-cocktails')
    );

    spanElements.forEach(span => {
      span.classList.remove('hidden');
    });

    Array.from(cocktailsList.children)
      .sort((a, b) => {
        const ratingA = parseFloat(
          a.querySelector('.rating-cocktails').textContent
        );
        const ratingB = parseFloat(
          b.querySelector('.rating-cocktails').textContent
        );
        return ratingB - ratingA;
      })
      .forEach(card => cocktailsList.appendChild(card));
  });
}

export function getRandomRating() {
  const randomNumber = (Math.random() * 5 + 5).toFixed(1);
  return parseFloat(randomNumber);
}
