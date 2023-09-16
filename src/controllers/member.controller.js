const { MESSAGES, MAXAGE } = require('../configs/constants.config');
const memberService = require('../services/member.service')
const { generateToken } = require('../utils/jwt.util');


// Register member
exports.register = async (req, res) => {
    const Info = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingIppis = await memberService.getAll({
        ippis: Info.ippis,
      });
      
      // Throw error if email or phone number is already existing
      if ( existingIppis.length > 0 ) {
        return res.status(400).json({ message: MESSAGES.USER.DUPLICATE_ERROR });
      }
  
      // Create member
      const memberData = await memberService.createMember({...Info, password: Info.ippis });

        // Send Welcoming Email
        // await sendMail(memberInfo.email, memberInfo.firstName, "member")
      
  
      // Response
      return res.status(200).json({ 
        Success: true, 
        message: MESSAGES.USER.CREATED, data: memberData 
      });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

// Login Member
exports.login = async (req, res) => {
  const { ippis, password } = req.body;

  try {
    const existingMember = await memberService.findOne({ ippis });

    // check password
    const checkPassword = await existingMember.matchPassword(password);
    if (!checkPassword) {
      return res.status(400).json({ message: MESSAGES.USER.INVALID_PASSWORD_ERROR }); 
    }

    const token = generateToken({ _id: existingMember._id, ippis: existingMember.ippis, path: "member" }, { expiresIn: MAXAGE });

    res.status(200).json({
      token: token,
      Token_Type: "Bearer",
      Member_id: existingMember._id
    });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Update a user
exports.updateMember = async (req, res) => {
  const updateData = req.body

  try{
    var ippis

    switch(req.path){
      case("staff"):
        ippis = req.params.ippis
        break;

      default:
        ippis= req.user.ippis
        break;
    }
    const user = await memberService.findMemberByIppis(ippis)

    // Check if selected email is already taken
    if(updateData.ippis){
      const ippisAvailable = await memberService.findOne({ email: updateData.ippis })

      // throws an error if the ippis selected is taken
      if (ippisAvailable) throw new Error(MESSAGES.USER.DUPLICATE_EMAIL)
    }
    // Update 
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
    var ippis

    switch(req.path){
      case("staff"):
        ippis = req.params.ippis
        break;

      default:
        ippis= req.user.ippis
        break;
    }
    try {
        const existingMember = await memberService.findOne({ ippis });
        if (!existingMember) {
            return res.status(404).json({ message: MESSAGES.USER.INVALID_USER_ERROR });};
    
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

// Fetch my profile
exports.getMyProfile = async (req, res) => {
  const ippis = req.user.ippis;
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
        if (!myProfile) throw new Error(MESSAGES.USER.INVALID_USER_ERROR)

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