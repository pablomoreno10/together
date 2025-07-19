const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

const clientOrigin = 'https://together-beta.vercel.app';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: clientOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    credentials: true,
    methods: ['GET', 'POST'],
  }
});

const { handlerSocket } = require('./sockets/sockerController');
handlerSocket(io);

const connectDB = require('./config/db');
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
app.use('/api/graph', require('./routes/graph'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
