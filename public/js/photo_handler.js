// async function loadPhotos() {
//   const preloader = document.getElementById("preloader");
//   const errorMessage = document.getElementById("error-message");
//   try {
//     const response = await  fetch('/api/photos',
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

async function loadPhotos(url) {
  if (!url) {
    url = `/api/photos?page=${currentPage}&limit=${itemsPerPage}`
    console.log("нет url")
  }
  console.log(url)
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
      image: item.image,
    }));
    const links = parseLinkHeader(response.headers.get('Link'));
    console.log("links", links);
    preloader.style.display = "none";

    updatePage(cakes,links,data.total,loadPhotos)
  }
  catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

async function clickPhoto(id){
  console.log("clickPhoto", id);
  window.location.href = `/photos/${id}`
}

async function onLoad() {
  await loadPhotos()
  setCatalogHandler(clickPhoto)
}
document.addEventListener("DOMContentLoaded",onLoad);
