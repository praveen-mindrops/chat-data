const { Joi } = require("express-validation");
const userValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    dob:Joi.date().required()

  }),
};

module.exports = {
  userValidation,
};
