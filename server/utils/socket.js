let users = {};

function socketSetUp(io) {
    io.on('connection', (socket) => {

        socket.on('register', (userId) => {
            users[userId] = socket.id;
        });

        socket.on('private-message', ({ to, from, message }) => {
            const targetId = users[to];
            if (targetId) {
                io.to(targetId).emit('private-message', { from, message });
            }
        });
        socket.on('typing',({to, from})=>{
            const targetId = users[to];
            if(targetId) {
                io.to(targetId).emit('typing', { from });
            }
        })

        socket.on('disconnect', () => {
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