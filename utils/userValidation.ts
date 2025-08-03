import Joi from  'joi';

const userSignupSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name can be at most 50 characters',
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(/@/)
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.pattern.base': 'Email must contain "@" symbol',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
    }),
  birthdate: Joi.string()
  .pattern(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
  .required()
  .messages({
    'string.empty': 'Birthdate is required',
    'string.pattern.base': 'Birthdate must be in DD/MM/YYYY format',
  })
});

export {
  userSignupSchema,
};