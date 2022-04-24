const Trick = require('../models/trickModel');
const User = require('../models/userModel');

const setTrick = async (req, res) => {
  try {
    if (!req.body.trick) {
      throw new Error();
    }

    const trick = await Trick.create({
      trick: req.body.trick,
      user: req.user.id,
    });

    res.status(200).json(trick);
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, there appears to be a problem!');
  }
};

const getTricks = async (req, res) => {
  try {
    const tricks = await Trick.find({ user: req.user.id });

    if (!tricks) {
      throw new Error();
    }

    res.status(200).json(tricks);
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

const updateTrick = async (req, res) => {
  try {
    const trick = await Trick.findById(req.params.id);

    if (!trick || !req.user || trick.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error();
    }

    const updatedTrick = await Trick.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTrick);
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

const deleteTrick = async (req, res) => {
  try {
    const trick = await Trick.findById(req.params.id);

    if (!trick || !req.user || trick.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error();
    }

    await trick.remove();

    res.status(200).json({ id: req.params.id });
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

module.exports = {
  getTricks,
  setTrick,
  updateTrick,
  deleteTrick,
};
