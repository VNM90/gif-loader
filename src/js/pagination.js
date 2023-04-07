const pagination = document.getElementById('pagination');
let itemsPerPage = 10
let currentPage = 0

export function displayPagination(totalResults, searchTerm, fetchAndDisplayImagesCallback ) {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const maxPagesToShow = Math.min(totalPages, 10);
  pagination.innerHTML = '';

  for (let i = 0; i < maxPagesToShow; i++) {
    const paginationBtn = document.createElement('button');
    paginationBtn.innerText = i + 1;
    paginationBtn.classList.add('pagination-btn', 'btn', 'btn-outline-secondary', 'my-2', 'mx-1');
    if (i === currentPage) {
      paginationBtn.classList.add('active');
    }

    paginationBtn.addEventListener('click', async () => {
      currentPage = i;
      const offset = currentPage * itemsPerPage;
      await fetchAndDisplayImagesCallback(searchTerm, offset);
    });

    pagination.appendChild(paginationBtn);
  }
}

export function clearPagination() {
  pagination.innerHTML = '';
}