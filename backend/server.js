// server.js

import express from 'express';
import { createServer } from 'http';
import { Server as socketIo } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',  // Frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,  // Allow cookies or authorization headers
};

app.use(cors(corsOptions));  // Apply CORS to all requests

// Socket.io setup with CORS options
const io = new socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',  // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Basic route for testing the server
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  // Handle message from client
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data);  // Broadcast the message to all connected clients
  });

  // Handle private message
  socket.on('private_message', ({ receiverId, message }) => {
    console.log('Private message from', socket.id, 'to', receiverId, ':', message);
    io.to(receiverId).emit('private_message', {
      senderId: socket.id,
      message: message,
    });
  });

  // Handle user joining
  socket.on('join', (username) => {
    console.log(`${username} joined with socket ID: ${socket.id}`);
    io.emit('connected', `${username} joined the chat`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
