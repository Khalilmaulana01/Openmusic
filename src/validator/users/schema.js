const Joi = require('joi');

const UserPayloadSchema = Joi.Object({
  username: Joi.string().required(),
  password: Joi.string().require(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
