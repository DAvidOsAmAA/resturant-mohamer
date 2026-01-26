const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

const {
  register,
  login,
  refreshToken,
  getAllUsers // 👈 admin
} = require('./user.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// ADMIN ONLY
router.get('/users', auth, role('ADMIN'), getAllUsers);

module.exports = router;
