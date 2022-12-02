const express = require('express');

const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', userController.createUser);

router.use(authMiddleware);
router.get('/', userController.listUsers);

module.exports = router;
