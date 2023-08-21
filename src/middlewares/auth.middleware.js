const { MESSAGES } = require('../configs/constants.config')
const { verifyToken } = require('../utils/jwt.util')
const Staff = require('../models/staff.model')

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

        req.user = { _id : decoded?._id};
        req.path = { path : decoded?.path};
        if (decoded?.ippis) { req.ippis = decoded?.ippis; }
        
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message })                       
    }
};