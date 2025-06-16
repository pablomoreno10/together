const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/users');
dotenv.config();

const protected = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch full user info from DB to include teamId
      const user = await User.findById(decoded.id).select('id role teamId');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = {
        id: user.id,
        role: user.role,
        teamId: user.teamId,
      };

      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res
        .status(401)
        .json({ message: 'Not authorized, token failed.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protected };
