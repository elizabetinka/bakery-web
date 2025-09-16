function editItem(id){
  window.location.href = `/cakes/edit/${id}`;
}

async function deleteItem(id){
  if (!confirm('Вы уверены, что хотите удалить этот торт?')) {
    return;
  }

  const preloader = document.getElementById("preloader");
  const errorMessage = document.getElementById("error-message");
  try {
    preloader.style.display = "block";
    const response = await fetch(`/api/cakes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении');
    }
    preloader.style.display = "none";
    window.location.href = '/';
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