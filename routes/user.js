
// Path: routes\user.js
const express = require('express');
const router = express.Router();

const userController = require('../handler/user');

router.get('/user', userController.getUser);




module.exports = router;