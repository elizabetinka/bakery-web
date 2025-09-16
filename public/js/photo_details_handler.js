function editItem(id){
  window.location.href = `/photos/${id}/edit`;
}

async function deleteItem(id){
  if (!confirm('Вы уверены, что хотите удалить эту фотографию')) {
    return;
  }

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {
    preloader.style.display = "block";
    const response = await fetch(`/api/photos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении');
    }
    preloader.style.display = "none";
    window.location.href = '/photo';
  } catch (error) {
    preloader.style.display = "none";
    console.log(error);
    errorMessage.textContent = "⚠ Что-то пошло не так. Попробуйте обновить страницу.";
  }
}

function onLoad() {
  setHandlers(editItem,deleteItem)
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
}
document.addEventListener("DOMContentLoaded",onLoad);