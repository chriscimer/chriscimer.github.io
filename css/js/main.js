document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("modal");
  const modalContent = modal.querySelector(".modal-content");
  const closeBtn = modal.querySelector(".close");

  const images = document.querySelectorAll(".gallery img[data-series]");

  images.forEach(img => {
    img.addEventListener("click", () => {
      const series = img.dataset.series;

      modalContent.innerHTML = "";

      document
        .querySelectorAll(`.gallery img[data-series="${series}"]`)
        .forEach(item => {
          const clone = item.cloneNode(true);
          modalContent.appendChild(clone);
        });

      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

});
