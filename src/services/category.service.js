const { Category } = require('../models');
const { categoryFieldsSchema } = require('./validations/joi/schema.category');

const validateBody = (requestBody) => {
  const { error, value } = categoryFieldsSchema.validate(requestBody);

  return { error, value };
};

const addNewCategory = async ({ name }) => {
  const category = await Category.create({ name });

  return category;
};

module.exports = {
  validateBody,
  addNewCategory,
};
