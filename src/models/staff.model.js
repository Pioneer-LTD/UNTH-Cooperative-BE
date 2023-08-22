const bcrypt = require('bcrypt')
const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: [true,"Email already exists"]
	},
    role: {
		type: String,
	},
    experience: {
		type: String,
		required: true
	},
    password: {
		type: String,
		required: true
	},

}, 

{ timestamps: true }
)

//Document middleware for encrpting password
staffSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  next();
	}
  
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
  });
  
  staffSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

  const staffModel = mongoose.model("Staff", staffSchema);

module.exports = staffModel;