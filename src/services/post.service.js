const { User, Category, BlogPost, PostCategory } = require('../models');

const { postFieldsSchema } = require('./validations/joi/schema.post');

const validateBody = (requestBody) => {
  const { error, value } = postFieldsSchema.validate(requestBody);

  return { error, value };
};

const validateCategoryIds = async (listCategoryIds) => {
  console.log(listCategoryIds);

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
  console.log(userId, dataForNewPost);
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

// eslint-disable-next-line max-lines-per-function
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

module.exports = {
  validateBody,
  validateCategoryIds,
  createPost,
  listPosts,
};
