const joi = require("joi");

// Joi Validation schema used to verify req data
const RegisterSchema = joi.object().keys({
  ippis: joi.string().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  dept_unit: joi.string().required(),
  designation: joi.string().required(),
  sex: joi.string().required(),
  monthly_savings: joi.string().required(),
  opening_balance: joi.string().required(),
  email: joi.string().required().email(),
  mobile_phone: joi.string().required()
});

module.exports = {
  RegisterSchema
};
