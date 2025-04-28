//const jwt = require('jsonwebtoken'); will add authentication later on

function handlerSocket(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('join_room', (teamId) => {
        socket.join(teamId); 
        console.log(`Socket ${socket.id} joined team room: ${teamId}`);
      });
  
      socket.on('send_message', ({ teamId, sender, text }) => {
        io.to(teamId).emit('receive_message', { sender, text });
      });
  
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
}

module.exports = {handlerSocket};