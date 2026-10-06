const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const themeBtn = document.getElementById("themeBtn");
const backTop = document.getElementById("backTop");
const cursorGlow = document.querySelector(".cursor-glow");

// Mobile navigation
menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
navLinks.forEach(link => link.addEventListener("click", () => navMenu.classList.remove("open")));

// Header + back-to-top
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  backTop.classList.toggle("show", window.scrollY > 500);

  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

// Theme
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☾" : "☼";
  localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
});

if (localStorage.getItem("portfolio-theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "☾";
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Project filtering
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    projects.forEach(project => {
      const show = category === "all" || project.dataset.category === category;
      project.classList.toggle("hide", !show);
    });
  });
});

// Cursor glow on desktop
window.addEventListener("mousemove", e => {
  if (window.innerWidth > 900) {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  }
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
