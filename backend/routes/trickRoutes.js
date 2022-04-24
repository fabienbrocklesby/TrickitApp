const express = require('express');

const router = express.Router();
const {
  getTricks,
  setTrick,
  updateTrick,
  deleteTrick,
} = require('../controllers/trickController');

const { protect } = require('../middleware/authMiddleware');
const { validateData } = require('../middleware/validationMiddleware');

router.route('/').get(protect, getTricks).post(protect, validateData, setTrick);
router.route('/:id').delete(protect, deleteTrick).put(protect, updateTrick);

module.exports = router;
