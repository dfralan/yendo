// Initialize Gun instance
const gun = Gun();

// Replace 'user123' with the actual user ID
const user = gun.user().recall({ sessionStorage: true }) || gun.user().create().recall({ sessionStorage: true });

// Get references to DOM elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to send a message
function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') return;

  // Store the message using Gun's put() function
  const messageId = gun.get('chat-room').get(user.is.pub).get(Date.now()).put({
    sender: user.is.pub,
    content: message,
    timestamp: Date.now()
  });

  // Clear the input field
  messageInput.value = '';
}

// Event listener for the Send button
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key in the message input
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Function to display a message in the chat box
function displayMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = `${message.sender}: ${message.content}`;
  chatBox.appendChild(messageDiv);
}

// Function to listen for new messages in the chat room
function listenForMessages() {
  gun.get('chat-room').get(user.is.pub).on((message, messageId) => {
    displayMessage(message);
  });
}

// Start listening for new messages
listenForMessages();
