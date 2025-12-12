export function initNavBarBgTransition(options = {}) {
  const navBarContainer = document.querySelector(".nav-bar-container");
  const navBarHeader = navBarContainer.querySelector("header");
  navBarHeader.classList.add("scroll-transparent-initial-state");

  if (!navBarHeader) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navBarHeader.classList.remove("scroll-transparent-initial-state");
    } else {
      navBarHeader.classList.add("scroll-transparent-initial-state");
    }
  });
}
