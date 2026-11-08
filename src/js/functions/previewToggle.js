import { createEl } from "./helpFunctions.js";

export default function previewToggle() {
  const buttons = document.querySelectorAll(".s-preview__gallery-toggle-btn");

  if (buttons.length) {
    const slider = document.querySelector(".s-preview__slider");
    initSlider(slider);
    function initSlider(slider) {
      if (slider) {
        const wrap = slider.closest(".s-preview__gallery");
        const options = {
          speed: 900,
          slidesPerView: 1,
          spaceBetween: 20,
          autoplay: {
            delay: 6000
          },
          pagination: {
            el: wrap.querySelector(".slider-pagination"),
            clickable: true,
          },
        };
        const swiper = new Swiper(slider, options);
      }
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const wrap = btn.closest("[data-tab]");
        const galleryArr = btn.dataset.gallery.split(",");
        const gallery = wrap.querySelector(".s-preview__gallery");
        const buttonsNeighbors = wrap.querySelectorAll(
          ".s-preview__gallery-toggle-btn",
        );

        buttonsNeighbors.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");

        gallery.classList.add("_hide");

        setTimeout(() => {
          gallery.innerHTML = "";

          const sliderN = createEl("div", "swiper s-preview__slider");
          const sliderNWrapper = createEl("div", "swiper-wrapper");
          const sliderNPagination = createEl("div", "slider-pagination");

          galleryArr.forEach((gal) => {
            const slideN = createEl("a", "swiper-slide");
            slideN.setAttribute("data-fancybox", wrap.dataset.tab);
            slideN.setAttribute("href", gal);

            const img = createEl("img");
            img.src = gal;
            slideN.appendChild(img);
            sliderNWrapper.appendChild(slideN);
          });
          sliderN.appendChild(sliderNWrapper);

          gallery.appendChild(sliderN);
          gallery.appendChild(sliderNPagination);

          initSlider(sliderN);

          gallery.classList.remove("_hide");
        }, 300);
      });
    });
  }
}
