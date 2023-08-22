const { MESSAGES } = require('../configs/constants.config');
const loanService = require('../services/loan.service')

// Register loan
exports.register = async (req, res) => {
    const Info = req.body;
  
    try {
        var member_ippis
        switch(req.path){
            // Perform this function as a staff
            case 'staff': 
                member_ippis = Info.member_ippis
                break;
            
            // Set member ID to logged in user
            default: 
                member_ippis = req.ippis
        }
        
        // If there is any existing loan "Pending" throw an error
        await loanService.nonExistingLoan(member_ippis);

        // Create Loan
        const loanData = await loanService.createloan({...Info, created_by: req.user, member_ippis});

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
    const data = req.body
    
    try {   
        // Since there is just on pending loan a member can have at a time there
        // won't need to ask for the loan id from the member when updating
        var member_ippis
        switch(req.path){
            // Perform this function as a staff
            case 'staff': 
                member_ippis = req.params.ippis
                break;
            
            // Set member ID to logged in user
            default: 
                member_ippis = req.ippis
        }
        
        // Gets the existing Loan, The query below gets the pending loan of the user ippis 
        const loan = await loanService.findOne({status: "Pending", member_ippis})
        if (!loan) throw new Error(MESSAGES.LOAN.INVALID_LOAN_ID)

        const updatedData = await loanService.update(loan._id, data) 

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
        // Since there is just on pending loan a member can have at a time there
        // won't need to ask for the loan id from the member when updating
        var member_ippis
        switch(req.path){
            // Perform this function as a staff
            case 'staff': 
                member_ippis = req.params.ippis
                break;
            
            // Set member ID to logged in user
            default: 
                member_ippis = req.ippis
        }
        
        // Gets the existing Loan, The query below gets the pending loan of the user ippis 
        const loan = await loanService.findOne({status: "Pending", member_ippis})
        if (!loan) throw new Error(MESSAGES.LOAN.INVALID_LOAN_ID)
    
        await loanService.delete({ _id: loan._id });
    
        return res.status(200).json({
            success: true,
            message: MESSAGES.LOAN.DELETED,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Fetch all loans belonging to a logged in member by email
exports.getMemberLoans = async (req, res) => {
    var member_ippis
    switch(req.path){
        case "staff":
            member_ippis = req.params.ippis;
        default: 
            member_ippis = req.ippis
    }

    try {
        // Check if the book to delete is the database
        const existingMember = await loanService.getAll({member_ippis})

        return res.status(201).json({
            success: true,
            message: MESSAGES.LOAN.FETCHED,
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