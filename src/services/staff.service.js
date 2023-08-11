const Staff = require('../models/staff.model');
const { MESSAGES } = require('../configs/constants.config');
//Create a Staff
exports.CreateStaff = async (input) => {
        const { fullname } = input;
      
        const staff = await Staff.findOne({ fullname });
      
        if (staff) {
          throw new MESSAGES.USER.DUPLICATE_EMAIL;
        }
      
        return await Staff.create(input);
 };

 //login Staff
 exports.Login = async (input) => {
    const { fullname, password } = input;
  
    const Staff = await Staff.findOne({ fullname });
    if (!Staff) throw new MESSAGES.USER.INVALID_EMAIL_ERROR;

    const isMatch = await Staff.matchPassword(password)
    if (!isMatch) {
      throw new HttpException(409, 'Invalid Password');
    }
    return Staff;
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