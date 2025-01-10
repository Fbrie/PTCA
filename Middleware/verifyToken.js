const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || '';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
}


// Role-based authorization middleware
function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access Denied. You do not have permission to access this resource.' });
      }
      next();
    };
  }


module.exports = verifyToken;

