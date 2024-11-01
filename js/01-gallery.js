import { galleryItems } from "./gallery-items.js";

// Change code below this line
const listEl = document.querySelector(".gallery");
let currentInstance = null;

galleryItems.forEach((item) => {
  const listItemEl = document.createElement("li");
  listItemEl.classList.add("gallery__item");
  listItemEl.innerHTML = `
    <a class='gallery__link' href='${item.original}'>
      <img class='gallery__image' src='${item.preview}' data-source='${item.original}' alt='${item.description}'/>
    </a>
  `;
  listEl.append(listItemEl);
});

listEl.addEventListener("click", openImageInLightbox);

function openImageInLightbox(event) {
  const clickedOn = event.target;
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  currentInstance = basicLightbox.create(`
    <img width='1400' height='900' src='${clickedOn.dataset.source}'/>
  `);
  currentInstance.show();
}

document.addEventListener("keydown", (event) => {
  //eveniment pentru inchiderea imaginei la apasarea tastei escape
  if (event.key === "Escape" && currentInstance && currentInstance.visible()) {
    currentInstance.close();
    currentInstance = null;
  }
});
