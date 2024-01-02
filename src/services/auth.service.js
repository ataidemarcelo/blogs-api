const bcrypt = require('bcryptjs');

const { User } = require('../models');
const { loginFieldsSchema } = require('./validations/joi/schema.login');
const { createToken } = require('../utils/jwt.util');

const validateBody = (requestBody) => {
  const { error, value } = loginFieldsSchema.validate(requestBody);

  return { error, value };
};

const authenticateUser = async (validData) => {
  const { email, password } = validData;

  const [user] = await User.findAll({ where: { email } });

  if (!user) {
    const error = new Error('Invalid credentials!');
    error.statusCode = 401;

    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.dataValues.password);

  if (!isValidPassword) {
    const error = new Error('Invalid credentials!-passowrd');
    error.statusCode = 400;
    
    throw error;
  }

  const payload = { 
    userId: user.dataValues.id,
    name: user.dataValues.displayName,
    avatar: user.dataValues.image,
  };

  const token = createToken(payload);

  return token;
};

module.exports = {
  validateBody,
  authenticateUser,
};
