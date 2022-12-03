const Joi = require('joi');

const categoryFieldsSchema = Joi.object({
  name: Joi.string().required(),
}).messages({
  'string.empty': '"name" is required',
});

module.exports = {
  categoryFieldsSchema,
};
