//
// async function loadPastry() {
//   const preloader = document.getElementById("preloader");
//   const errorMessage = document.getElementById("error-message");
//   try {
//     const response = await  fetch('/api/pastries',
//       {
//         headers: {
//           'Accept': 'application/json' // Явно просим JSON
//         }});
//
//     if (!response.ok) { // Проверяем статус ответа
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     cakes = data.map(item => ({
//       id: item.id,
//       name: item.name,
//       price: `${item.price.slice(0,-3)} р/шт`,
//       image: item.image,
//     }));
//     preloader.style.display = "none";
//     updatePage(cakes)
//   }
//   catch (error) {
//     preloader.style.display = "none";
//     console.log(error);
//     errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
//   }
// }

async function loadPastry(url) {
  if (!url) {
    url = `/api/pastries?page=${currentPage}&limit=${itemsPerPage}`
  }
  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {
    const response = await  fetch(url);

    if (!response.ok) { // Проверяем статус ответа
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`response ${data}`);
    cakes = data.data.map(item => ({
      id: item.id,
      name: item.name,
      price: `${item.price.slice(0, -3)} р/шт`,
      image: item.image,
    }));
    const links = parseLinkHeader(response.headers.get('Link'));
    console.log("links", links);
    preloader.style.display = "none";

    updatePage(cakes,links,data.total,loadPastry)
  }
  catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

async function clickPastry(id){
  console.log("clickPastry", id);
  window.location.href = `/pastries/${id}`
}

async function onLoad() {
  await loadPastry()
  setCatalogHandler(clickPastry)
}
document.addEventListener("DOMContentLoaded",onLoad);


async function search(pattern) {

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");

  try {
    console.log(pattern);
    console.log(`/api/pastries/search?pattern=${encodeURIComponent(pattern)}`);
    const response = await fetch(`/api/pastries/search?pattern=${encodeURIComponent(pattern)}`);
    const result = await response.json();
    preloader.style.display = "none";

    return result.data;
  }
  catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}
