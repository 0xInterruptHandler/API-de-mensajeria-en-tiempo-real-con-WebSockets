# Realtime Messaging with JWT Authentication

This project implements a real-time messaging application using WebSockets and JWT (JSON Web Tokens) for user authentication. The application allows users to register, log in, and participate in chat rooms.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### Backend

The backend is built with Node.js and Express, and it handles user authentication, message storage, and real-time communication.

- **Controllers**
  - `Auth.js`: Contains functions for user registration and login, utilizing bcrypt for password hashing and JWT for token generation.

- **Models**
  - `habitacion.js`: Defines the schema for chat rooms, including properties for room name and members.
  - `mensaje.js`: Defines the schema for messages, including sender, content, creation date, and associated chat room.
  - `usuario.js`: Defines the schema for users, including username, email, password, and creation date.

- **Routes**
  - `Auth.js`: Exports routes for user authentication, linking to the corresponding controller functions.

- **Utils**
  - `db.js`: Manages the database connection using Mongoose.
  - `messages.js`: Formats messages for client delivery.
  - `users.js`: Manages connected users in the chat.

- **server.js**: The entry point of the application, setting up the Express server and initializing Socket.io for real-time communication.

- **generador.sh**: A shell script for generating project structure and files.

- **README.md**: Documentation for the backend setup and usage.

### Frontend

The frontend is built with HTML, CSS, and JavaScript, providing the user interface for the chat application.

- `chat.html`: The chat interface for users, displaying messages and user input.
- `index.html`: The homepage for the chat application, allowing users to enter their username and select a chat room.
- `css/style.css`: Styles for the frontend application, defining the layout and appearance.
- `img/icon.png`: An icon used in the frontend application.
- `js/client.js`: Handles client-side logic for connecting to the WebSocket server and updating the chat interface.
- `README.md`: Documentation for the frontend setup and usage.

## Features

- User registration and login with JWT authentication.
- Real-time messaging using WebSockets.
- Chat rooms where users can join and communicate.
- User-friendly interface for sending and receiving messages.

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

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies (if any):
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```

2. Open `index.html` in your browser to access the frontend.

## License

This project is licensed under the MIT License.