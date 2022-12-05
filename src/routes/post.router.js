const express = require('express');

const { postController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.post('/', postController.createPost);
router.get('/', postController.listPosts);
router.get('/:id', postController.getPost);

module.exports = router;
