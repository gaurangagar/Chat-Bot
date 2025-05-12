const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const { Server } = require("socket.io");
require('dotenv').config();
const { availableParallelism } = require('node:os');
const cluster = require('node:cluster');
const { createAdapter, setupPrimary } = require('@socket.io/cluster-adapter');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user.routes');
const { restrictToLoggedinUserOnly } = require('./middleware/auth');

if (cluster.isPrimary) {
  const numCPUs = availableParallelism();
  // create one worker per available core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({
      PORT: 8000 + i
    });
  }

  // set up the adapter on the primary thread
  return setupPrimary();
} else {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
    adapter: createAdapter()
  });
  const port = process.env.PORT || 3000;

  app.use(express.static(path.resolve('./public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  mongoose.connect(process.env.MONGO_URL).then(e => console.log('mongodb connected'));

  server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.join('some room');
    // broadcast to all connected clients in the room
    io.to('some room').emit('chat message', 'world');
    io.except('some room').emit('chat message', 'random');
    socket.leave('some room');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
      console.log(msg);
      io.emit('chat message', msg);
    });
  });

  app.use('/user', userRoutes);

  app.get('/', restrictToLoggedinUserOnly, (req, res) => {
    res.sendFile('./public/index.html');
  });
}
