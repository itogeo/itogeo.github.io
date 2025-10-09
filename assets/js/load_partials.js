// assets/js/load-partials.js
document.addEventListener("DOMContentLoaded", () => {
    const includeTargets = document.querySelectorAll("[data-include]");
    includeTargets.forEach(async (el) => {
      const file = el.getAttribute("data-include");
      const resp = await fetch(file);
      if (resp.ok) {
        const html = await resp.text();
        el.innerHTML = html;
      } else {
        console.error(`Failed to load ${file}: ${resp.status}`);
      }
    });
  });
  