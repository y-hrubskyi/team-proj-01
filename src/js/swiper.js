// new Swiper('.card-slider', {
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   //   pagination: {
//   //     el: '.swiper-pagination',
//   //     clikable: true,
//   //     dynamicBullets: true,
//   //     renderBullet: function (index, className) {
//   //       return '<span class="' + className + '">' + (index + 1) + '</span>';
//   //     },
//   type: 'fraction',
//   renderfraction: function (currentClass, totalClass) {
//     return;
//     'фото <span class="' +
//       currentClass +
//       '"></span>' +
//       'із' +
//       '<span class="' +
//       totalClass +
//       '"></span>';
//   },
//   scrollbar: {
//     el: '.swiper-scrollbar',
//     draggable: true,
//   },
//   simulateTouch: true,
//   touchRatio: 1,
//   touchAngle: 45,
//   grabCursor: true,
//   slideToClikedSlide: true,
//   keyboard: {
//     enabled: true,
//     onlyInViewport: true,
//     pageUpDown: true,
//   },
//   autoHeight: true,
//   spaceBetween: 30,
//   speed: 300,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//     stopOnLastSlide: true,
//   },
//   effect: 'fade',
//   fadeEffect: {
//     crossFade: true,
//   },
//   breakpoints: {
//     1200: {
//       slidesPerView: 3,
//       spaceBetween: 28,
//     },
//     768: {
//       slidesPerView: 2,
//       spaceBetween: 16,
//     },
//   },
// });
import Swiper from 'swiper';
import {
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
  Scrollbar,
  // Effect,
  // CoverflowEffect,
  Mousewheel,
  EffectCoverflow,

  // Breakpoints,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
var sliderSelector = '.members-swiper',
  options = {
    modules: [
      Navigation,
      Pagination,
      Autoplay,
      Keyboard,
      Mousewheel,
      Scrollbar,
      EffectCoverflow,
      // Breakpoints,
    ],
    init: false,
    loop: true,
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    slideToClickedSlide: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 60,
      modifier: 1,
      slideShadows: true,
    },
    grabCursor: true,
    parallax: true,
    pagination: {
      el: '.members-pagination',
      type: 'progressbar',
    },

    breakpoints: {
      1200: {
        slidesPerView: 3,
        spaceBetween: 28,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    keyboard: {
      enabled: true,
      onluInViewport: true,
      pageUpDown: true,
    },
    mousewheel: {
      sensitivity: 1,
      eventsTarget: '.members-swiper',
    },
  };

import img1 from '/img/contact/img-1.webp';
import img2 from '/img/contact/img-2.webp';
import img3 from '/img/contact/img-3.webp';
import img4 from '/img/contact/img-4.webp';
import img5 from '/img/contact/img-5.webp';
import img6 from '/img/contact/img-6.webp';
import img7 from '/img/contact/img-7.webp';
import img8 from '/img/contact/img-8.webp';
import img9 from '/img/contact/img-9.webp';
import img10 from '/img/contact/img-10.webp';
import spriteUrl from '/img/sprite.svg';

const members = [
  {
    name: 'YAKIV',
    fullname: 'YAKIV HRUBSKYI',
    position: 'Team Lead',
    img: img1,
  },
  {
    name: 'ILIA',
    fullname: 'ILIA SEMENOVA',
    position: 'Scrum Master',
    img: img2,
  },
  {
    name: 'SERHII',
    fullname: 'SERHII LUTSENKO',
    position: 'FullStack Developer',
    img: img3,
  },
  {
    name: 'SERGII',
    fullname: 'SERGII PIGAN',
    position: 'FullStack Developer',
    img: img4,
  },
  {
    name: 'YURII',
    fullname: 'YURII KRAVCHUK',
    position: 'FullStack Developer',
    img: img5,
  },
  {
    name: 'OLESIA',
    fullname: 'OLESIA MEDVEDEVA',
    position: 'FullStack Developer',
    img: img6,
  },
  {
    name: 'OLEXANDRA',
    fullname: 'OLEXANDRA PRYSCHEPA',
    position: 'FullStack Developer',
    img: img7,
  },
  {
    name: 'ANGELINA',
    fullname: 'ANGELINA CHOLAK',
    position: 'FullStack Developer',
    img: img8,
  },
  {
    name: 'ANDRII',
    fullname: 'ANDRII POPOV',
    position: 'FullStack Developer',
    img: img9,
  },
  {
    name: 'MYKOLA',
    fullname: 'MYKOLA PAVLOVYCH',
    position: 'FullStack Developer',
    img: img10,
  },
];

const mySwiper = new Swiper(sliderSelector, options);
mySwiper.init();

const membersList = document.querySelector('.members-list');
membersList.innerHTML = createMembersMarkup(members);
membersList.addEventListener('click', onMembersListClick);

function onMembersListClick(e) {
  if (e.target.closest('.btn-like')) {
    e.target.closest('.btn-like').classList.toggle('is-active');
    e.target
      .closest('.like-dislike-btn ')
      .querySelector('.btn-dislike ')
      .classList.remove('is-active');
  }

  if (e.target.closest('.btn-dislike')) {
    e.target.closest('.btn-dislike').classList.toggle('is-active');
    e.target
      .closest('.like-dislike-btn ')
      .querySelector('.btn-like ')
      .classList.remove('is-active');
  }
}

function createMembersMarkup(members) {
  return members
    .map(
      member => `<li class="members-list-item swiper-slide">
                <img
                  width="316"
                  height="289"
                  class="member-foto"
                  src="${member.img}"
                  srcset=""
                  alt="${member.name}"
                />
                <h2 class="member-name">${member.fullname}</h2>
                <h3 class="member-position">${member.position}</h3>
                <div class="like-dislike-btn">
                  <button type="button" class="btn-like">
                    <svg
                      width="24px"
                      height="24px"
                      class="svg-icon-heart"
                      aria-label="like button"
                    >
                      <use href="${spriteUrl}#icon-heart"></use>
                    </svg>
                  </button>
                  <button type="button" class="btn-dislike">
                    <svg
                      width="24px"
                      height="24px"
                      class="svg-icon-dislike"
                      aria-label="dislike button"
                    >
                      <use href="${spriteUrl}#icon-dislike"></use>
                    </svg>
                  </button>
                </div>
              </li>`
    )
    .join('');
}
