import throttle from 'lodash.throttle';
import { onPageDown } from './feedback';
export const body = document.querySelector('body');
// const html = document.documentElement;
// console.log(html);
// console.log(html.scrollHeight);
// console.log(html.clientHeight);
// console.log(html.scrollTop);
export function createBtn() {
  body.insertAdjacentHTML(
    'beforeend',
    '<a href="#" class="up-button visually-hidden ">UP</a>'
  );
}
createBtn();

export const upBtn = document.querySelector('.up-button');

let scroll = 1000;
document.addEventListener(
  'scroll',
  throttle(() => {
    onScroll();
    onPageDown();
  }, 300)
);

function onScroll() {
  let top = window.scrollY;
  if (top < scroll) {
    upBtn.classList.add('visually-hidden');
  } else {
    upBtn.classList.remove('visually-hidden');
  }
}

// function qwer() {
//   if (html.scrollHeight - html.scrollTop === html.clientHeight) {
//     console.log('FINISH');
//   } else {
//     console.log('NO FINISH');
//   }
// }
