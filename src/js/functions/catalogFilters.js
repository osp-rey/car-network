import { slideDown, slideUp } from "./helpFunctions.js";

export function catalogFiltersToggle() {
  const wrap = document.querySelector(".s-catalog__sidebar-filters");

  if (wrap) {
    let timeAnim = 300;
    let isSlide = false;
    const widgets = wrap.querySelectorAll(".berocket_single_filter_widget");

    if (widgets.length) {
      const btnUpdate = document.querySelector(".bapf_update");

      if (btnUpdate) btnUpdate.classList.add("btn-s");

      widgets.forEach((w) => {
        const btn = w.querySelector(".bapf_head");
        const body = w.querySelector(".bapf_body");

        slideUp(body, 0);

        btn.addEventListener("click", () => {
          if (isSlide) return;
          isSlide = true;
          if (btn.classList.contains("_active")) {
            btn.classList.remove("_active");
            slideUp(body, timeAnim);
          } else {
            btn.classList.add("_active");
            slideDown(body, timeAnim);
          }
          setTimeout(() => {
            isSlide = false;
          }, timeAnim);
        });
      });
    }
  }
}
export function catalogSidebar() {
  const sidebar = document.querySelector("#catalog-sidebar");

  if (sidebar && window.matchMedia("(max-width: 1025px)").matches) {
    const overlay = document.querySelector("#catalog-sidebar-overlay");
    const sidebarOpen = document.querySelector("#catalog-sidebar-open");
    const closes = document.querySelectorAll("[data-catalog-sidebar-close]");

    if (closes.length) {
      closes.forEach((close) => {
        close.addEventListener("click", () => {
          sidebar.classList.remove("_open");
          overlay.classList.remove("_active");
          document.body.classList.remove("body-hidden");
        });
      });
    }

    sidebarOpen.addEventListener("click", () => {
      sidebar.classList.add("_open");
      overlay.classList.add("_active");
      document.body.classList.add("body-hidden");
    });

    function updateHeight() {
      sidebar.style.maxHeight = `${window.visualViewport.height}px`;
    }
    updateHeight();
    window.visualViewport.addEventListener("resize", updateHeight);
    window.visualViewport.addEventListener("scroll", updateHeight);
  }
}
