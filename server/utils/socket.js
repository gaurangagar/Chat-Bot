let users = {};

function socketSetUp(io) {
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
}

module.exports=socketSetUp;