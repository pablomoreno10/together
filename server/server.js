const http = require('http');
const {Server} = require('socket.io');

const express = require('express');
const app = express();
const server = http.createServer(app); //Wrapping express app into an HTTP server manually
const io = new Server(server, {cors: { origin: '*',}}); //Will connect to frontend later on
const handlerSocket = require('./sockets/sockerController');

const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
app.use(express.json()); 
connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/toDos'));
app.use('/api/events', require('./routes/events'));

handlerSocket(io);

server.listen(3000, () => console.log('Sever running on port 3000'));