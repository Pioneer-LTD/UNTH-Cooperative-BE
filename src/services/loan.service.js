const { MESSAGES } = require("../configs/constants.config")
const loanModel = require("../models/loan.model")

class loanService {

    // register a loan model
    async createloan(loan) {
        return await loanModel.create(loan)
    }

    async existingLoan(ippis){
        const filter = { status: { $in: ["Pending", "Active"] }, member_ippis: ippis };
        const search = await loanModel.findOne(filter)
        if (search) return search;
        else throw new Error(MESSAGES.LOAN.INVALID_LOAN_ID); 
    }

    async nonExistingLoan(ippis){
        const filter = { status: { $in: ["Pending", "Active"] }, member_ippis: ippis };
        const search = await loanModel.findOne(filter)
        if (!search) return true
        else throw new Error(MESSAGES.LOAN.INVALID_LOAN_EXISTING); 
    }

     // find a loan by their id
     async findOne(filter){
        return await loanModel.findOne(filter)
    }

    // Edit a loan
    async update(id, data) {
        // return await loanModel.findOneAndUpdate(id, { $set: data }, { new: true }).select("-__v -createdAt -updatedAt");

        return await loanModel.findByIdAndUpdate(id, data, { new: true })
    }

    // Delete a loan
    async delete(filter){
        return await loanModel.findByIdAndDelete(filter)
    }

   

    // // find a loan by their id
    // async findOne(filter){
    //     return await loanModel.findOne(filter)
    // }

    // Get all loans 
    async getAll(filter) {
        return await loanModel.find(filter)
    }
}

module.exports = new loanService()