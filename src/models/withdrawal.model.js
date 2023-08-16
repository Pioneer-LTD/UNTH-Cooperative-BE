const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: memberModel,
        required: true,
        unique: [true, "MemberID already exists"]
    },
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    authorised_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: staffModel,
        required: true,
        unique: [true, "StaffID already exists"]
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: staffModel,
        required: true,
        unique: [true, "StaffID already exists"]
    },
    created_at: {
        type: Date,
        required: true
    }
}, 
 { timestamps: true })

 const withdrawModel = mongoose.Model("Withdrawal", withdrawalSchema)

 module.exports = withdrawModel