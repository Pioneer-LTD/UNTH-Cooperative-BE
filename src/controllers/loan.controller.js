const { MESSAGES } = require('../configs/constants.config');
const loanService = require('../services/loan.service')

// Register loan
exports.register = async (req, res) => {
    const Info = req.body;
  
    try {
        var member_id
        switch(req.path){
            // Perform this function as a staff
            case 'staff': 
                member_id = Info.member_id
                break;
            
            // Set member ID to logged in user
            default: 
                member_id = req.user
        }

        // Check if there is any existing loan
        const existingloan = await loanService.existingLoan({
            ippis: Info.ippis,
        });

        // Throw error if an existing loan is found
        if (existingloan) {
            return res.status(400).json({ 
                success: false, 
                message: MESSAGES.LOAN.INVALID_LOAN_EXISTING });
        }

        // Create loan
        loanData= await loanService.createMember({...Info, created_by: req.user, member_id});
  
        // Response
        res.status(200).json({ 
            success: true, 
            message: MESSAGES.LOAN.CREATED, 
            data: loanData 
        });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

// Update a user
exports.updateLoan = async (req, res) => {
    const _id = req.params.loan_id
    const updateData = req.body
    
    try {
            // Gets the existing Loan
            const loan = await loanService.findOne(_id)

            const updatedData = await loanService.update(loan._id, updateData) 

            return res.status(200).json({ 
                success: true, 
                message: MESSAGES.LOAN.UPDATED, 
                data: updatedData 
            })
            // Send an email here 
    } 
    catch (error) {
        return res.status(401).json({ success: false, message: error.message })                       
    }    
};

// Wipe a Member
exports.deleteLoan = async (req, res) => {
    // On this controller only pending loans can be deleted
    const id = req.params.loan_id
    
    try {
        // Gets the existing pending Loan
        const loan = await loanService.findOne({ status: { $in: ["Pending"] }, _id: id })
    
        await loanService.delete({ _id: loan._id }); // <= actually deletes the loan from the db
    
        return res.status(200).json({
            success: true,
            message: MESSAGES.LOAN.DELETED,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all loans belonging to a logged in member by email
exports.getMembersLoans = async (req, res) => {
    var member_id
    switch(req.path){
        case "staff":
            member_id = req.params.id;
        default: 
            member_id = req.user
    }

    try {
        // Check if the book to delete is the database
        const existingMember = await loanService.getAll({member_id})

        return res.status(201).json({
            success: true,
            message: MESSAGES.USER.FETCHED,
            data: existingMember
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch my Profile
exports.getLoanByID = async (req, res) => {

    try {
        const myProfile = await loanService.findOne({
            _id: req.params.loan_id
        });

        return res.status(201).json({
            success: true,
            message: MESSAGES.USER.FETCHEDALL,
            data: myProfile
        });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

// Fetch all Patients in the db
exports.fetchAllLoans = async (req, res) => {
    try {
        // Find all the users in the system excluding the deleted ones
        const existingUser = await loanService.getAll();
    
        res.status(200).json({
            success: true,
            message: MESSAGES.USER.FETCHEDALL,
            data: existingUser,
        });

    } catch(error) {
        res.status(403).json({ success: false, message: error.message });
    }
};