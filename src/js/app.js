import burger from "./functions/burger.js";
import buttonsNote from "./functions/buttonsNote.js";
import changeModalTitle from "./functions/changeModalTitle.js";
import handlerSelect from "./functions/handlerSelect.js";
import headerScroll from "./functions/headerScroll.js";
import hero from "./functions/hero.js";
import inputmask from "./functions/inputmask.js";
import map from "./functions/map.js";
import sliders from "./functions/sliders.js";
import spoller from "./functions/spoller.js";

document.addEventListener("DOMContentLoaded", () => {
  burger();
  buttonsNote();
  changeModalTitle();
  sliders();
  hero();
  headerScroll();
  handlerSelect();
  inputmask();
  map();
  spoller();

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
