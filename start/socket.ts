import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    socket.on("join", ({ room, users }) => {
        if (room) socket.join(`room${room}`);
        if (users) for (let user of users) socket.join(`userRoom${user}`);
    });
    socket.on("sendMessage", ({ message, room, users }) => {
        if (room) socket.to(`room${room}`).emit("receiveMessage", message);
        if (users) for (let user of users) socket.to(`userRoom${user}`).emit("receiveMessage", message);
    });
})