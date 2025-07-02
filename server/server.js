const http = require('http');
const {Server} = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN, 
    credentials: true
  }
});
const {handlerSocket} = require('./sockets/sockerController');
handlerSocket(io);
const connectDB = require('./config/db');
app.use(express.json()); 
connectDB();
const rateLimit = require('express-rate-limit');
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 100,
  message: 'Too many requests. please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/toDos'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));


server.listen(3000, () => console.log('Sever running on port 3000'));