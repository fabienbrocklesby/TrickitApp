const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const postmark = require('postmark');
const User = require('../models/userModel');

const { updateService, sendEmailService } = require('../services/userService');

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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

const updateUser = async (req, res) => {
  try {
    const { email } = req.body;
    const id = req.user._id;

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error('Oops, that email is already in use!');
    }

    const user = await User.findById({ _id: id });

    if (!user || !email) {
      throw new Error('Oops, please supply all the required fields!');
    }

    updateService(req, res, { _id: user._id }, { email });

    res.status(200).json('User updated!');
  } catch (Error) {
    res.status(400);
    res.setHeader('content-type', 'text/plain');
    res.end(`${Error.message}`);
  }
};

const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user || !email) {
      throw new Error('Oops, this is invalid data!');
    }

    sendEmailService(req, res, user);

    res.status(200).json('Email Sent!');
  } catch (Error) {
    res.status(400);
    res.setHeader('content-type', 'text/plain');
    res.end(`${Error.message}`);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    if (!resetToken || !password) {
      throw new Error('Oops, please supply all the required fields!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({ resetToken });

    if (!user) {
      throw new Error('Oops, there is no user with this token!');
    }

    updateService(req, res, { _id: user._id }, { password: hashedPassword, resetToken: null });

    res.status(200).json('User Updated!');
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
  updateUser,
  sendEmail,
  updatePassword,
};
