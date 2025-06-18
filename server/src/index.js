const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bandRoutes = require('./routes/band.routes');
const rehearsalRoutes = require('./routes/rehearsal.routes');
const setlistRoutes = require('./routes/setlist.routes');
const messageRoutes = require('./routes/message.routes');

const { errorHandler } = require('./middleware/errorHandler');
const { socketAuthMiddleware } = require('./middleware/socketAuth');

// Initialize Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Apply middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bands', bandRoutes);
app.use('/api/rehearsals', rehearsalRoutes);
app.use('/api/setlists', setlistRoutes);
app.use('/api/messages', messageRoutes);

// Error handling middleware
app.use(errorHandler);

// Socket.io setup
io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join band rooms
  socket.on('join-band', (bandId) => {
    socket.join(`band-${bandId}`);
    console.log(`Socket ${socket.id} joined band ${bandId}`);
  });

  // Join rehearsal rooms
  socket.on('join-rehearsal', (rehearsalId) => {
    socket.join(`rehearsal-${rehearsalId}`);
    console.log(`Socket ${socket.id} joined rehearsal ${rehearsalId}`);
  });

  // Handle chat messages
  socket.on('send-message', (message) => {
    if (message.rehearsalId) {
      io.to(`rehearsal-${message.rehearsalId}`).emit('new-message', message);
    } else if (message.bandId) {
      io.to(`band-${message.bandId}`).emit('new-message', message);
    }
  });

  // Handle rehearsal updates
  socket.on('update-rehearsal', (rehearsal) => {
    io.to(`rehearsal-${rehearsal._id}`).emit('rehearsal-updated', rehearsal);
    io.to(`band-${rehearsal.bandId}`).emit('rehearsal-updated', rehearsal);
  });

  // Handle attendance updates
  socket.on('update-attendance', (data) => {
    io.to(`rehearsal-${data.rehearsalId}`).emit('attendance-updated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rehearsal-planner')
  .then(() => {
    console.log('Connected to MongoDB');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
