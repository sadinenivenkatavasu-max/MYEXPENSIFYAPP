const Joi = require('joi');

const expenseValidationSchema = Joi.object({
  title: Joi.string().required(),
  amount: Joi.number().required().min(1),
  category: Joi.string().required(),
  description: Joi.string(),
  expenseDate: Joi.date().required().less(new Date())
});

module.exports = expenseValidationSchema;
