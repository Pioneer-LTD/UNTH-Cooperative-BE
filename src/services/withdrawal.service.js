const withdrawModel = require('../models/withdrawal.model')

exports.createWithdrawal = async(input) => {
    return await withdrawModel.create(input)
}

//Edit a withdraw
exports.updateWithdrawal = async (id, input) => {
    return await withdrawModel.findByIdAndUpdate(id, input, {new : true})
}
//Delete a withdraw
exports.deleteWithdrawal = async(id) => {
    return await withdrawModel.findByIdAndDelete(id)
}
//Get a single withdrawal
exports.fetchOne = async(input) => {
    return await withdrawModel.findOne(input)
}

 //Get a single withdrawal by Id
 exports.fetchById = async(id) => {
  return await withdrawModel.findById(id)
}

//Get All withdrawal
exports.fetchAll = async (input) => {
    return await withdrawModel.find(input)
}