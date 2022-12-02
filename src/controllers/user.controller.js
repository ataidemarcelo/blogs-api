const { userService } = require('../services');
const jwtUtils = require('../utils/jwt.util');

const createUser = async (req, res, next) => {
  const { error, value } = userService.validateBody(req.body);

  if (error) {
    error.statusCode = 400;
    return next(error);
  }
  
  const userExist = await userService.checkUserExist(value.email);
  if (!userExist) {
    const newError = new Error('User already registered');
    newError.statusCode = 409;
    throw newError;
  }
  
  const newUser = await userService.createUser(value);

  const token = jwtUtils.createToken({ 
    userId: newUser.dataValues.id,
    name: newUser.dataValues.displayName,
    avatar: newUser.dataValues.image,
  });

  return res.status(201).json({ token });
};

module.exports = {
  createUser,
};
