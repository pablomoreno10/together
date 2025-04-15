const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { registerUser } = require('./controllers/authController');


dotenv.config();

const app = express();

app.use(express.json()); //middleware

connectDB();

app.post('/api/auth/register', registerUser);

app.listen(3000, () => console.log('Sever running on port 3000'));