const express = require('express');

const { categoryController } = require('../controllers');
const authMiddlewares = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddlewares);
router.post('/', categoryController.addNewCategory);

module.exports = router;
