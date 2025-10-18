document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("mainHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navbarMenu = document.getElementById("navbarMenu");
  const toggleIcon = menuToggle.querySelector("i");
  const animatedElements = document.querySelectorAll(".animate");

  // Sticky navbar effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("show");

    // Switch icon
    if (navbarMenu.classList.contains("show")) {
      toggleIcon.classList.replace("fa-bars", "fa-times"); // Hamburger → X
    } else {
      toggleIcon.classList.replace("fa-times", "fa-bars"); // X → Hamburger
    }
  });

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // run once
      }
    });
  }, { threshold: 0.2 });

  animatedElements.forEach(el => observer.observe(el));
});
