const jwt = require ('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;

exports.generateToken = (payload, options) => {
  return jwt.sign(payload, JWT_SECRET, { ...options });
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      expired: false,
      decoded,
    };
  } catch (e) {
    return {
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
