require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '15min',
  algorithm: 'HS256',
};

const createToken = (payload) => {
  const token = jwt.sign({ payload }, secret, jwtConfig);

  return token;
};

const validateToken = (token) => {
  const { payload } = jwt.verify(token, secret);

  return payload;
};

module.exports = {
  createToken,
  validateToken,
};
