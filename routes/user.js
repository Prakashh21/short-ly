const express = require('express');
const { handleUserSignUp, handlUserLogin } = require('../controllers/user');

const router = express.Router();

router.post('/signup',handleUserSignUp)
router.post('/login',handlUserLogin)


module.exports = router;



