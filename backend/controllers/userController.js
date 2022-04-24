const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error('Oops, please supply all the required fields!');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('Oops, that email is already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      throw new Error('Oops, please match our requested format!');
    }
  } catch (Error) {
    res.status(400);
    res.setHeader('content-type', 'text/plain');
    res.end(`${Error.message}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      throw new Error('Oops, these are invalid credentials!');
    }
  } catch (Error) {
    res.status(400);
    res.setHeader('content-type', 'text/plain');
    res.end(`${Error.message}`);
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
