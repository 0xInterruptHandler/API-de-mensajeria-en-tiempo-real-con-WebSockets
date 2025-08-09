# Realtime Messaging with JWT Authentication

This project is a real-time messaging application that utilizes WebSockets for communication and JSON Web Tokens (JWT) for user authentication. Below is an overview of the project structure and how to set it up.

## Project Structure

```
realtime-messaging-jwt
├── backend
│   ├── Controllers
│   │   └── Auth.js          # Handles user registration and login
│   ├── Models
│   │   ├── habitacion.js    # Mongoose schema for chat rooms
│   │   ├── mensaje.js       # Mongoose schema for messages
│   │   └── usuario.js       # Mongoose schema for users
│   ├── Routes
│   │   └── Auth.js          # Routes for user authentication
│   ├── utils
│   │   ├── db.js            # Database connection utility
│   │   ├── messages.js      # Message formatting utility
│   │   └── users.js         # User management utility
│   ├── server.js            # Entry point for the backend application
│   ├── generador.sh         # Shell script for generating project structure
│   └── README.md            # Documentation for the backend
├── frontend
│   ├── chat.html            # Chat interface for users
│   ├── index.html           # Homepage for the chat application
│   ├── css
│   │   └── style.css        # Styles for the frontend application
│   ├── img
│   │   └── icon.png         # Icon used in the frontend application
│   ├── js
│   │   └── client.js        # Client-side logic for WebSocket connection
│   └── README.md            # Documentation for the frontend
└── README.md                # Overall documentation for the project
```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd realtime-messaging-jwt
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Set up the database connection in `utils/db.js` with your MongoDB URI.

4. Start the backend server:
   ```
   node server.js
   ```

5. Navigate to the frontend directory and install dependencies (if any):
   ```
   cd ../frontend
   ```

6. Open `index.html` in your web browser to access the chat application.

### Features

- User registration and login using JWT for authentication.
- Real-time messaging using WebSockets.
- Chat rooms for users to join and communicate.

### Usage

- Users can register and log in to access the chat rooms.
- Once logged in, users can join a chat room and start sending messages in real-time.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.