export default function headerScroll() {
  const header = document.querySelector(".header");

  if (header) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", changeScroll);
    changeScroll();

    function changeScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 0) {
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_scroll");
      }

      if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) {
        header.classList.add("_hide");
      } else {
        header.classList.remove("_hide");
      }

      lastScrollTop = scrollTop;
    }
  }
}
