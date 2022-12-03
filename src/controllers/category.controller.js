const { categoryService } = require('../services');

const addNewCategory = async (req, res, next) => {
  const { error, value } = categoryService.validateBody(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }

  const { name } = value;
  const newCategory = await categoryService.addNewCategory({ name });

  return res.status(201).json(newCategory);
};

const listCategories = async (_req, res) => {
  const categories = await categoryService.listCategories();

  return res.status(200).json(categories);
};

module.exports = {
  addNewCategory,
  listCategories,
};
