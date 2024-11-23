// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// let rooms = {};
// let users = {};

// wss.on('connection', (ws) => {
//     console.log('A new client connected');
//   ws.on('message', (data) => {
//     const message = JSON.parse(data);

//     if (message.type === 'authenticate') {
//       users[ws] = message.username;
//       ws.send(JSON.stringify({ type: 'authenticated', rooms: Object.keys(rooms) }));
//     }

//     if (message.type === 'create-room') {
//       if (!rooms[message.room]) {
//         rooms[message.room] = [];
//       }
//       broadcastRooms();
//     }

//     if (message.type === 'join-room') {
//       if (!rooms[message.room]) rooms[message.room] = [];
//       rooms[message.room].push(ws);
//       ws.room = message.room;
//     }

//     if (message.type === 'message') {
//       const timestamp = new Date().toLocaleTimeString();
//       rooms[message.room].forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(
//             JSON.stringify({
//               type: 'message',
//               username: users[ws],
//               text: message.text,
//               room: message.room,
//               timestamp,
//             })
//           );
//         }
//       });
//     }
//   });

//   ws.on('close', () => {
//     const room = ws.room;
//     if (room && rooms[room]) {
//       rooms[room] = rooms[room].filter((client) => client !== ws);
//       if (rooms[room].length === 0) delete rooms[room];
//       broadcastRooms();
//     }
//     delete users[ws];
//   });

//   function broadcastRooms() {
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(JSON.stringify({ type: 'rooms', rooms: Object.keys(rooms) }));
//       }
//     });
//   }
// });

// socket = new WebSocket('ws://localhost:8080');
// socket.onopen = () => {
//   console.log('WebSocket connection established');
//   socket.send(JSON.stringify({ type: 'authenticate', username }));
// };

// socket.onmessage = (event) => {
//   console.log('Message received from server:', event.data);
//   const data = JSON.parse(event.data);
//   if (data.type === 'authenticated') {
//     console.log('User authenticated successfully');
//     authPage.classList.add('hidden');
//     roomPage.classList.remove('hidden');
//     updateRoomList(data.rooms);
//   }
// };


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Track rooms and their users
const rooms = {};

wss.on('connection', (ws) => {
  let currentRoom = null;
  let username = null;

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'authenticate') {
      username = data.username;
      ws.send(JSON.stringify({ type: 'authenticated', rooms: Object.keys(rooms) }));
    } else if (data.type === 'join-room') {
      currentRoom = data.room;
      if (!rooms[currentRoom]) {
        rooms[currentRoom] = [];
      }
      rooms[currentRoom].push(ws);

      // Notify other users in the room
      broadcastToRoom(currentRoom, {
        type: 'notification',
        message: `${username} has joined the room.`,
      });
    } else if (data.type === 'message') {
      // Broadcast the message to the room
      if (currentRoom) {
        broadcastToRoom(currentRoom, {
          type: 'message',
          username,
          message: data.message,
          timestamp: new Date().toISOString(),
        });
      }
    }
  });

  ws.on('close', () => {
    if (currentRoom && rooms[currentRoom]) {
      rooms[currentRoom] = rooms[currentRoom].filter((client) => client !== ws);

      // Notify other users in the room
      broadcastToRoom(currentRoom, {
        type: 'notification',
        message: `${username} has left the room.`,
      });

      // Clean up empty rooms
      if (rooms[currentRoom].length === 0) {
        delete rooms[currentRoom];
      }
    }
  });

  function broadcastToRoom(room, data) {
    if (rooms[room]) {
      rooms[room].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    }
  }
});
