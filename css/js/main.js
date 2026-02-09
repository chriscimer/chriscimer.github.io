// PORTFOLIO MODAL
const galleryImages = document.querySelectorAll('.gallery img');
const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');
const closeBtn = modal.querySelector('.close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    const series = img.dataset.series;
    const relatedImages = document.querySelectorAll(`.gallery img[data-series="${series}"]`);
    
    modalContent.innerHTML = ''; // czyści poprzednie zdjęcia
    relatedImages.forEach(relImg => {
      const clone = relImg.cloneNode();
      modalContent.appendChild(clone);
    });
    
    modal.style.display = 'block';
  });
});

// zamknięcie modala
closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => {
  if(e.target == modal) modal.style.display = 'none';
};

