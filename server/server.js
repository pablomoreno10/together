const http = require('http');
const {Server} = require('socket.io');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    credentials: true
  }
});
const {handlerSocket} = require('./sockets/sockerController');
handlerSocket(io);

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
app.use(express.json()); 
connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/toDos'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));


server.listen(3000, () => console.log('Sever running on port 3000'));