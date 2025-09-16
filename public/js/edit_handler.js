

async function addRequest(id,cakeData){

  console.log('редактирование данных:', cakeData);

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {
    preloader.style.display = "block";
    const response =  await fetch(`/api/cakes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cakeData)
    });

    if (!response.ok) {
      throw new Error('Ошибка при редактировании');
    }
    preloader.style.display = "none";
    window.location.href = '/';
  } catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

async function validate(){
  document.getElementById('nameError').textContent = '';
  document.getElementById('priceError').textContent = '';
  let isValid = true;
  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);

  if (!name) {
    document.getElementById('nameError').textContent = 'Название обязательно';
    isValid = false;
  }

  if (isNaN(price)) {
    document.getElementById('priceError').textContent = 'Введите корректную цену';
    isValid = false;
  } else if (price < 0) {
    document.getElementById('priceError').textContent = 'Цена не может быть отрицательной';
    isValid = false;
  }

  const itemDetails = document.querySelector('.form-body');
  const cakeId = itemDetails.dataset.id;

  let cakeImage = '';

  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    cakeImage = await downloadFile(file);
  }

  if (isValid) {
    const cakeData = {
      name: name,
      description: document.getElementById('description').value.trim(),
      image: cakeImage,
      price: price,
      isAvailable: document.getElementById('isAvailable').checked
    };

    addRequest(cakeId,cakeData)
  }
}


async function downloadFile(file){
  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");

  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/storage/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    preloader.style.display = "none";
    console.log('Результат загрузки:', result);
    return result.url;
  } catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

function setHandlers(fileHandler){
  document.getElementById('cakeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    validate();
  })

}


async function onLoad() {
  setHandlers()
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
}
document.addEventListener("DOMContentLoaded",onLoad);