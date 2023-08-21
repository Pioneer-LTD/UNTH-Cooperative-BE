const { MESSAGES } = require('../configs/constants.config')
const { verifyToken } = require('../utils/jwt.util')
const Staff = require('../models/staff.model')

exports.isAuth = async (req, res, next) => {
    const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

    if (!token) {
        next(new MESSAGES.TOKEN.NOTFOUND);
    } else {
        const { decoded, expired } = verifyToken(token);
    
        if (expired) {
          next(MESSAGES.TOKEN.EXPIRED);
        }

     if (decoded.role == 'staff') {
      const user = await Staff.findById(decoded?._id);

      if (!user) {
        next(new MESSAGES.USER.INVALID_USER_ERROR);
      }
    }
    req.user = { _id: decoded?._id, role: decoded.role }
        if (decoded?.ippis) req.ippis = decoded?.ippis;
        
        next(); 
    }
}