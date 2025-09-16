const currentLocation = window.location.pathname;

const itemsPerPage = 8;
const buttonsPerPage = 5;
let currentPage = 1;

const catalog = document.querySelector('.catalog');
let prevPageButton = document.getElementById('prevPage');
let nextPageButton = document.getElementById('nextPage');
let  pageButtons = [];
const paginationContainer = document.querySelector(".pagination");

function renderCakes(page, cakes) {
  catalog.innerHTML = '';

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const cakesToDisplay = cakes.slice(startIndex, endIndex);

  cakesToDisplay.forEach((cake) => {
    const cakeElement = document.createElement('div');
    cakeElement.classList.add('catalog_card');
    cakeElement.dataset.id = cake.id;
    cakeElement.innerHTML = `
            <div class="catalog_card_photo"><img src="${cake.image}" alt="${cake.name}" class="catalog_card_photo_img"></div>
        `;
    if (!currentLocation.endsWith('photo')) {
      cakeElement.innerHTML += `<div class="catalog_card_details">
                <div class="catalog_card_details_name">${cake.name}</div>
                <div class="catalog_card_details_price">${cake.price}</div>
            </div>`;
    }
    //cakeElement.innerHTML += `<button class="delete-btn" style="display: none">Удалить</button>`;
    catalog.appendChild(cakeElement);
  });

  updatePagination(page, cakes);
}

function renderPaginationButtons(cakes) {
  paginationContainer.innerHTML = ''; // Очищаем пагинацию

  const pagesCount = Math.ceil(cakes.length / itemsPerPage);

  // Создание кнопки "Назад"
  const prevButton = document.createElement('a');
  prevButton.href = '#';
  prevButton.id = `prevPage`;
  prevButton.classList.add('pagination_button');
  prevButton.innerHTML = '&laquo;';
  paginationContainer.appendChild(prevButton);
  prevPageButton = prevButton;

  pageButtons.length = 0;

  let start = Math.max(currentPage - 1, 1);

  // Создание кнопок страниц
  for (
    let i = start;
    i <= Math.min(start + buttonsPerPage - 1, pagesCount);
    i++
  ) {
    const pageButton = document.createElement('a');
    pageButton.href = '#';
    pageButton.id = `page${i}`;
    pageButton.classList.add('pagination_button');
    // if (i === currentPage) {
    //     pageButton.classList.add("pagination_button__active");
    // }
    pageButton.textContent = i;
    paginationContainer.appendChild(pageButton);
    pageButtons.push(pageButton);
  }

  // Создание кнопки "Вперёд"
  const nextButton = document.createElement('a');
  nextButton.href = '#';
  nextButton.id = `nextPage`;
  nextButton.classList.add('pagination_button');
  nextButton.innerHTML = '&raquo;';
  paginationContainer.appendChild(nextButton);
  nextPageButton = nextButton;

  // pageButtons = document.querySelectorAll('.pagination_button');

  pageButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const page = parseInt(e.target.innerText);
      currentPage = page;
      updatePage(cakes);
    });
  });

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage(cakes);
    }
  });

  nextPageButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(cakes.length / itemsPerPage)) {
      currentPage++;
      updatePage(cakes);
    }
  });
}

function updatePagination(page,cakes) {
    pageButtons.forEach(button => button.classList.remove('pagination_button__active'));
    document.getElementById(`page${page}`).classList.add('pagination_button__active');

    prevPageButton.style.display = page === 1 ? 'none' : 'inline-block';
    nextPageButton.style.display = page === Math.ceil(cakes.length / itemsPerPage) ? 'none' : 'inline-block';
}

function updatePage(cakes) {
  console.log(`currentLocation ${currentLocation}`)
    if (cakes.length !=0 ){
        console.log(currentPage);
        renderPaginationButtons(cakes);
        renderCakes(currentPage, cakes);
    }
    console.log(`updated Page cakes ${cakes.length}`);
    if (delegate){
      setCatalogHandler(delegate)
    }
}

let delegate
function setCatalogHandler(onClick){
  delegate = onClick
  const cards = document.querySelectorAll('.catalog_card')
  cards.forEach(card => {
    const itemId = card.dataset.id;
    card.addEventListener('click', () => {onClick(itemId)});
  });
}

function setAddHandler(addButtonTapped){
  let but = document.querySelector(".add-button")
  if (but) {
    but.addEventListener("click", () => {
      addButtonTapped()
    });
}}
