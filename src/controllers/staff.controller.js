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
      Token: token,
      staff_id: _id
    });

  } catch (error) {
      return res.status(500).json({
        success: false, 
        message: error.message 
      })
  }
};

//Get a Single by Id
exports.findStaff = async (req, res, next) => {
  try {
    const Staff = await services.fetchById({ _id: req.params.id })

    if(!Staff) {  
      return res.status(404).json({
        success: false, 
        message: MESSAGES.USER.INVALID_USER_ERROR
      })
    }

    return res.status(200).json({
      success: true, message: MESSAGES.USER.FETCHED, data : Staff
    })    
  } catch (error) {
      return res.status(500).json({
        success: false, 
        message: error.message 
      })
  }
}

//Get my profile
exports.getMyProfile = async (req, res, next) => {
  const _id = req.user._id.toString()

  // console.log(req.user)
  try {
    const Staff = await services.fetchById({ _id })

    if(!Staff) {  
      return res.status(404).json({
        success: false, 
        message: MESSAGES.USER.INVALID_USER_ERROR
      })
    }

    return res.status(200).json({
      success: true, message: MESSAGES.USER.FETCHED, data : Staff
    })
  } catch (error) {
      return res.status(500).json({
        success: false, 
        message: error.message 
      })
  }
}

    //Get All Staffs
exports.findAllStaff = async (req, res, next) => {
  try {
    const Staffs = await services.fetchAll()

    return res.status(200).json({ 
      success: true, message: MESSAGES.USER.FETCHEDALL, data: Staffs
    })
  } catch(error) {
      return res.status(500).json({
        success: false, 
        message: error.message 
      })
    }
}

//Update Staff
exports.updateStaff = async (req, res, next) => {
  const updateData = req.body;
  try { 
    const Staff = await services.fetchOne(req.user._id);
    
    //check Staff
    if (!Staff) {
      res.status(403).json({
        success: false, message: MESSAGES.USER.INVALID_USER_ERROR 
      })
    } 

    //check for existing Staff 
    if(updateData.email){
    const StaffUpdate = await services.fetchOne({ email: updateData.email})
    
    if(StaffUpdate){
      if(StaffUpdate._id.toString() !== req.params.id){
        res.status(403).json({ 
          success: false, 
          message: MESSAGES.USER.DUPLICATE_EMAIL
        })}
      }
    }
    //update Staff
    const updatedData = await services.updateStaff( req.params.id, updateData)
    
    return res.status(200).json({ 
      success: true, 
      message: MESSAGES.USER.UPDATED, 
      data: updatedData
    })
  } catch (error) {
      return res.status(500).json({
        success: false, 
        message: error.message 
      })
  }
}

exports.deleteStaff = async (req, res, next) =>{
  const _id = req.user._id.toString()

  try {
    //check if Staff exits before updating
    const checkStaff = await services.fetchOne({ _id })

    if(!checkStaff) {
      return res.status(404).json({ 
        success: false, message: MESSAGES.USER.INVALID_USER_ERROR
      })
    }
    
    //delete Staff 
    await services.deleteStaff(_id)
    return res.status(200).json({
      success: true,
      message: MESSAGES.USER.DELETED, 
      data: checkStaff
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false, 
      message: error.message 
    })
  }
}