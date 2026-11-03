import burger from "./functions/burger.js";
import buttonsNote from "./functions/buttonsNote.js";
import changeModalTitle from "./functions/changeModalTitle.js";
import headerScroll from "./functions/headerScroll.js";
import hero from "./functions/hero.js";
import sliders from "./functions/sliders.js";

document.addEventListener("DOMContentLoaded", () => {
  burger();
  buttonsNote();
  changeModalTitle();
  sliders();
  hero();
  headerScroll();

  Fancybox.bind("[data-fancybox]", {
    on: {
      destroy: (instance) => {
        const id = instance.getSlide().src;

        if (id.includes("#modal")) {
          const modal = document.querySelector(id);
          const inputNote = modal.querySelector(".input-note");
          const modalTitle = modal.querySelector(".modal__title[data-text]");

          if (inputNote) inputNote.value = "";
          if (modalTitle) modalTitle.textContent = modalTitle.dataset.text;
        }
      },
    },
  });

  // Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
});
