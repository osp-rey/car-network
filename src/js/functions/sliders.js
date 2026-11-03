export default function sliders() {
  const heroSlider = document.querySelector(".s-hero__slider");

  if (heroSlider) {
    const heroBgSlider = document.querySelector(".s-hero__slider-bg");

    const swiperBg = new Swiper(heroBgSlider, {
      speed: 900,
    });

    const swiper = new Swiper(heroSlider, {
      speed: 900,
      autoplay: {
        delay: 6500,
      },
      controller: {
        control: swiperBg,
      },
      effect: "fade",
      navigation: {
        prevEl: ".s-hero .slider-arrow._prev",
        nextEl: ".s-hero .slider-arrow._next",
      },
      pagination: {
        el: ".s-hero .slider-pagination",
        clickable: true,
      },
    });
  }

  const catsSlider = document.querySelector(".s-cats__slider");

  if (catsSlider) {
    const swiper = new Swiper(catsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5500,
      },
      pagination: {
        el: ".s-cats .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1366: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }
  const modelsSlider = document.querySelector(".s-models__slider");

  if (modelsSlider) {
    const swiper = new Swiper(modelsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 6000,
      },
      pagination: {
        el: ".s-models .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1366: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });
  }
}
