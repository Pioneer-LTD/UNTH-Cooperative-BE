const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: memberModel,
      required: true,
      unique: [true, "MemberID already exists"]
  },
  application_date: {
    type: Date,
    required: true,
  },
  loan_granted_date: {
    type: Date,
    trim: true,
  },
  purpose: {
    type: String,
    required: true,
    enum: ["Personal", "Mortgage"],
  },
  monthly_savings: {
    type: Nmuber,
    required: true,
  },
  loan_amt: {
    type: String,
    required: true,
    enum: ["M", "F", "LGBTQ"],
  },
  rate: {
      type: Number,
      trim: true,
      required: true,
      default: 1
  },
  tenor: {
      type: Number,
      trim: true,
      required: true,
      default: 0
  },
  total_interest: {
    type: String,
    required: true,
    max: 11,
    unique: [true, "mobile phone already exists"]
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
    enum: ["Pending", "Active", "Declined", "Completed"], 
    trim: true,
    default: "Pending"
  },
  authorized_by: {
    type: mongoose.Schema.Types.ObjectId
  }
},
  { timestamps: {
    createdAt: true,
    updatedAt: false
  }}
);

const loanModel = mongoose.model("Loan", loanSchema);

module.exports = loanModel;