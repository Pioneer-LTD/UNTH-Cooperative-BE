const { MESSAGES } = require('../configs/constants.config');
const memberService = require('../services/member.service')

// Register member
exports.register = async (req, res) => {
    const Info = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingIppis = await memberService.findOne({
        ippis: Info.ippis,
      });
  
      const existingEmail = await memberService.findOne({
        email: Info.email,
      });
      const existingNumber = await memberService.findOne({
        mobile_phone: Info.mobile_phone,
      });
  
      // Throw error if email or phone number is already existing
      if (existingIppis || existingEmail || existingNumber) {
        return res.status(400).json({ message: MESSAGES.USER.DUPLICATE_ERROR });
      }
  
        // Create member
        const memberData = await memberService.createMember({...Info });

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
  const ippis = req.params.ippis
  const updateData = req.body

  try{
      const user = await memberService.findMemberByIppis(ippis)

      // Check if selected email is already taken
      if(updateData.email){
          const emailAvailable = await memberService.findOne({ email: updateData.email })

          // throws an error if the username selected is taken
          if (emailAvailable){ 
              return res.status(403).json({ success: false, message: MESSAGES.USER.DUPLICATE_EMAIL})
          }
      }
    const updatedData = await memberService.update(user._id, updateData) 

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

// Wipe a Member
exports.deleteMember = async (req, res) => {
    const ippis = req.params.ippis
  
    try {
        const existingMember = await memberService.findOne({ ippis });
        if (!existingMember)
            return res.status(404).json({ message: MESSAGES.USER.INVALID_USER_ERROR });
    
        await memberService.delete({ _id: existingMember._id }); // <= actually deletes the member from the db
    
        return res.status(200).json({
            success: true,
            message: MESSAGES.USER.DELETED,
        });
    } catch (error) {
      res.status(403).json({ success: false, message: error.message });
    }
};

// Fetch a single patient by email
exports.getMemberByIppis = async (req, res) => {
    const ippis = req.params.ippis;

    try {
      // Check if the book to delete is the database
      const existingMember = await memberService.findMemberByIppis(ippis)

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
exports.getMemberByID= async (req, res) => {
    try {
        const myProfile = await memberService.findOne({
            _id: req.params.id
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