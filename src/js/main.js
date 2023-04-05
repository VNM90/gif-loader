import * as bootstrap from 'bootstrap';
import { fetchData } from './api.js';
import { displayImages } from './display.js';

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
    displayImages(response.data, imageContainer);
    displayPagination(response.pagination.total_count, searchTerm);
  } catch (error) {
    console.error('Error:', error);
  }
}

let itemsPerPage = 10
let currentPage = 0

function displayPagination(totalResults, searchTerm) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const maxPagesToShow = Math.min(totalPages, 10);
  pagination.innerHTML = '';

  for (let i = 0; i < maxPagesToShow; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerText = i + 1;
    pageBtn.classList.add('page-btn');
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }

    pageBtn.addEventListener('click', async () => {
      currentPage = i;
      const offset = currentPage * itemsPerPage;
      await fetchAndDisplayImages(searchTerm, offset);
    });

    pagination.appendChild(pageBtn);
  }
}
