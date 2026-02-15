document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentImages = [];
  let currentIndex = 0;

  const allPortfolioImages = Array.from(document.querySelectorAll("#portfolio .gallery img"))
    .concat(Array.from(document.querySelectorAll("div[style*='display:none'] img")));

  allPortfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      // Pobieramy wszystkie zdjęcia z tej samej serii
      currentImages = allPortfolioImages
        .filter(el => el.dataset.series === series)
        .map(el => el.src);

      currentIndex = currentImages.indexOf(img.src);
      openModal();
    });
  });

  function openModal() {
    modalContent.innerHTML = "";
    if (currentImages.length === 0) return;

    // Duże zdjęcie
    const mainImage = document.createElement("img");
    mainImage.src = currentImages[currentIndex];
    mainImage.classList.add("main-image");
    modalContent.appendChild(mainImage);

    // Miniaturki
    const thumbsContainer = document.createElement("div");
    thumbsContainer.classList.add("thumbs-container");

    currentImages.forEach((src, i) => {
      const thumb = document.createElement("img");
      thumb.src = src;
      thumb.classList.add("thumb");
      if (i === currentIndex) thumb.classList.add("active-thumb");

      thumb.addEventListener("click", () => {
        currentIndex = i;
        openModal();
      });

      thumbsContainer.appendChild(thumb);
    });

    modalContent.appendChild(thumbsContainer);
    modal.classList.add("active");
  }

  function showNext() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    openModal();
  }

  function showPrev() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    openModal();
  }

  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });

  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") modal.classList.remove("active");
  });
  const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const galleryImages = document.querySelectorAll(".gallery img");

let currentIndex = 0;

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    const series = img.dataset.series;

    // teraz bierzemy wszystkie zdjęcia tej serii, w tym ukryte
    currentSeries = Array.from(document.querySelectorAll(`.gallery img[data-series="${series}"], #hidden-images img[data-series="${series}"]`));

    currentIndex = currentSeries.indexOf(img);
    modal.style.display = "flex";
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentIndex].src;
});
  // ===== HERO IMAGE ROTATION =====

const heroImage = document.getElementById("hero");

const heroImages = [

  "./images/1_logo_small_ctr_%20hero_by_chris_cimer.jpg",

  "./images/iterior_kitchen_hero_by_chris_cimer_1.png",
  "./images/iterior_kitchen_hero_by_chris_cimer_2.png",
  ".images/interior with sideboard_concept by chris cimer .png",
  "./images/iterior_kitchen_hero_by_chris_cimer_3.png",
  "./images/iterior_kitchen_hero_by_chris_cimer_4.png"

];

let heroIndex = 0;

setInterval(() => {

  heroImage.style.opacity = 0;

  setTimeout(() => {

    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImage.src = heroImages[heroIndex];

    heroImage.style.opacity = 1;

  }, 800);

}, 7000);


