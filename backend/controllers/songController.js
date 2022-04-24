const Song = require('../models/songModel');
const User = require('../models/userModel');

const setSong = async (req, res) => {
  try {
    if (!req.body.songName || !req.body.songUrl) {
      throw new Error();
    }

    const song = await Song.create({
      songName: req.body.songName,
      songUrl: req.body.songUrl,
      user: req.user.id,
    });

    res.status(200).json(song);
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, there appears to be a problem!');
  }
};

const getSongs = async (req, res) => {
  try {
    const songs = await Song.find({ user: req.user.id });

    if (!songs) {
      throw new Error();
    }

    res.status(200).json(songs);
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song || !req.user || song.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error();
    }

    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedSong);
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song || !req.user || song.user.toString() !== req.user.id) {
      res.status(400);
      throw new Error();
    }

    await song.remove();

    res.status(200).json({ id: req.params.id });
  } catch (Error) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Oops, this isn\'t what you\'re looking for...');
  }
};

module.exports = {
  setSong,
  getSongs,
  updateSong,
  deleteSong,
};
