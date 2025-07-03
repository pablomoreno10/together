const Message = require("../models/chat");

const userTimeStamps = {};

function handlerSocket(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('join_room', (teamId) => {
        socket.join(teamId); 
        console.log(`Socket ${socket.id} joined team room: ${teamId}`);
      });
  
      socket.on('send_message', async ({ teamId, senderId, text }) => {

        const now = new Date();
        const noMessage = 3;
        const windowMs = 10 * 1000;

        if (!userTimeStamps[socket.id]) {
          userTimeStamps[socket.id] = [];
        };

        userTimeStamps[socket.id] = userTimeStamps[socket.id].filter(
        timestamp => now - timestamp < windowMs
        );

        if (userTimeStamps[socket.id].length >= noMessage) {
          socket.emit('rate_limit', {
            message: 'You are sending messages too fast. Please wait.',
          });
          return;
        };

        userTimeStamps[socket.id].push(now);

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