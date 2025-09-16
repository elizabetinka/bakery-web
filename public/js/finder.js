
function renderCatalog(cakesToShow) {
    catalog.innerHTML = ""; 
  
    cakesToShow.forEach(cake => {
      const cakeElement = document.createElement('div');
      cakeElement.classList.add('catalog_card');
      cakeElement.innerHTML = `
      <div class="catalog_card_photo"><img src="${cake.image}" alt="${cake.name}" class="catalog_card_photo_img"></div>
      <div class="catalog_card_details">
          <div class="catalog_card_details_name">${cake.name}</div>
          <div class="catalog_card_details_price">${cake.price}</div>
      </div>
    `;
    catalog.appendChild(cakeElement);
    });
  }


  let but = document.querySelector(".search-filter_button")
  if (but) {
  but.addEventListener("click", async () => {
    const searchInput = document.querySelector(".search-filter_input").value.toLowerCase();

    // let filteredCakes = cakes.filter(cake =>
    //   cake.name.toLowerCase().includes(searchInput)
    // );
    // if (searchInput==""){
    //   filteredCakes =cakes;
    // }

    let filteredCakes = await search(searchInput);

    console.log(searchInput);
    console.log(filteredCakes);

    document.querySelector(".search-filter_input").value = ""
    pageButtons.forEach(button => button.classList.remove('pagination_button__active'));

    renderCatalog(filteredCakes);
  });
}


