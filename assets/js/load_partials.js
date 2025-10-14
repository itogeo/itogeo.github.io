document.addEventListener("DOMContentLoaded", () => {
  const includeTargets = document.querySelectorAll("[data-include]");

  if (!includeTargets.length) {
    document.dispatchEvent(new CustomEvent("partialsLoaded"));
    return;
  }

  const loaders = Array.from(includeTargets).map(async (el) => {
    const file = el.getAttribute("data-include");
    try {
      const resp = await fetch(file);
      if (!resp.ok) {
        throw new Error(`Failed to load ${file}: ${resp.status}`);
      }
      const html = await resp.text();
      el.innerHTML = html;
    } catch (error) {
      console.error(error.message);
    }
  });

  Promise.all(loaders).finally(() => {
    document.dispatchEvent(new CustomEvent("partialsLoaded"));
  });
});
