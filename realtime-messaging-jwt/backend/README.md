# Realtime Messaging with JWT Authentication

This project is a real-time messaging application that utilizes WebSockets for instant communication and JSON Web Tokens (JWT) for user authentication. The application allows users to register, log in, and participate in chat rooms.

## Features

- User registration and login with JWT authentication.
- Real-time messaging using WebSockets.
- Chat rooms where users can join and communicate.
- Password hashing for secure user credentials.

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
│   │   ├── db.js            # Database connection handling
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

- Node.js
- MongoDB

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

3. Set up your MongoDB database and update the connection string in `utils/db.js`.

4. Start the backend server:
   ```
   node server.js
   ```

5. Navigate to the frontend directory and install dependencies (if any):
   ```
   cd ../frontend
   ```

6. Open `index.html` in your browser to access the chat application.

## Usage

- Register a new user by providing a username and password.
- Log in with your credentials to access chat rooms.
- Join a chat room and start messaging in real-time.

## License

This project is licensed under the MIT License.