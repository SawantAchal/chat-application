document.addEventListener('DOMContentLoaded', () => {
    const authPage = document.getElementById('auth-page');
    const roomPage = document.getElementById('room-page');
    const chatRoomInterface = document.getElementById('chat-room-interface');
    const roomList = document.getElementById('room-list');
    const messageDisplay = document.getElementById('message-display');
    const roomName = document.getElementById('room-name');
  
    let socket;
    let username;
    let currentRoom;
  
    // Authentication
    document.getElementById('auth-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents form submission from refreshing the page
        username = document.getElementById('username').value.trim();
      
        if (username) {
          socket = new WebSocket('ws://localhost:8080');
          socket.onopen = () => {
            socket.send(JSON.stringify({ type: 'authenticate', username }));
          };
      
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'authenticated') {
              authPage.classList.add('hidden');
              roomPage.classList.remove('hidden');
              updateRoomList(data.rooms);
            }
          };
        }
      });
      
  
    // Create Room
    document.getElementById('create-room-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const newRoom = document.getElementById('new-room').value.trim();
      if (newRoom && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'create-room', room: newRoom }));
        document.getElementById('new-room').value = '';
      }
    });
  
    // Join Room
    roomList.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        currentRoom = e.target.textContent;
        socket.send(JSON.stringify({ type: 'join-room', room: currentRoom }));
        roomPage.classList.add('hidden');
        chatRoomInterface.classList.remove('hidden');
        roomName.textContent = `Room: ${currentRoom}`;
      }
    });
  
    // Send Message
    document.getElementById('message-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const message = document.getElementById('message-input').value.trim();
      if (message && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'message', text: message, room: currentRoom }));
        appendMessage('You', message, new Date().toLocaleTimeString());
        document.getElementById('message-input').value = '';
      }
    });
  
    // Handle Incoming Messages
    if (socket) {
    //   socket.onmessage = (event) => {
    //     const data = JSON.parse(event.data);
    //     if (data.type === 'message' && data.room === currentRoom) {
    //       appendMessage(data.username, data.text, data.timestamp);
    //     }
  
    //     if (data.type === 'rooms') {
    //       updateRoomList(data.rooms);
    //     }
    //   };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
      
        if (data.type === 'message') {
          displayMessage(data.username, data.message, data.timestamp);
        } else if (data.type === 'notification') {
          displayNotification(data.message);
        }
      };
      
      function displayMessage(username, message, timestamp) {
        const messageContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.innerHTML = `<strong>${username}</strong> [${new Date(timestamp).toLocaleTimeString()}]: ${message}`;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll
      }
      
      function displayNotification(message) {
        const messageContainer = document.getElementById('messages');
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.innerText = message;
        messageContainer.appendChild(notificationElement);
        messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll
      }
      
    }
  
    function updateRoomList(rooms) {
      roomList.innerHTML = '';
      rooms.forEach((room) => {
        const li = document.createElement('li');
        li.textContent = room;
        roomList.appendChild(li);
      });
    }
  
    function appendMessage(user, text, timestamp) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${user}</strong> <span>[${timestamp}]</span>: ${text}`;
      messageDisplay.appendChild(div);
      messageDisplay.scrollTop = messageDisplay.scrollHeight;
    }
  });
  
  document.getElementById('room-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('room')) {
      const roomName = e.target.innerText;
      joinRoom(roomName);
      roomPage.classList.add('hidden');
      chatPage.classList.remove('hidden');
    }
  });
  