const express = require('express');
const usersController = require('../controllers/usersCtrl');

const userRouter  = express.Router();
//!Register
userRouter.post('/api/v1/users/register', usersController.register);

//!Login
userRouter.post('/api/v1/users/login', usersController.login);

module.exports = userRouter;

