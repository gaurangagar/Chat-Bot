const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path=require('path')
const io = new Server(server);
const port=process.env.PORT || 3000

app.use(express.static(path.resolve('./public')))

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

io.on('connection', (socket) => {
    socket.on('user-message',message=>{
        io.emit('message',message)
    })
  });

app.get('/', (req, res) => {
    res.sendFile('./public/index.html')
  });