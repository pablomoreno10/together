const Message = require("../models/chat");

function handlerSocket(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('join_room', (teamId) => {
        socket.join(teamId); 
        console.log(`Socket ${socket.id} joined team room: ${teamId}`);
      });
  
      socket.on('send_message', async ({ teamId, senderId, text }) => {
        try{

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

          console.log('Message saved and emitted:', message);
        } catch (err) {
          console.error('Failed to save message:', err.message);
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('User disconnected:', socket.id, 'reason:', reason);
    });
  });
};

module.exports = { handlerSocket };