document.addEventListener("DOMContentLoaded", function() {
    const bgImages = [
      "crop_fields_nir.jpg",
      "crop_fields.jpg",
      "ocean_land.jpg",
      "river_town.jpg",
      "yk_delta.jpg"
    ];
  
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
  
    // Target the hero section only
    const hero = document.querySelector(".dynamic-bg");
    if (hero) {
      hero.style.background = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(18, 18, 18, 0.95)),
        url('data/backgroundimages/${randomImage}') center/cover no-repeat
      `;
      hero.style.transition = "background 1.5s ease-in-out";
    }
  });
  