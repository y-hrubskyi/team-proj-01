const buttonThemeEl = document.querySelectorAll('.dark-light');
const lightThemeEL = document.querySelector('.light-icon');
const darkThemeEl = document.querySelector('.dark-icon');
const bodyEl = document.body;

let theme = bodyEl.className;

const themeLocal = localStorage.getItem('theme');

if (themeLocal === 'dark-theme') {
  bodyEl.classList.remove('light-theme');
  bodyEl.classList.add(`${themeLocal}`);
} else {
  bodyEl.classList.add(`${themeLocal}`);
}

buttonThemeEl.forEach(function (buttonThemeEl) {
  buttonThemeEl.addEventListener('click', onButtonThemeElClick);
});

function onButtonThemeElClick() {
  if (bodyEl.classList.contains('light-theme') === true) {
    theme = 'dark-theme';

    bodyEl.classList.remove('light-theme');
    bodyEl.classList.add('dark-theme');

    localStorage.setItem('theme', theme);
  } else {
    theme = 'light-theme';

    bodyEl.classList.add('light-theme');
    bodyEl.classList.remove('dark-theme');

    localStorage.setItem('theme', theme);
  }
}
