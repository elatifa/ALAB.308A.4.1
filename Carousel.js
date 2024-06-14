import * as bootstrap from "bootstrap";
import { favourite } from "./index.js";

export function createCarouselItem(imgSrc, imgAlt, imgId, isFavourite) {
  const template = document.querySelector("#carouselItemTemplate");
  const clone = template.content.firstElementChild.cloneNode(true);
  const img = clone.querySelector("img");
  img.src = imgSrc;
  img.alt = imgAlt;
  const favBtn = clone.querySelector(".favourite-button");
  favBtn.addEventListener("click", () => {
    favourite(imgId, isFavourite);
  });
  if (isFavourite) {
    favBtn.classList.add("favourited");
  } else {
    favBtn.classList.remove("favourited");
  }
  return clone;
}

export function clear() {
  const carousel = document.querySelector("#carouselInner");
  while (carousel.firstChild) {
    carousel.removeChild(carousel.firstChild);
  }
}

export function appendCarousel(element) {
  const carousel = document.querySelector("#carouselInner");
  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) element.classList.add("active");
  carousel.appendChild(element);
}

export function start() {
  const multipleCardCarousel = document.querySelector("#carouselExampleControls");
  if (window.matchMedia("(min-width: 768px)").matches) {
    const carousel = new bootstrap.Carousel(multipleCardCarousel, {
      interval: false
    });
    const carouselWidth = $(".carousel-inner")[0].scrollWidth;
    const cardWidth = $(".carousel-item").width();
    let scrollPosition = 0;
    $("#carouselExampleControls .carousel-control-next").unbind();
    $("#carouselExampleControls .carousel-control-next").on("click", function() {
      if (scrollPosition < carouselWidth - cardWidth * 4) {
        scrollPosition += cardWidth;
        $("#carouselExampleControls .carousel-inner").animate({
          scrollLeft: scrollPosition
        }, 600);
      }
    });
    $("#carouselExampleControls .carousel-control-prev").unbind();
    $("#carouselExampleControls .carousel-control-prev").on("click", function() {
      if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $("#carouselExampleControls .carousel-inner").animate({
          scrollLeft: scrollPosition
        }, 600);
      }
    });
  } else {
    $(multipleCardCarousel).addClass("slide");
  }
}
export function getFavourites() {
  axios.get('(link unavailable)', {
    headers: {
      'x-api-key': "live_5p8QUa8BdRSpqcjqA2ZxqNxrRnHUYXbZT1JH0J5sTVWXxV3JyTi5kZ3TVYaaeVf0"
    }
  })
  .then(response => {
    const favourites = response.data;
    clear();
    favourites.forEach(favourite => {
      const imgSrc = favourite.image.url;
      const imgAlt = favourite.image.alt;
      const imgId = 'https://api.thecatapi.com/v1/images/search?limit=10;'
      const isFavourite = true;
      const carouselItem = createCarouselItem(imgSrc, imgAlt, imgId, isFavourite);
      appendCarousel(carouselItem);
    });
  })
  .catch(error => {
    console.error(error);
  });
}
const getFavouritesBtn = document.getElementById('getFavouritesBtn');
getFavouritesBtn.addEventListener('click', getFavourites);

export function bindEvents() {
  const getFavouritesBtn = document.getElementById('getFavouritesBtn');
  getFavouritesBtn.addEventListener('click', getFavourites);
}
