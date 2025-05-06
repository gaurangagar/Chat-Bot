const express = require('express');
const http = require('http');
const mongoose=require('mongoose')
const path=require('path')
const { Server } = require("socket.io");
require('dotenv').config();

const cookieParser=require('cookie-parser')

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port=process.env.PORT || 3000

const userRoutes=require('./routes/user.routes');
const { restrictToLoggedinUserOnly } = require('./middleware/auth');

app.use(express.static(path.resolve('./public')))
app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL).then(e=>console.log('mongodb connected'))

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

io.on('connection', (socket) => {
    socket.on('user-message',message=>{
        io.emit('message',message)
    })
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

app.use('/user',userRoutes)

app.get('/',restrictToLoggedinUserOnly, (req, res) => {
    res.sendFile('./public/index.html')
  });