import { fetchData } from './api.js';
import { displayImages } from './display.js';
import { displayPagination } from './pagination.js';
import { clearPagination } from './pagination.js';

const searchInput = document.getElementById('search-input');
const submitBtn = document.getElementById('submit-btn');
const imageContainer = document.getElementById('image-container');
const messageElement = document.getElementById('message');

submitBtn.addEventListener('click', async () => {
  clearPagination();
  const searchTerm = searchInput.value;
  await fetchAndDisplayImages(searchTerm, 0);
});

async function fetchAndDisplayImages(searchTerm, offset) {
  const apiURL = `https://api.giphy.com/v1/gifs/search?api_key=ctyRhySXP0KYCoiC6d37gQ8z96DrZ24A&q=${searchTerm}&limit=10&offset=${offset}&rating=g&lang=en`;

  try {
    const response = await fetchData(apiURL);
    console.log(response);

    if (response.pagination.total_count === 0) {
      messageElement.innerHTML = '<div class="alert alert-primary" role="alert">No results found for your search.</div>';
      imageContainer.innerHTML = '';
      return;
    }

    messageElement.innerText = '';
    imageContainer.innerHTML = '';
    displayImages(response.data, imageContainer);
    displayPagination(response.pagination.total_count, searchTerm, fetchAndDisplayImages);
  } catch (error) {
    console.error('Error:', error);
    messageElement.innerHTML = '<div class="alert alert-danger" role="alert">An error occurred. Please try again later.</div>';
  }
}


