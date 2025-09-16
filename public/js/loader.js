const preloader = document.getElementById("preloader");
const photosContainer = document.getElementById("catalog");
const errorMessage = document.getElementById("error-message");

function getRandomFilter() {
    return Math.random() > 0.5 ? { startId: 100, endId: 200 } : { startId: 1, endId: 50 };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPhotos() {

    photosContainer.innerHTML = "";
    errorMessage.textContent = "";

    const { startId, endId } = getRandomFilter();
    const url = `https://jsonplaceholder.typicode.com/photos?_start=${startId}&_end=${endId}`;

    try {
        //await sleep(2000);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }

        const photos = await response.json();
        preloader.style.display = "none";
        renderPhotos(photos);

    } catch (error) {

        preloader.style.display = "none";
        errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
        console.error(error);
    }
}

function renderPhotos(photo) {
    if (photo.length === 0) {
        photosContainer.innerHTML = "<p>Нет данных для отображения.</p>";
        return;
    }
    console.log(photos);

    photos.length=0;

    photo.forEach((ph) => {
        photos.push({ name: ph.title, price: "", image: ph.thumbnailUrl });
    });
    console.log(photos);
    updatePage()
}

document.addEventListener("DOMContentLoaded", fetchPhotos);
