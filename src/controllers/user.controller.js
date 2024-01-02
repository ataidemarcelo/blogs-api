const bcrypt = require('bcryptjs');

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
    
    return next(newError);
  }
  
  const { displayName, password, email, image } = value;

  const passwordHash = await bcrypt.hash(password, 8);

  const dataNewUser = {
    displayName,
    email,
    password: passwordHash,
    image
  }
  const newUser = await userService.createUser(dataNewUser);

  const token = jwtUtils.createToken({ 
    userId: newUser.dataValues.id,
    name: newUser.dataValues.displayName,
    avatar: newUser.dataValues.image,
    email: newUser.dataValues.email
  });

  // Os dados já estão no token (payload)
  return res.status(201).json({ newUser, token });
};

const listUsers = async (_req, res) => {
  const users = await userService.listUsers();

  return res.status(200).json(users);
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await userService.getUser(id);

  if (!user) {
    const newError = new Error('User does not exist');
    newError.statusCode = 404;
    
    return next(newError);
  }

   return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { userId } = req.user;

  await userService.deleteUser(userId);

  return res.status(204).end();
};

module.exports = {
  createUser,
  listUsers,
  getUser,
  deleteUser,
};
