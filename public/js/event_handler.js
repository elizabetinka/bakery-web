const notyf = new Notyf({
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: false
    },
    {
      type: 'info',
      background: '#3498db',
      icon: false
    }
  ]
});

function setupSSEConnection() {
  const eventSource = new EventSource('/notifications');

  eventSource.onopen = () => {
    console.log('SSE соединение установлено');
  };

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received", data);
   showNotification(data);
  };

  eventSource.onerror = () => {
    console.error('SSE connection error');
    setTimeout(setupSSEConnection, 5000);
  };
}

async function showNotification(data) {
  let message = '';
  let type = 'info';

  switch (data.type) {
    case 'ADD':
      message = `Торт "${data.data.name}" был добавлен`;
      type = 'success';
      break;
    case 'UPDATED':
      message = `Торт "${data.data.id}" был изменен`;
      type = 'info';
      break;
    case 'DELETED':
      message = `Торт с ID ${data.data.id} был удален`;
      type = 'warning';
      break;
    default:
      message = 'Произошло изменение в коллекции тортов';
      toastr.info(message);
  }
  console.log(message);

  notyf.open({
    type: type,
    message: message,
    duration: 3000
  });
}


document.addEventListener('DOMContentLoaded', () => {
  setupSSEConnection();
});
