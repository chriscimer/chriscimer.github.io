document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTY MODALA
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");
  const closeBtn = document.querySelector(".close");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let currentImages = [];
  let currentIndex = 0;

  // ================= FUNKCJE =================
  
  // Otwórz modal z aktualnym obrazem
  function openModal() {
    modalContent.innerHTML = "";
    const img = document.createElement("img");
    img.src = currentImages[currentIndex];
    modalContent.appendChild(img);
    modal.classList.add("active");
  }

  // Pokaż następny obraz
  function showNext() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    openModal();
  }

  // Pokaż poprzedni obraz
  function showPrev() {
    if (currentImages.length === 0) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    openModal();
  }

  // ================= OBSŁUGA KLIKÓW =================

  // Klik na zdjęcie portfolio
  document.querySelectorAll("#portfolio .gallery img").forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      // Pobierz wszystkie zdjęcia z tej samej serii
      currentImages = Array.from(document.querySelectorAll(
        `#portfolio .gallery img[data-series="${series}"]`
      )).map(el => el.src);

      currentIndex = currentImages.indexOf(img.src);
      openModal();
    });
  });

  // Strzałki i zamykanie
  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("active"));

  // Zamknij modal po kliknięciu w tło
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Klawisze strzałek i Esc
  document.addEventListener("keydown", e => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") modal.classList.remove("active");
  });

});
