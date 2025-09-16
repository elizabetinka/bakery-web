function getMaxAgeFromCacheControl(cacheControl) {
  if (!cacheControl) return null;
  const match = cacheControl.match(/max-age=(\d+)/);
  return match ? parseInt(match[1], 10) * 1000 : null; // Переводим в миллисекунды
}

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

async function getData(url) {

    console.log("load cakes",url);

    const hash = await sha256(url);

    let cache = JSON.parse(sessionStorage.getItem(hash)) || {
      etag: null,
      data: null,
      timestamp: null,
      maxAge: null,
    };

    console.log("cache", cache);

    if (cache.maxAge && Date.now() - cache.timestamp < cache.maxAge) {
      console.log('Используем кэшированные данные');
      return cache.data;
    }

    let response
    if (cache.etag){
      response = await  fetch(url, {
        method: 'GET',
        headers: {
          'If-None-Match': cache.etag,
        }
      });
      console.log("If-None-Match", cache.etag);
    }
    else{
      response = await  fetch(url);
      console.log("new request ");
    }

    if (response.status === 200) {

      for (const [name, value] of response.headers) {
        console.log(`${name}: ${value}`);
      }

      cache.data = await response.json();
      cache.etag = response.headers.get('etag');
      console.log('Используем новые данные');

      const cacheControl = response.headers.get('cache-control');
      //cache.maxAge = getMaxAgeFromCacheControl(cacheControl);

    } else if (response.status === 304) {
      console.log('Кэш продлён (304 Not Modified)');
    }
    else{
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    cache.timestamp = Date.now();
    sessionStorage.setItem( hash, JSON.stringify(cache));
    return cache.data;
}


async function loadCakes(url) {
  if (!url) {
    url = `/api/cakes?page=${currentPage}&limit=${itemsPerPage}`
  }

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {

    data = await getData(url);
    const links = parseLinkHeader(data.links);
    cakes = data.data.map(item => ({
      id: item.id,
      name: item.name,
      price: `${item.price.slice(0, -3)} р/кг`,
      image: item.image,
    }));
    preloader.style.display = "none";

    updatePage(cakes,links,data.total,loadCakes)
  }
  catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

async function clickCake(id){
  console.log("clickCake", id);
  window.location.href = `/cakes/by/${id}`
}

function addButtonTapped(){
  window.location.href = '/cakes/add';
}

async function onLoad() {
  await loadCakes()
  setCatalogHandler(clickCake)
  setAddHandler(addButtonTapped)
}
document.addEventListener("DOMContentLoaded",onLoad);


async function search(pattern) {

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {
    console.log(`/api/cakes/search?pattern=${encodeURIComponent(pattern)}`);
    const response = await fetch(`/api/cakes/search?pattern=${encodeURIComponent(pattern)}`);
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
