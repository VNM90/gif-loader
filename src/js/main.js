import * as bootstrap from 'bootstrap';
import { fetchData } from './api.js';

const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');
const imageContainer = document.getElementById('image-container');

submitBtn.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=ctyRhySXP0KYCoiC6d37gQ8z96DrZ24A&q=${searchTerm}&limit=10&offset=0&rating=g&lang=en`;
  
    try {
      const response = await fetchData(apiURL);
      console.log(response);
      displayImages(response.data)

    } catch (error) {
      console.error('Error in main.js:', error);
    }
  });

function displayImages(imageData) {
imageContainer.innerHTML = '';

imageData.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.images.fixed_width.url;
    imgElement.alt = image.title;
    imageContainer.appendChild(imgElement);
});
}