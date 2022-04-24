const express = require('express');

const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const { validateData } = require('../middleware/validationMiddleware');

router.post('/', registerUser, validateData);
router.post('/login', validateData, loginUser);
router.get('/me', protect, getMe);

module.exports = router;
