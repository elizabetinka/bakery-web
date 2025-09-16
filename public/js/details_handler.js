function setHandlers(editDelegat,deleteDelegat){
  const itemDetails = document.querySelector('.item-details');
  const cakeId = itemDetails.dataset.id;

  const editBtn = itemDetails.querySelector('.edit-btn');

  editBtn.addEventListener('click', function(e) {
    editDelegat(cakeId);
  });

  const deleteBtn = itemDetails.querySelector('.delete-btn');

  deleteBtn.addEventListener('click', function(e) {
    deleteDelegat(cakeId);
  });

}

