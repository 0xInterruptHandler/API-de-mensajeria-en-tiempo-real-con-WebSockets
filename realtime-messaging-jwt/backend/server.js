const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const { registrar, iniciarSesion } = require("./Controllers/Auth");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const botName = "Admin";

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database connection
mongoose.connect("mongodb://localhost:27017/realtime-messaging", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.post("/api/auth/register", registrar);
app.post("/api/auth/login", iniciarSesion);

// Socket.io connection
io.on("connection", socket => {
    console.log("New WebSocket connection...");

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        // Welcome current user
        socket.emit("message", formatMessage(botName, `Welcome to ${user.room}`));

        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit("message", formatMessage(botName, `${user.username} has joined the chat`));

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit("message", formatMessage(botName, `${user.username} has left the chat`));

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));