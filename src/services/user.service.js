const { User } = require('../models');
const { userFieldsSchema } = require('./validations/joi/schema.user');

// validations
const validateBody = (requestBody) => {
  const { error, value } = userFieldsSchema.validate(requestBody);

  return { error, value };
};

const createUser = async (userData) => {
  const result = await User.create(userData);

  return result;
};

const checkUserExist = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return true;

  return false;
};

module.exports = {
  validateBody,
  createUser,
  checkUserExist,
};
