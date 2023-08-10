const { MESSAGES } = require('../configs/constants.config');
const memberService = require('../services/member.service')

// Register member
exports.register = async (req, res) => {
    const Info = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingEmail = await memberService.findOne({
        email: memberInfo.email,
      });
      const existingNumber = await memberService.findOne({
        phoneNumber: memberInfo.phoneNumber,
      });
  
      // Throw error if email or phone number is already existing
      if (existingEmail || existingNumber) {
        return res.status(400).json({ message: MESSAGES.USER.DUPLICATE_ERROR });
      }
  
        // Create member
        const memberData = await memberService.createMember({ Info });

        // Send Welcoming Email
        // await sendMail(memberInfo.email, memberInfo.firstName, "member")
      
  
      // Response
      res.status(200).json({ Success: true, message: MESSAGES.USER.CREATED, data: memberData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

// Update a user
exports.updateMember = async (req, res) => {
    const updateData = req.body
    
    try{
        // Check if selected email is already taken
        if(updateData.email){
            const emailAvailable = await memberService.findOne({ email: updateData.email })

            // throws an error if the username selected is taken
            if (emailAvailable){ 
                return res.status(403).json({ success: false, message: MESSAGES.USER.DUPLICATE_EMAIL})
            }
        }
        const updatedData = await memberService.update(req.user, {updateData})

        return res.status(200).json({ 
            success: true, 
            message: MESSAGES.USER.UPDATED, 
            data: updatedData 
        })
    } 
    catch (error) {
        return res.status(401).json({ success: false, message: error.message })                       
    }    
}

// Fetch a single patient by email
exports.getMemberByIppis = async (req, res) => {
    const ippis = req.params.ippis;
  
    try {
      // Check if the book to delete is the database
      const existingPatient = await memberService.findOne({
        ippis: ippis,
      });
  
      if (!existingPatient) {
        return res.status(403).json({ 
            success: false, 
            message: MESSAGES.USER.INVALID_USER_ERROR 
        });
      }
      return res.status(201).json({
        success: true,
        message: MESSAGES.USER.FETCHED,
        data: existingPatient,
      });
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
    }
};

// Fetch my Profile
exports.getMemberByID= async (req, res) => {
    try {
        const myProfile = await memberService.findOne({
            _id: req.params.id
        });

        res.status(201).json({
            success: true,
            message: MESSAGES.USER.FETCHEDALL,
            data: myProfile
        });
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
};

// Fetch all Patients in the db
exports.fetchAllMember = async (req, res) => {
    try {
        // Find all the users in the system excluding the deleted ones
        const existingUser = await memberService.getAll();
    
        res.status(200).json({
            success: true,
            message: MESSAGES.USER.FETCHEDALL,
            data: existingUser,
        });

    } catch(error) {
        res.status(403).json({ success: false, message: error.message });
    }
};