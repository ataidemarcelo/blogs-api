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

const listUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
  });

  return users;
};

const getUser = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: ['id', 'displayName', 'email', 'image'],
  });

  return user;
};

module.exports = {
  validateBody,
  createUser,
  checkUserExist,
  listUsers,
  getUser,
};
