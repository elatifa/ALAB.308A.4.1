import * as Carousel from "./Carousel.js";
import { createCarouselItem, clear, appendCarousel, start } from './Carousel.js';
import axios from "axios";

const breedSelect = document.getElementById("breedSelect");
const infoDump = document.getElementById("infoDump");
const progressBar = document.getElementById("progressBar");
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

const API_KEY = "live_5p8QUa8BdRSpqcjqA2ZxqNxrRnHUYXbZT1JH0J5sTVWXxV3JyTi5kZ3TVYaaeVf0";

async function initialLoad() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        'x-api-key': API_KEY
      }
    });
    const data = response.data;
    data.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    breedSelect.addEventListener('change', async () => {
      const selectedBreed = breedSelect.value;
      try {
        const response = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed}&limit=5`, {
          headers: {
            'x-api-key': API_KEY
          }
        });
        const data = response.data;
        const carouselInner = document.getElementById('carousel-inner');
        carouselInner.innerHTML = '';
        data.forEach((image, index) => {
          const carouselItem = document.createElement('div');
          carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
          const imageElement = document.createElement('img');
          imageElement.src = image.url;
          carouselItem.appendChild(imageElement);
          carouselInner.appendChild(carouselItem);
        });

        infoDump.innerHTML = '';
        const breedInfo = document.createElement('p');
        breedInfo.textContent = `Selected breed: ${breedSelect.selectedOptions[0].text}`;
        infoDump.appendChild(breedInfo);
      } catch (error) {
        console.error("Error fetching breed images:", error);
      }
    });

  } catch (error) {
    console.error("Error loading initial data:", error);
  }
}

initialLoad();

export async function favourite(imgId) {
  try {
    const response = await axios.post('https://api.thecatapi.com/v1/favourites', {
      image_id: imgId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':"live_5p8QUa8BdRSpqcjqA2ZxqNxrRnHUYXbZT1JH0J5sTVWXxV3JyTi5kZ3TVYaaeVf0"
      }
    });
    console.log("Added to favourites:", response.data);
  } catch (error) {
    console.error("Error adding to favourites:", error);
  }
}