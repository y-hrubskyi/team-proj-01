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
const mySwiper = new Swiper(sliderSelector, options);
mySwiper.init();
const membersList = document.querySelector('.members-list');
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
