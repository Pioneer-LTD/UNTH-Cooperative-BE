const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  ippis: {
      type: Number,
      required: true,
      trim: true
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
  },
  dept_unit: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  sex: {
    type: String,
    required: true,
    enum: ["M", "F", "LGBTQ"],
  },
  monthly_savings: {
      type: Number,
      trim: true,
      required: true,
      default: 0
  },
  opening_balance: {
      type: Number,
      trim: true,
      required: true,
      default: 0
  },
  mobile_phone: {
    type: String,
    required: true,
    max: 11,
  },
  email: {
    type: String,
    required: true,
    unique: [true,"Email already exists"]
  }},
  { timestamps: true }
);

const memberModel = mongoose.model("Member", memberSchema);

module.exports = memberModel;