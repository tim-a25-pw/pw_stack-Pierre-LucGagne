import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      direction: 'vertical',
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        type: 'bullets',
      },

      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };

    this.init();
  }

  init() {
    this.setOptions();
    new Swiper(this.element, this.options);
    console.log('Initialisation de ma composante Carousel');
    //console.log(this.element + 'carousel1');
  }
  setOptions() {
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        // when window width is >= 320px
        1200: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
      };
    }

    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      };
    }

    if ('loop' in this.element.dataset) {
      this.options.loop = true;
    }
    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        parseFloat(this.element.dataset.slides, 10) ||
        this.options.slidesPerView;
    }
  }
}
