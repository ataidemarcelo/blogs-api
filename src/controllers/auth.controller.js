const { authService } = require('../services');

const login = async (req, res, next) => {
  const { error, value } = authService.validateBody(req.body);

  if (error) {
    // é possível usar um errorMapper(details[0].type)
    // com o type do retorno do JOI, para statusCode diferentes 
    error.statusCode = 400;
    
    return next(error);
  }

  const token = await authService.authenticateUser(value);

  return res.status(200).json({ token });
};

module.exports = {
  login,
};
