const { validateToken } = require('../utils/jwt.util');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token not found');
    err.statusCode = 401;

    return next(err);
  }

  try {
    const payload = validateToken(token);

    req.user = payload;

    return next();
  } catch (e) {
    console.error(e);

    const err = new Error('Expired or invalid token');
    err.statusCode = 401;

    return next(err);
  }
};