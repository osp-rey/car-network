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

  const promoSlider = document.querySelector(".s-promo__slider");

  if (promoSlider) {
    const swiper = new Swiper(promoSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 5500,
      },
      navigation: {
        prevEl: ".s-promo .slider-arrow._prev",
        nextEl: ".s-promo .slider-arrow._next",
      },
      scrollbar: {
        el: ".s-promo .slider-scrollbar",
        draggable: true,
      },
      breakpoints: {
        1366: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },
    });
  }

  const newsSlider = document.querySelector(".s-news__slider");
  if (newsSlider) {
    const swiper = new Swiper(newsSlider, {
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 20,
      autoplay: {
        delay: 6500,
      },
      navigation: {
        prevEl: ".s-news .slider-arrow._prev",
        nextEl: ".s-news .slider-arrow._next",
      },
      pagination: {
        el: ".s-news .slider-pagination",
        clickable: true,
      },
      breakpoints: {
        1366: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  const optionsSliders = document.querySelectorAll(".s-options__slider");

  if (optionsSliders.length) {
    optionsSliders.forEach((slider) => {
      const wrap = slider.closest("[data-tab]");
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 20,
        slidesPerView: "auto",
        // autoplay: {
        //   delay: 5500
        // },
        pagination: {
          el: wrap.querySelector(".slider-pagination"),
          clickable: true,
        },
        breakpoints: {
          1200: {
            spaceBetween: 25,
            slidesPerView: 3,
          },
        },
      });
    });
  }
}
