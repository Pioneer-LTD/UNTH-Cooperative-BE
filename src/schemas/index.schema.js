const joi = require("joi");

// Joi Validation schema used to verify req data
exports.memberSchema = joi.object().keys({
  ippis: joi.string().regex(/^[0-9]{6}$/).messages({'string.pattern.base': `Ippis must have 6 digits.`}).required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  dept_unit: joi.string().required(),
  designation: joi.string().required(),
  sex: joi.string().required(),
  email: joi.string().required().email(),
  mobile_phone: joi.string().regex(/^[0-9]{11}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
});

exports.loginMember = joi.object().keys({
  ippis: joi.string().regex(/^[0-9]{6}$/).messages({'string.pattern.base': `Ippis must be 6 digits.`}).required(),
  password: joi.string().min(5).max(121).required(),
})

exports.memberLoanSchema = joi.object().keys({
  loan_amt: joi.number().required(),
  purpose: joi.string().required(),
  tenor: joi.string().required(),
  status: joi.string().valid('Pending')
});

exports.loanUpdate = joi.object().keys({
  status: joi.string().valid('Pending')
})

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
  // password: joi.string().min(8).max(30).required(),
})

exports.withdrawalRegister = joi.object().keys({
  member_id: joi.number().required(),
  amount: joi.number().required(),
})
