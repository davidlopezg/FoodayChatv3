// script.js

// Manejo del cambio de tema
const toggleThemeButton = document.getElementById('toggle-theme');
const body = document.body;
const icon = toggleThemeButton.querySelector('i');

toggleThemeButton.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  body.classList.toggle('dark-mode');
  icon.classList.toggle('fa-sun');
  icon.classList.toggle('fa-moon');
});

// Establecer el modo oscuro por defecto
body.classList.add('dark-mode');
icon.classList.add('fa-sun');

// Manejo del chat
const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  // Mostrar el mensaje del usuario
  appendMessage('user', message);
  messageInput.value = '';

  // Enviar el mensaje al webhook de Make
  fetch('https://hook.make.com/tu-webhook', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mensaje: message })
  })
  .then(response => response.json())
  .then(data => {
    // Mostrar la respuesta del chat
    appendMessage('bot', data.respuesta);
  })
  .catch(error => {
    console.error('Error:', error);
    appendMessage('bot', 'Hubo un error al procesar tu mensaje.');
  });
}

function appendMessage(sender, text) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);
  messageElement.innerHTML = `<p>${text}</p>`;
  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
