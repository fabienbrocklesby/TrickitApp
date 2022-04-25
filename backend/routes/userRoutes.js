const express = require('express');

const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  sendEmail,
  updatePassword,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');
const { validateData } = require('../middleware/validationMiddleware');

router.post('/', registerUser, validateData);
router.post('/login', validateData, loginUser);
router.put('/update', protect, validateData, updateUser);
router.post('/sendemail', validateData, sendEmail);
router.post('/updatepassword', validateData, updatePassword);
router.get('/me', protect, getMe);

module.exports = router;
