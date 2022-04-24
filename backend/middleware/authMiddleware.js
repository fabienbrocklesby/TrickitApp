const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization
      && req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        throw new Error();
      }
    }

    if (!token) {
      throw new Error();
    }
  } catch (Error) {
    res.end('Oops, you arent allowed to be here!!\n');
  }
};

module.exports = { protect };
