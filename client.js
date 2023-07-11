document.querySelector("#chat-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const inputField = e.target.elements.userInput;
    const userText = inputField.value;
    inputField.value = '';
    updateChat('user', userText);
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: userText })
    }).then(response => response.json())
      .then(data => updateChat('bot', data))
      .catch((error) => {
        console.error('Error:', error);
      });
});

function updateChat(role, text) {
    const chat = document.querySelector('.chat');
    chat.innerHTML += `<div class="${role}">${text}</div>`;
    chat.scrollTop = chat.scrollHeight;
}
