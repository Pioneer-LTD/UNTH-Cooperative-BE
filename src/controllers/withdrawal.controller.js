 const services = require('../services/withdrawal.service')
 
 //create a Withdrawal
exports.createWithdrawal = async (req, res, next) => {        
    try {
      // console.log(req.user._id)
       const newWithdrawal = await services.createWithdrawal({ ...req.body, authorised_by: req.user._id, created_by: req.user._id });    
       res.status(201).json({ success: true, message: 'Withdrawal created Successfully', data: newWithdrawal })
   } catch (error) {
    next(error)
    }
       }
 
 //Get a Single Withdrawal by Id
 exports.findWithdrawal = async (req, res, next) => {
    try {
 const Withdrawal = await services.fetchById({ _id: req.params.id })
 if(!Withdrawal)
 {  return res.status(404).json({success: false, message: 'Withdrawal not found'})}
     return res.status(200).json({success: true,message: Withdrawal})    
    } catch (error) {
      next(error)
    }
}

//Get All Withdrawals
exports.findAllWithdrawal = async (req, res, next) => {
    try {
    const Withdrawals = await services.fetchAll()
    return res.status(200).json({ success: true, message: 'Withdrawals Fetched Successfully', data: Withdrawals })
    } catch(error) {
      next(error)
    }
}

//Update Withdrawal
 exports.updateWithdrawal = async (req, res, next) => {
    const updateData = req.body;
    try { 
const Withdrawal = await services.fetchById(req.params.id);
//check Withdrawal
if(!Withdrawal) {
 res.status(403).json({success: false, message: 'Withdrawal to update not found' })
        } 
//check for existing Withdrawal 
if(updateData.email){
const WithdrawalUpdate = await services.fetchOne({ email: updateData.email.toLowerCase()})
if(WithdrawalUpdate){
  if(WithdrawalUpdate._id.toString() !== id){
    res.status(403).json({ 
      success: false, 
      message: 'Withdrawal already exists'
    })}
  }
}
//update Withdrawal
const updatedData = await services.updateWithdrawal(req.params.id, updateData)
res.status(200).json({ success: true, message: 'Withdrawal updated successfully', data: updatedData})
} 
 catch (error) {next(error);}
}

 exports.deleteWithdrawal = async (req, res, next) =>{
try {
//check if Withdrawal exits before updating
const checkWithdrawal = await services.fetchById({ _id: req.params.id })
if(!checkWithdrawal) return res.status(404).json({ success: false, message: 'Withdrawal not found'})
//delete Withdrawal 
await services.deleteWithdrawal(req.params.id)
return res.status(200).json({success: true,message: 'Withdrawal Deleted Successfully', data: checkWithdrawal})}
catch (error) {next(error);}
}