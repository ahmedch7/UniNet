// socketService.js
import { Server } from 'socket.io';
import Chat from '../models/chat.js';

let io;

export const init = (server) => {
  console.log("Initializing Socket.IO");
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    socket.on('chatMessage', async (data) => {
      const { roomId, user, text } = data;
      try {
        const newMessage = new Chat({ roomId, user, text });
        await newMessage.save();
        io.to(roomId).emit('chatMessage', newMessage);
      } catch (error) {
        console.error('Error saving message:', error.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};
