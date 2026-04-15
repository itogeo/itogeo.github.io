document.addEventListener("DOMContentLoaded", () => {
  const bgImages = [
    "crop_fields_nir.jpg",
    "crop_fields.jpg",
    "ocean_land.jpg",
    "river_town.jpg",
    "yk_delta.jpg"
  ];

  const hero = document.querySelector(".dynamic-bg");
  if (!hero || !bgImages.length) return;

  for (let i = bgImages.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bgImages[i], bgImages[j]] = [bgImages[j], bgImages[i]];
  }

  const computed = getComputedStyle(hero);
  if (computed.position === "static") hero.style.position = "relative";
  hero.style.overflow = "hidden";

  const makeLayer = () => {
    const layer = document.createElement("div");
    layer.className = "hero-bg-layer";
    Object.assign(layer.style, {
      position: "absolute",
      inset: "0",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: "0",
      transition: "opacity 1.8s ease-in-out",
      pointerEvents: "none"
    });
    hero.prepend(layer);
    return layer;
  };

  const layerA = makeLayer();
  const layerB = makeLayer();
  let activeLayer = layerA;
  let idleLayer = layerB;
  let index = 0;

  const content = hero.querySelector(".hero-content");
  if (content) {
    content.style.position = "relative";
    content.style.zIndex = "2";
  }

  const path = (name) => `/data/backgroundimages/${name}`;

  const setLayer = (layer, src) => new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    const apply = () => {
      layer.style.backgroundImage = `url('${src}')`;
      resolve();
    };
    if (img.complete) apply();
    else {
      img.addEventListener("load", apply);
      img.addEventListener("error", resolve);
    }
  });

  setLayer(activeLayer, path(bgImages[0])).then(() => {
    activeLayer.style.opacity = "1";
    hero.classList.add("hero-image-ready");
  });

  if (bgImages.length > 1) {
    setInterval(() => {
      index = (index + 1) % bgImages.length;
      setLayer(idleLayer, path(bgImages[index])).then(() => {
        idleLayer.style.opacity = "1";
        activeLayer.style.opacity = "0";
        [activeLayer, idleLayer] = [idleLayer, activeLayer];
      });
    }, 7000);
  }
});
