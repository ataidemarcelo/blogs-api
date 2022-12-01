const express = require('express');

const { authController } = require('../controllers');

const authRouter = express.Router();

authRouter.post('/', authController.login);

module.exports = authRouter;
