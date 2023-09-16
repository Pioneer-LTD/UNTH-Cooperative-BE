const { MESSAGES } = require('../configs/constants.config')
const { verifyToken } = require('../utils/jwt.util')
const Staff = require('../models/staff.model')
const Member = require('../models/member.model')

exports.isAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        ? req.headers['authorization'].split('Bearer ')[1]
        : null;

        if (!token) {
            return res.status(401).json({ success: false, message: MESSAGES.TOKEN.NOTFOUND })
        }
        const { decoded, expired } = verifyToken(token); 
        
        if (expired) {
            return res.status(401).json({ success: false, message: MESSAGES.TOKEN.EXPIRED }) 
        }
        if (decoded.path == 'staff') {
            const user = await Staff.findById(decoded?._id);
      
            if (!user) {
              next(Error(MESSAGES.USER.INVALID_USER_ERROR));
            }
           
            req.user = user
        }
        if (decoded.path == 'member') {
            const user = await Member.findById(decoded?._id);
      
            if (!user) {
              next(Error(MESSAGES.USER.INVALID_USER_ERROR));
            }
            req.user = user
        }

        // req.user = { _id : decoded?._id};
        req.path = { path : decoded?.path};
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })
    }
};