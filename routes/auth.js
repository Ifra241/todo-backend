const express = require('express');
const router = express.Router();

const {signup, login, refreshToken, logout} = require('../controllers/authController');

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken);

// Logout route
router.post('/logout', logout);

module.exports = router;
