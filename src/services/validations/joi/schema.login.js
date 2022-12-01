const Joi = require('joi');

const loginFieldsSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
  'string.email': 'Invalid fields',
  'string.min': 'Invalid fields',
  'string.base': 'Invalid fields',
});

module.exports = {
  loginFieldsSchema,
};
