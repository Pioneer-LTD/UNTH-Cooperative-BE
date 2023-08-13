const joi = require("joi");

// Joi Validation schema used to verify req data
exports.MemberSchema = joi.object().keys({
  ippis: joi.string().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  dept_unit: joi.string().required(),
  designation: joi.string().required(),
  sex: joi.string().required(),
  email: joi.string().required().email(),
  mobile_phone: joi.string().required()
});

exports.staffSchema = joi.object().keys({
  fullname: joi.string().max(54).required(),
  experience: joi.string().required(),
  password: joi.string().min(8).max(30).required(),
})

exports.loginStaff = joi.object().keys({
  fullname: joi.string().max(54).required(),
  password: joi.string().min(8).max(30).required(),
})

exports.staffUpdate = joi.object().keys({
  fullname: joi.string().max(54).required(),
  experience: joi.string().required(),
  password: joi.string().min(8).max(30).required(),
})

