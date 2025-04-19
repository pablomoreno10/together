const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users');
dotenv.config();

const protected = (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]; //We want to get the token part of authorization: Bearer token
            const verificated = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
              
            id: verificated.id,
            role: verificated.role //necessary for ToDo
          };
            next(); //go to route logic
        }catch(err){
            console.error('Token verification failed:', err);
            return res.status(401).json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

};

module.exports = {protected};