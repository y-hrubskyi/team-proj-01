const buttonThemeEl = document.querySelector('.dark-light');
const lightThemeEL = document.querySelector('.light-icon');
const darkThemeEl = document.querySelector('.dark-icon');
const bodyEl = document.body;

const themeLocal = localStorage.getItem('theme');

bodyEl.classList.add(`${themeLocal}`);

let theme = bodyEl.className;

buttonThemeEl.addEventListener('click', onButtonThemeElClick);

function onButtonThemeElClick() {
  if (bodyEl.classList.contains('light-theme') === true) {
    theme = 'dark-theme';
    bodyEl.classList.add('dark-theme');
    bodyEl.classList.remove('light-theme');
    lightThemeEL.classList.add('visually-hidden');
    darkThemeEl.classList.remove('visually-hidden');
    localStorage.setItem('theme', theme);
  } else {
    theme = 'light-theme';
    lightThemeEL.classList.remove('visually-hidden');
    darkThemeEl.classList.add('visually-hidden');
    bodyEl.classList.add('light-theme');
    bodyEl.classList.remove('dark-theme');
    localStorage.setItem('theme', theme);
  }
}
