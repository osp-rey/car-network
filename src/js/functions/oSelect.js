import { createEl } from "./helpFunctions.js";

export default function oSelectHandler() {
  class OSelect {
    constructor(selector) {
      if (typeof selector === "string")
        this.select = document.querySelector(selector);
      else this.select = selector;

      this.options = this.select.querySelectorAll("option");
      this.currentOption = Array.from(this.options).find((o) => o.selected);

      this.init();
    }

    init() {
      const htmlSelect = createEl("div", "o-select");
      const htmlSelectBtn = createEl("div", "o-select-btn");
      const htmlSelectBody = createEl("div", "o-select-body");
      const htmlSelectBodyInside = createEl("div", "o-select-body-inside");

      document.addEventListener("click", () => {
        if (htmlSelect.classList.contains("_open"))
          htmlSelect.classList.remove("_open");
      });
      htmlSelect.addEventListener("click", (e) => e.stopPropagation());

      htmlSelectBtn.innerHTML = `
      <span class="select-btn-text">${this.currentOption.textContent}</span>
      <i class="icon-bottom"></i>
    `;

      htmlSelect.appendChild(htmlSelectBtn);
      htmlSelect.appendChild(htmlSelectBody);
      htmlSelectBody.appendChild(htmlSelectBodyInside);

      htmlSelectBtn.addEventListener("click", () => {
        htmlSelect.classList.toggle("_open");
      });

      this.options.forEach((o) => {
        const currentId = o.id;
        const htmlOption = createEl("div", "o-select-option");
        htmlOption.textContent = o.textContent;
        htmlSelectBodyInside.appendChild(htmlOption);

        htmlOption.addEventListener("click", (e) => {
          const neighborsOptions = htmlOption
            .closest(".o-select-body")
            .querySelectorAll(".o-select-option");
          htmlSelectBtn.querySelector("span").textContent =
            e.target.textContent;

          if (neighborsOptions.length)
            neighborsOptions.forEach((i) => i.classList.remove("_active"));
          htmlOption.classList.add("_active");

          o.selected = true;
          this.select.dispatchEvent(new Event("change", { bubbles: true }));

          htmlSelect.classList.remove("_open");
        });
      });

      this.select.style.display = "none";
      this.select.insertAdjacentElement("afterend", htmlSelect);
    }
  }

  function handlerChange() {
    const selects = document.querySelectorAll(".s-catalog__sort-wrap select");

    if (selects.length) {
      selects.forEach((s) => {
        const oSelect = new OSelect(s);
      });
    }
  }

  handlerChange();
}