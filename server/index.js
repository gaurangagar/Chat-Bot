const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const { Server } = require("socket.io");
require('dotenv').config();
const cluster = require('node:cluster');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes');
const messageRoutes=require('./routes/message.route')

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(e => console.log('mongodb connected'));

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

let users = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (userId) => {
    users[userId] = socket.id;
    console.log('User registered:', 'userId : ', userId);
  });

  socket.on('private-message', ({ to, from, message }) => {
    const targetId = users[to];
    if (targetId) {
      io.to(targetId).emit('private-message', { from, message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
  });
});

app.use('/user', userRoutes);
app.use('/api', apiRoutes);
app.use('/message',messageRoutes)

app.get('/', (req, res) => res.send('hi'));
