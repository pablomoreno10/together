const http = require('http');
const {Server} = require('socket.io');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
const server = http.createServer(app); 
const io = new Server(server, {cors: { origin: '*',}}); 
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


server.listen(3000, () => console.log('Sever running on port 3000'));