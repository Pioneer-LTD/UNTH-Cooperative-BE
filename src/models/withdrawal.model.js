const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
    member_id: {
        type: Number,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    authorised_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffModel',
        required: true,
        unique: [true, "StaffID already exists"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'staffModel',
        required: true,
        unique: [true, "StaffID already exists"]
    },
}, 
{ timestamps: {
    createdAt: true,
    updatedAt: false
  }}
 )

 const withdrawModel = mongoose.model("Withdrawal", withdrawalSchema)

module.exports = withdrawModel