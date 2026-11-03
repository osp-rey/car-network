export default function hero() {
  const sect = document.querySelector(".s-hero");

  if (sect) {
    const heroSlidesBodies = document.querySelectorAll(".s-hero__slide-body");
    function changeOffset() {
      const headerHeight = document.querySelector(".header").clientHeight;
      const sliderNav = document.querySelector(".s-hero__slider-nav");
      const sliderNavHeight = sliderNav.clientHeight;
      const sliderNavBottom = +window
        .getComputedStyle(sliderNav)
        .bottom.slice(0, -2);
      heroSlidesBodies.forEach((s) => {
        s.style.padding = `${headerHeight + 30}px 0px ${sliderNavHeight + sliderNavBottom + 30}px 0px`;
      });
    }
    changeOffset();

    window.visualViewport.addEventListener("resize", changeOffset);
    window.visualViewport.addEventListener("scroll", changeOffset);
  }
}
