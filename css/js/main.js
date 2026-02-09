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
  <!-- Seria livingroom1 -->
  <img src="./images/kitchen1_2.jpg" data-series="livingroom1">
  <img src="./images/kitchen1_3.jpg" data-series="livingroom1">
  <img src="./images/kitchen1_4.jpg" data-series="livingroom1">

  <!-- Seria kitchen01 -->
  <img src="./images/kitchen walnut_ kuchnia orzech amerykanski_chris cimer_2.jpg" data-series="kitchen01">
  <img src="./images/kitchen walnut_ kuchnia orzech amerykanski_chris cimer_3.jpg" data-series="kitchen01">
  <img src="./images/kitchen walnut_ kuchnia orzech amerykanski_chris cimer_4.jpg" data-series="kitchen01">
  
  <!-- Seria kitchen04 -->
  <img src="./images/05_classic bespoke kitchen in a London Victorian townhouse_ovens with pie inside_chris cimer.png" data-series="kitchen04">
  <img src="./images/07__classic bespoke kitchen in a London Victorian townhouse_hob with cooker _chris cimer.png" data-series="kitchen04">
  <img src="./images/09_classic bespoke kitchen in a London Victorian townhouse_hob with cooker _chris cimer.png" data-series="kitchen04">
  <img src="./images/04_classic bespoke kitchen in a London Victorian townhouse_sink zoom with rose inside_chris cimer.png" data-series="kitchen04">
  <img src="./images/01___siedzisko_classic bespoke kitchen in a London Victorian townhouse_hob with cooker _chris cimer.png" data-series="kitchen04">
                         

  <!-- Seria kitchen03 -->
  <img src="./images/kitchen2_2.jpg" data-series="kitchen03">
  <img src="./images/kitchen2_3.jpg" data-series="kitchen03">
  <img src="./images/kitchen2_4.jpg" data-series="kitchen03">
</div>
  });
