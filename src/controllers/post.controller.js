const { postService } = require('../services');

const createPost = async (req, res, next) => { 
  const { error, value } = postService.validateBody(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  const { categoryIds } = value;

  const areValidCategoryIds = await postService.validateCategoryIds(categoryIds);

  if (!areValidCategoryIds) {
    const newError = new Error('one or more "categoryIds" not found');
    newError.statusCode = 400;

    return next(newError);
  }

  const { userId } = req.user;
  const newPost = await postService.createPost(userId, value);

  return res.status(201).json(newPost);
};

const listPosts = async (_req, res) => {
  const post = await postService.listPosts();

  res.status(200).json(post);
};

const getPost = async (req, res, next) => {
  const { id } = req.params;

  const post = await postService.getPost(id);

  if (!post) {
    const newError = new Error('Post does not exist');
    newError.statusCode = 404;

    return next(newError);
  }

  return res.status(200).json(post);
};

module.exports = {
  createPost,
  listPosts,
  getPost,
};
