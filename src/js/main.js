import * as bootstrap from 'bootstrap';
import { fetchData } from './api.js';
import { displayImages } from './display.js';
import { displayPagination } from './pagination.js';


const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');
const imageContainer = document.getElementById('image-container');

submitBtn.addEventListener('click', async () => {
  const searchTerm = searchInput.value;
  await fetchAndDisplayImages(searchTerm, 0);
});

async function fetchAndDisplayImages(searchTerm, offset) {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=ctyRhySXP0KYCoiC6d37gQ8z96DrZ24A&q=${searchTerm}&limit=10&offset=${offset}&rating=g&lang=en`;

  try {
    const response = await fetchData(apiURL);
    console.log(response);
    imageContainer.innerHTML = ''; // Clear the existing images
    displayImages(response.data, imageContainer);
    displayPagination(response.pagination.total_count, searchTerm, fetchAndDisplayImages);
  } catch (error) {
    console.error('Error:', error);
  }
}


