const { MESSAGES } = require('../configs/constants.config')
const { verifyToken } = require('../utils/jwt.util')
const Staff = require('../models/staff.model')

exports.isAuth = async (req, res, next) => {
    const token = req.headers['authorization']
    ? req.headers['authorization'].split('Bearer ')[1]
    : null;

    if (!token) {
        next(MESSAGES.TOKEN.NOTFOUND);
      } else {
        const { decoded, expired } = verifyToken(token);
    
        if (expired) {
          next(MESSAGES.TOKEN.EXPIRED);
        }

        const user = await Staff.findById(decoded)

        if (!user) {
         next( MESSAGES.TOKEN.NOTFOUND);
        }

        req.user = { _id : decoded?._id};

         next();
   
     }
}
