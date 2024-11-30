# Real-Time Chat Platform

This is a real-time chat platform built using **HTML**, **CSS**, **JavaScript**, and **WebSockets**. The application allows users to join chat rooms, exchange messages in real-time, and experience a seamless chat interface.

---

## Features

### User Interface
- Intuitive and visually appealing chat interface.
- A list of available chat rooms to select from.
- A message display area with timestamps and usernames.
- Responsive design for various screen sizes.

### Real-Time Communication
- Real-time messaging using WebSocket technology.
- Users can join chat rooms and see messages updated in real-time.
- Notifications for users joining or leaving a room.

### Chat Features
- Send and display text messages in chat rooms.
- Timestamp messages and display the sender's username.
- Support for basic text formatting (e.g., bold, italics, and links).

### Room Management
- Create and join chat rooms dynamically.
- Display a list of all available rooms.
- Notifications when users join or leave a room.

### User Experience
- Smooth scrolling for messages.
- Handle edge cases like empty messages and invalid room selection.

---

## Project Structure

├── index.html      # Main HTML file

├── styles.css      # Styling for the application

├── script.js       # Client-side JavaScript for real-time communication

├── server.js       # WebSocket server for handling chat rooms

├── README.md       # Project documentation
\`\`\`

---

## How to Run

### Prerequisites
- Node.js installed on your system.

### Steps to Run
1. Clone this repository:
   \`\`\`bash
   git clone (https://github.com/SawantAchal/chat-application.git)
   cd <repository-directory>
   \`\`\`

2. Install dependencies (if any):
   \`\`\`bash
   npm install
   \`\`\`

3. Start the WebSocket server:
   \`\`\`bash
   node server.js
   \`\`\`

4. Open \`index.html\` in your browser:
   - Use \`Live Server\` in your code editor or manually open the file.

5. Open multiple browser tabs/windows and test the chat functionality by joining the same room.

---

## Usage

1. Open the application.
2. Choose a username and click **Authenticate**.
3. Select or create a chat room.
4. Start sending messages in real-time with other users in the same room.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, WebSocket
- **Real-Time Communication**: WebSocket Protocol

---

## Future Enhancements

- Implement persistent storage for messages and chat rooms using a database.
- Add user avatars and typing indicators.
- Secure WebSocket connections using SSL/TLS.
- Enhance message formatting with emoji and multimedia support.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
" > README.md
