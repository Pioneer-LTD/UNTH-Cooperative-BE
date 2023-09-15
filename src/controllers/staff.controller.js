const { generateToken } = require('../utils/jwt.util');
const services = require('../services/staff.service');
const { MAXAGE, MESSAGES } = require('../configs/constants.config');

//create a Staff
exports.register = async (req, res, next) => {        
 try {
    const newStaff = await services.CreateStaff({ ...req.body });    
    res.status(201).json({ 
      success: true, 
      message: MESSAGES.USER.CREATED, 
      data: newStaff 
    })
} catch (error) {
    next(error) }
}

exports.login = async (req, res, next) => {
  try {
    const { _id } = await services.Login(req.body);

    // token generation with user details
    const token = generateToken({ _id, path: "staff" }, { expiresIn: MAXAGE });

    res.status(201).json({ 
      success: true, 
      message: MESSAGES.USER.LOGGEDIN, 
      Token: token
    });
  } catch (error) {
    next(error);
  }
};

//Get a Single by Id
exports.findStaff = async (req, res, next) => {
  try {
    const Staff = await services.fetchById({ _id: req.params.id })
    if(!Staff) {  
      return res.status(404).json({success: false, message: 'Staff not found'})
    }

    return res.status(200).json({success: true, message: MESSAGES.USER.FETCHED, data : Staff})    
  } catch (error) {
    next(error)
  }
}

    //Get All Staffs
    exports.findAllStaff = async (req, res, next) => {
        try {
        const Staffs = await services.fetchAll()
        return res.status(200).json({ success: true, message: 'Staffs Fetched Successfully', data: Staffs })
        } catch(error) {
          next(error)
        }
    }

    //Update Staff
     exports.updateStaff = async (req, res, next) => {
        const updateData = req.body;
        try { 
    const Staff = await services.fetchById(req.params.id);
    //check Staff
    if(!Staff) {
     res.status(403).json({success: false, message: 'Staff to update not found' })
            } 
    //check for existing Staff 
    if(updateData.email){
    const StaffUpdate = await services.fetchOne({ email: updateData.email.toLowerCase()})
    if(StaffUpdate){
      if(StaffUpdate._id.toString() !== id){
        res.status(403).json({ 
          success: false, 
          message: 'Staff already exists'
        })}
      }
   }
    //update Staff
    const updatedData = await services.updateStaff(req.params.id, updateData)
    res.status(200).json({ success: true, message: 'Staff updated successfully', data: updatedData})
 } 
     catch (error) {next(error);}
    }

     exports.deleteStaff = async (req, res, next) =>{
  try {
 //check if Staff exits before updating
 const checkStaff = await services.fetchById({ _id: req.params.id })
 if(!checkStaff) return res.status(404).json({ success: false, message: 'Staff not found'})
  //delete Staff 
  await services.deleteStaff(req.params.id)
  return res.status(200).json({success: true,message: 'Staff Deleted Successfully', data: checkStaff})}
 catch (error) {next(error);}
    }