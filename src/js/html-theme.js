const buttonThemeEl = document.querySelector('.dark-light');
const lightThemeEL = document.querySelector('.light-icon');
const darkThemeEl = document.querySelector('.dark-icon');
const bodyEl = document.body;

buttonThemeEl.addEventListener('click', onButtonThemeElClick);

function onButtonThemeElClick() {
  if (bodyEl.classList.contains('light-theme') === true) {
    bodyEl.classList.add('dark-theme');
    bodyEl.classList.remove('light-theme');
    lightThemeEL.classList.add('visually-hidden');
    darkThemeEl.classList.remove('visually-hidden');
  } else {
    lightThemeEL.classList.remove('visually-hidden');
    darkThemeEl.classList.add('visually-hidden');
    bodyEl.classList.add('light-theme');
    bodyEl.classList.remove('dark-theme');
  }
}
