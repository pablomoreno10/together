const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json()); 

connectDB();

app.use('/api/auth', require('./routes/auth'));

app.listen(3000, () => console.log('Sever running on port 3000'));