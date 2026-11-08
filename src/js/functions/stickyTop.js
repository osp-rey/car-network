export default function stickyTop() {
  const items = document.querySelectorAll("._sticky-top");

  if (items.length && window.matchMedia("(min-width: 1026px)").matches) {
    const headerHeight = document.querySelector(".header").clientHeight;
    items.forEach((item) => {
      item.style.top = `${headerHeight + 30}px`;
    });
  }
}
