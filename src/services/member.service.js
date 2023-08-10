const memberModel = require("../models/member.model")

class memberService {

    // register a member model
    async createMember(member) {
        return await memberModel.create(member)
    }

    // Edit a member
    async update(id, memberData) {
        return await memberModel.findByIdAndUpdate(id, memberData, { 
            new: true
        })
    }

    // Delete a member
    async delete(filter){
        return await memberModel.findByIdAndDelete(filter)
    }

    // find a member by their id
    async findOne(filter){
        return await memberModel.findOne(filter)
    }

    // Get all members 
    async getAll(filter) {
        return await memberModel.find(filter)
    }
}

module.exports = new memberService()