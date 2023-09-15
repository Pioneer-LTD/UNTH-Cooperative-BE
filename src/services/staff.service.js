const Staff = require('../models/staff.model');
const { MESSAGES } = require('../configs/constants.config');

//Create a Staff
exports.CreateStaff = async (input) => {
  const { email } = input;
  const staff = await Staff.findOne({ email });
  if (staff) {
    throw new MESSAGES.USER.DUPLICATE_NAME;
  }
  return await Staff.create(input);
 };

 //login Staff
 exports.Login = async (input) => {
    const { email, password } = input;
    const user = await Staff.findOne({ email });
    if (!user) {
      throw Error(MESSAGES.USER.INVALID_USER_ERROR);
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      throw Error(MESSAGES.USER.INVALID_PASSWORD_ERROR);
    }
    return user;
  };

     //Edit a Staff
     exports.updateStaff = async (id, StaffUpdate) => {
        return await Staff.findByIdAndUpdate(id, StaffUpdate, {new : true})
    }
    //Delete a Staff
    exports.deleteStaff = async(id) => {
        return await Staff.findByIdAndDelete(id)
    }
    //Get a single Staff
    exports.fetchOne = async(filter) => {
        return await Staff.findOne(filter)
    }

     //Get a single Staff
     exports.fetchById = async(filter) => {
      return await Staff.findById(filter)
  }

    //Get All Staffs
    exports.fetchAll = async (filter) => {
        return await Staff.find(filter)
    }