//const jwt = require('jsonwebtoken'); will add authentication later on
const Message = require("../models/chat");



function handlerSocket(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('join_room', (teamId) => {
        socket.join(teamId); 
        console.log(`Socket ${socket.id} joined team room: ${teamId}`);
      });
  
      socket.on('send_message', async ({ teamId, senderId, text }) => {
        const message = await Message.create({
          sender: senderId,
          teamId,
          text
        });
        const populatedMessage = await message.populate('sender', 'name');
       io.to(teamId).emit('newMessage', {
        _id: message._id,
        text: message.text,
        sender: populatedMessage.sender.name,
        timestamp: message.timestamp,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { handlerSocket };