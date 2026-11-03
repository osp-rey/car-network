export default function buttonsNote() {
  const buttons = document.querySelectorAll("[data-btn-note]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectorTarget = btn.dataset.targetNote;
        const target = document.querySelector(selectorTarget);
        const value = btn.dataset.btnNote;

        if (target) {
          target.value = value;
        }
      });
    });
  }
}
