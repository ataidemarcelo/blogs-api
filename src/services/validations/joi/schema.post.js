const Joi = require('joi');

const MSG_FOR_REQUIRED_FIELDS = 'Some required fields are missing';

const postFieldsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().min(6).required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
}).messages({
  'any.required': MSG_FOR_REQUIRED_FIELDS,
  'string.empty': MSG_FOR_REQUIRED_FIELDS,
  'array.base': MSG_FOR_REQUIRED_FIELDS,
  'array.includesRequiredUnknowns': MSG_FOR_REQUIRED_FIELDS,
  'number.base': MSG_FOR_REQUIRED_FIELDS,
});

module.exports = {
  postFieldsSchema,
};
