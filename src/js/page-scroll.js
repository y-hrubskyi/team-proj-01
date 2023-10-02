import throttle from 'lodash.throttle';
const upBtn = document.querySelector('.up-button');

let scroll = 1000;
document.addEventListener(
  'scroll',
  throttle(() => {
    onScroll();
  }, 300)
);

function onScroll() {
  let top = window.scrollY;
  console.log(top);
  if (top < scroll) {
    upBtn.classList.add('visually-hidden');
  } else {
    upBtn.classList.remove('visually-hidden');
  }
}
