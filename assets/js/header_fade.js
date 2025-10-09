// assets/js/header_fade.js

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    const scrollY = window.scrollY;
    const maxFade = 0.6; // how transparent it gets (0 = invisible, 1 = solid)
  
    // Calculate opacity based on scroll distance
    const opacity = Math.max(1 - scrollY / 400, maxFade);
    nav.style.background = `rgba(18, 18, 18, ${opacity})`;
  });
  
  const nav = document.querySelector("nav");
  if (nav) {
    nav.addEventListener("mouseenter", () => {
      nav.style.background = "rgba(18, 18, 18, 0.95)";
    });
    nav.addEventListener("mouseleave", () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 400, 0.6);
      nav.style.background = `rgba(18, 18, 18, ${opacity})`;
    });
  }
  