import { galleryItems } from "./gallery-items.js";

// Change code below this line
const listEl = document.querySelector(".gallery");
let currentInstance = null;
let currentIndex = 0;

galleryItems.forEach((item, index) => {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("gallery__item");
  listItemEl.innerHTML = `
    <a class='gallery__link' href='${item.original}'>
      <img class='gallery__image' src='${item.preview}' data-source='${item.original}' alt='${item.description}' data-index='${index}'/>
    </a>
  `;
  listEl.append(listItemEl);
});

listEl.addEventListener("click", openImageInLightbox);

function openImageInLightbox(event) {
  const clickedOn = event.target;
  if (clickedOn.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  currentIndex = parseInt(clickedOn.dataset.index, 10);
  openLightbox(currentIndex);
}

function openLightbox(index) {
  const item = galleryItems[index];
  currentInstance = basicLightbox.create(`
    <div class="modal">
      <button class="arrow left-arrow">&#10094;</button>
      <img width='1400' height='900' src='${item.original}'/>
      <button class="arrow right-arrow">&#10095;</button>
    </div>
  `);
  currentInstance.show();

  document
    .querySelector(".left-arrow")
    .addEventListener("click", showPreviousImage);
  document
    .querySelector(".right-arrow")
    .addEventListener("click", showNextImage);
  document.addEventListener("keydown", handleKeyDown);
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  currentInstance.close();
  openLightbox(currentIndex);
} //functie pentru imaginea anterioara

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  currentInstance.close();
  openLightbox(currentIndex);
} //functie pentru a arata urmatoarea imagine

function handleKeyDown(event) {
  if (event.key === "Escape") {
    closeAllInstances();
  } else if (event.key === "ArrowRight") {
    showNextImage();
  } else if (event.key === "ArrowLeft") {
    showPreviousImage();
  }
} //functie pentru inchiderea imaginii la apasarea tastei escape

function closeAllInstances() {
  if (currentInstance) {
    currentInstance.close();
    currentInstance = null;
    document.removeEventListener("keydown", handleKeyDown);
  }
} //functie pentru a inchide toate instantele
