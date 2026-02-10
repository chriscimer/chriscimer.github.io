document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentImages = [];
  let currentIndex = 0;

  // Pobieramy wszystkie zdjęcia z portfolio i ukryte
  const allPortfolioImages = Array.from(document.querySelectorAll("#portfolio .gallery img"))
    .concat(Array.from(document.querySelectorAll("div[style*='display:none'] img")));

  // Dodajemy event klik dla każdego zdjęcia
  allPortfolioImages.forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      // Pobieramy wszystkie zdjęcia tej samej serii
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

    const image = document.createElement("img");
    image.src = currentImages[currentIndex];
    modalContent.appendChild(image);
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

  // Obsługa przycisków
  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  // Klik w tło modala zamyka go
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Nawigacja klawiaturą
  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") modal.classList.remove("active");
  });
});
