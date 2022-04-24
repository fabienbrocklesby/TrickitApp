const express = require('express');

const router = express.Router();
const {
  setSong,
  getSongs,
  updateSong,
  deleteSong,
} = require('../controllers/songController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getSongs).post(protect, setSong);
router.route('/:id').delete(protect, deleteSong).put(protect, updateSong);

module.exports = router;
