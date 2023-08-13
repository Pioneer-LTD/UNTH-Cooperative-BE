const { MESSAGES } = require("../configs/constants.config")
const memberModel = require("../models/member.model")

class memberService {

    // register a member model
    async createMember(member) {
        return await memberModel.create(member)
    }

    // Edit a member
    async update(id, data) {
        // return await memberModel.findOneAndUpdate(id, { $set: data }, { new: true }).select("-__v -createdAt -updatedAt");

        return await memberModel.findByIdAndUpdate(id, data, { new: true })
    }

    // Delete a member
    async delete(filter){
        return await memberModel.findByIdAndDelete(filter)
    }

    // find a member by their id
    async findOne(filter){
        return await memberModel.findOne(filter)
    }

    async findMemberByIppis(ippis){
        const user = await memberModel.findOne({ ippis: ippis });
        if(!user) throw Error(MESSAGES.USER.INVALID_USER_ERROR);
        return user
    }

    // Get all members 
    async getAll(filter) {
        return await memberModel.find(filter)
    }
}

module.exports = new memberService()