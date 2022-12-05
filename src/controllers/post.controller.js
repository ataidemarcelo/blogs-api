const { postService } = require('../services');
const { updateFieldsSchema } = require('../services/validations/joi/schema.post');

const createPost = async (req, res, next) => { 
  const { error, value } = postService.validateBody(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  const { categoryIds } = value;

  const areValidCategoryIds = await postService.validateCategoryIds(categoryIds);

  if (!areValidCategoryIds) {
    const missingCategoryIds = new Error('one or more "categoryIds" not found');
    missingCategoryIds.statusCode = 400;

    return next(missingCategoryIds);
  }

  const { userId } = req.user;
  const newPost = await postService.createPost(userId, value);

  return res.status(201).json(newPost);
};

const listPosts = async (_req, res) => {
  const post = await postService.listPosts();

  res.status(200).json(post);
};

const checkPostExist = async (postId) => {
  const post = await postService.getPost(postId);
  let error;

  if (!post) {
    error = new Error('Post does not exist');
    error.statusCode = 404;
  }

  return { error, post };
}; 

const getPost = async (req, res, next) => {
  const { id: postId } = req.params;

  const { error, post } = await checkPostExist(postId);

  if (error) {
    return next(error);
  }

  return res.status(200).json(post);
};

const updatePost = async (req, res, next) => {
  const { id: postId } = req.params;

  const { error, value: validDataBody } = updateFieldsSchema.validate(req.body);

  if (error) {
    error.statusCode = 400;

    return next(error);
  }

  const { error: postDoesNotExist, post } = await checkPostExist(postId);

  if (postDoesNotExist) {
    return next(postDoesNotExist);
  }

  if (req.user.userId !== post.user.id) {
    const unauthorizedUser = new Error('Unauthorized user');
    unauthorizedUser.statusCode = 401;

    return next(unauthorizedUser);
  }
  
  await postService.updatePost(postId, validDataBody);
  const updatedPost = await postService.getPost(postId);

  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res, next) => {
  const { id: postId } = req.params;

  const { error: postDoesNotExist, post } = await checkPostExist(postId);

  if (postDoesNotExist) {
    return next(postDoesNotExist);
  }

  if (req.user.userId !== post.user.id) {
    const unauthorizedUser = new Error('Unauthorized user');
    unauthorizedUser.statusCode = 401;

    return next(unauthorizedUser);
  }

  await postService.deletePost(postId);

  return res.status(204).end();
};

module.exports = {
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost,
};
