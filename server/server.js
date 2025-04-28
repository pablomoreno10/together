/*const http = require('http');
const {Server} = require('socket.io');*/

const express = require('express');
const app = express();
/*cconst server = http.createServer(app); //Wrapping express app into an HTTP server manually
const io = new Server(server, {
    cors: { origin: '*',}
  });*/

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
app.use(express.json()); 
connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/toDos'));
app.use('/api/events', require('./routes/events'));

/*io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    socket.on('send_message', (data) => {
        io.to(data.teamId).emit('receive_message', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        });
  });*/


app.listen(3000, () => console.log('Sever running on port 3000'));