const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  ippis: {
      type: Number,
      required: true,
      trim: true,
      unique: [true, "Ippis already exists"]
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
    unique: [true, "mobile phone already exists"]

  },
  email: {
    type: String,
    required: true,
    unique: [true,"Email already exists"]
  },
  title: {
    type: String, enum: ["Mr.", "Mrs.", "Ms.", "Miss"], trom: true
  },
  cadre: {
    type: String, trim: true
  },
  level: {
    type: String, trim: true,
  },
  step: {
    type: String, trim: true,
  },
  permanent_staff: {
    type: Boolean, default: false,
  },
  married: {
    type: Boolean, default: false,
  },
  state_of_origin: {
    type: String, trim: true,
  },
  LGA: {
    type: String, trim: true,
  },
  home_town: {
    type: String, trim: true,
  },
  date_joined: {
    type: String
  },
  Residential_address: {
    type: String, trim: true,
  },
  next_of_ken: {
    type: String, trim: true,
  },
  next_of_ken_address: {
    type: String, trim: true,
  },
  photograph: {
    type: String, trim: true,
  },
  signature: {
    type: String, trim: true,
  }
},
  { timestamps: true }
);

const memberModel = mongoose.model("Member", memberSchema);

module.exports = memberModel;