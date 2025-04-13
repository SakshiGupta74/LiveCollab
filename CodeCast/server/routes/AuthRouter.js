// routes/authRoutes.js
const express = require('express');
const router = express.Router();

const { loginvalidation, signupvalidation } = require('../middleware/AuthValidation.js');
const { signup, login } = require('../controller/authcontroller.js');

router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);

module.exports = router;

