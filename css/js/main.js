document.addEventListener("DOMContentLoaded", () => {

const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentImages = [];
let currentIndex = 0;

// klik na zdjęcie portfolio
document.querySelectorAll("#portfolio .gallery img").forEach((img, index) => {
  img.addEventListener("click", () => {
    const series = img.dataset.series;

    currentImages = Array.from(
      document.querySelectorAll(
        `#portfolio .gallery img[data-series="${series}"]`
      )
    ).map(el => el.src);

    currentIndex = currentImages.indexOf(img.src);
    openModal();
  });
});

function openModal() {
  modalContent.innerHTML = "";
  const image = document.createElement("img");
  image.src = currentImages[currentIndex];
  modalContent.appendChild(image);
  modal.classList.add("active");
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  openModal();
}

function showPrev() {
  currentIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  openModal();
}

if (nextBtn) nextBtn.addEventListener("click", showNext);
if (prevBtn) prevBtn.addEventListener("click", showPrev);
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", e => {
  if (e.target === modal) modal.classList.remove("active");
});

document.addEventListener("keydown", e => {
  if (!modal.classList.contains("active")) return;
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "Escape") modal.classList.remove("active");
});
<div style="display:none;">
  <!-- Seria kuchni 1 -->
  <img src="./images/kitchen1_2.jpg" data-series="kitchen1">
  <img src="./images/kitchen1_3.jpg" data-series="kitchen1">
  <img src="./images/kitchen1_4.jpg" data-series="kitchen1">

  <!-- Seria kuchni 2 -->
  <img src="./images/kitchen2_2.jpg" data-series="kitchen2">
  <img src="./images/kitchen2_3.jpg" data-series="kitchen2">
  <img src="./images/kitchen2_4.jpg" data-series="kitchen2">
  
  <!-- Seria kuchni 3 -->
  <img src="./images/kitchen1_2.jpg" data-series="kitchen1">
  <img src="./images/kitchen1_3.jpg" data-series="kitchen1">
  <img src="./images/kitchen1_4.jpg" data-series="kitchen1">

  <!-- Seria kuchni 4 -->
  <img src="./images/kitchen2_2.jpg" data-series="kitchen2">
  <img src="./images/kitchen2_3.jpg" data-series="kitchen2">
  <img src="./images/kitchen2_4.jpg" data-series="kitchen2">
</div>
  });
