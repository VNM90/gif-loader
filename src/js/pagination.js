const pagination = document.getElementById('pagination');
let itemsPerPage = 10
let currentPage = 0

export function displayPagination(totalResults, searchTerm, fetchAndDisplayImagesCallback ) {
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
      await fetchAndDisplayImagesCallback(searchTerm, offset);
    });

    pagination.appendChild(pageBtn);
  }
}

export function clearPagination() {
  pagination.innerHTML = '';
}