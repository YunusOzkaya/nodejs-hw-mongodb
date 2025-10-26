const Joi = require('joi');

const string3to20 = Joi.string().min(3).max(20);

const createContactSchema = Joi.object({
  name: string3to20.required(),
  email: string3to20.email({ tlds: { allow: false } }).required(),
  phone: string3to20.required(),
  contactType: Joi.string().valid('work','home','other').required(),
  isFavourite: Joi.boolean().default(false)
});

const updateContactSchema = Joi.object({
  name: string3to20,
  email: string3to20.email({ tlds: { allow: false } }),
  phone: string3to20,
  contactType: Joi.string().valid('work','home','other'),
  isFavourite: Joi.boolean()
}).min(1);

module.exports = { createContactSchema, updateContactSchema };
