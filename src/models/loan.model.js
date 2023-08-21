const mongoose = require("mongoose");
const { ENUM } = require("../configs/constants.config");

const loanSchema = new mongoose.Schema({
  member_ippis: {
    type: Number,
    ref: "memberModel",
    required: true,
  },
  // application_date: {
  //   type: Date,
  //   required: true,
  // },
  loan_granted_date: {
    type: Date,
    trim: true,
  },
  purpose: {
    type: String,
    required: true,
    enum: ENUM.LOAN,
  },
  monthly_savings: {
    type: Number,
    required: true,
  },
  loan_amt: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    trim: true,
    required: true,
    default: 1
  },
  tenor: {
    type: String,
    trim: true,
    required: true,
    default: 0
  },
  total_interest: {
    type: String,
    required: true,
    max: 11,
  },
  adjusted_savings: {
    type: Number,
  },
  capital: {
    type: Number, 
    trim: true
  },
  intrest: {
    type: Number,
    required: true,
    default: 0
  },
  status: {
    type: String, 
    enum: ENUM.STATUS,
    trim: true,
    default: ENUM.STATUS[0]
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
  },
  authorized_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "staffModel",
  }
},
  { timestamps: {
    createdAt: true,
    updatedAt: false
  }}
);

const loanModel = mongoose.model("Loan", loanSchema);

module.exports = loanModel;