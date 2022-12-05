const { Op } = require('sequelize');

const { User, Category, BlogPost, PostCategory } = require('../models');

const { postFieldsSchema } = require('./validations/joi/schema.post');

const validateBody = (requestBody) => {
  const { error, value } = postFieldsSchema.validate(requestBody);

  return { error, value };
};

const validateCategoryIds = async (listCategoryIds) => {
  const categoryIdsInPromises = listCategoryIds.map(
    async (categoryId) => Category.findByPk(categoryId),
  );

  const checkCategoryExist = await Promise.all(categoryIdsInPromises);

  const areCategoryIds = checkCategoryExist.every(
    (value) => value && typeof value.dataValues === 'object',
  );

  return areCategoryIds;
};

const createPost = async (userId, dataForNewPost) => {
  const date = Date.now();

  const newPost = {
    title: dataForNewPost.title,
    content: dataForNewPost.content,
    userId,
    updated: date,
    published: date,
  };

  const result = await BlogPost.create(newPost);

  const listCategoryIds = dataForNewPost.categoryIds;

  listCategoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: result.id, categoryId });
  });

  return result;
};

const listPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { 
        model: User, 
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  return result;
};

const getPost = async (postId) => {
  const result = await BlogPost.findOne(
    { 
      where: { id: postId },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
      ],
    },
  );

  return result;
};

const updatePost = async (postId, dataForUpdatePost) => {
   const { title, content } = dataForUpdatePost;

   const result = await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  return result;
};

const deletePost = async (postId) => BlogPost.destroy({ where: { id: postId } });

const search = async (searchTerm) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    include: [
        {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories' },
    ],
  });

  return result;
};

module.exports = {
  validateBody,
  validateCategoryIds,
  createPost,
  listPosts,
  getPost,
  updatePost,
  deletePost,
  search,
};
