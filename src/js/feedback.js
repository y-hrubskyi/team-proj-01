import Notiflix from 'notiflix';
const feedbacBox = document.querySelector('.feedback-box');
const html = document.documentElement;
const likeBtn = document.querySelector('.like-btn');
const disLikeBtn = document.querySelector('.dislike-btn');

const random = (min, max) => {
  const rand = min + Math.random() * (max - min + 1);
  return Math.floor(rand);
};

const dislikeBtn = document.querySelector('.dislike-btn');
dislikeBtn.addEventListener('mouseenter', () => {
  dislikeBtn.style.left = `${random(0, 90)}%`;
  dislikeBtn.style.top = `${random(0, 90)}%`;
});

export function onPageDown() {
  if (html.scrollHeight - html.scrollTop === html.clientHeight) {
    // console.log('конец страницы');
    feedbacBox.classList.remove('visually-hidden');
    likeBtn.addEventListener('click', onLikeBtnClick);

    disLikeBtn.addEventListener('click', onDislikeBtnClick);
  } else {
    feedbacBox.classList.add('visually-hidden');
    likeBtn.removeEventListener('click', onLikeBtnClick);

    disLikeBtn.removeEventListener('click', onDislikeBtnClick);
  }
}

function onLikeBtnClick() {
  Notiflix.Notify.success('We like you too 😊');
}
function onDislikeBtnClick() {
  Notiflix.Notify.success('We like persistent ones 👏');
}
