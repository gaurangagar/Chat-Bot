const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const socketSetUp=require('./utils/socket')
const connectDB=require('./config/db')

const userRoutes = require('./routes/user.routes');
const apiRoutes = require('./routes/api.routes');
const messageRoutes=require('./routes/message.route')

const app = express();
app.use(cors({
  origin: process.env.VITE_URL,
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

socketSetUp(io);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB()

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.get('/', (req, res) => res.send('Server running ✅'));

app.use('/user', userRoutes);
app.use('/api', apiRoutes);
app.use('/message',messageRoutes)