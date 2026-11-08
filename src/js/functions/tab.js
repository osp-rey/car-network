export default function tab() {
  const buttons = document.querySelectorAll("[data-tab-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const container = btn.closest(".tabs");
        const tabId = btn.dataset.tabBtn;
        const allButtons = container
          .querySelector(".tabs-nav")
          .querySelectorAll("[data-tab-btn]");
        const allTabs = [];
        const allTabsContents = container.querySelectorAll(".tabs-content");
        allTabsContents.forEach((tabsContent) => {
          const tabs = Array.from(tabsContent.children).filter((child) =>
            child.hasAttribute("data-tab"),
          );

          allTabs.push(...tabs);
        });

        const currentTabs = container.querySelectorAll(`[data-tab="${tabId}"]`);

        allTabs.forEach((t) => {
          t.classList.remove("_show");
          setTimeout(() => {
            t.classList.remove("_active");
          }, 150);
        });

        setTimeout(() => {
          currentTabs.forEach((t) => {
            t.classList.add("_active");
            setTimeout(() => {
              t.classList.add("_show");
            }, 150);
          });
        }, 150);

        allButtons.forEach((b) => b.classList.remove("_active"));
        btn.classList.add("_active");
      });
    });
  }
}
