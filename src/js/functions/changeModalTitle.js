export default function changeModalTitle() {
  const buttons = document.querySelectorAll(
    "[data-fancybox][data-modal-title]",
  );

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const titleValue = btn.dataset.modalTitle;

        if (titleValue) {
          const selector = btn.getAttribute("href") || btn.dataset.src;

          const modalTitle = document
            .querySelector(selector)
            .querySelector(".modal__title");
          if (modalTitle) modalTitle.textContent = titleValue;
        }
      });
    });
  }
}
