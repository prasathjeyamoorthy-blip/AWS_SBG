const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check if Bearer token is provided in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecurepiratesecretkey123!');

      // Add user info from payload to request object
      req.user = {
        id: decoded._id || decoded.id, // Support both _id and id
        email: decoded.email
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }
};

module.exports = { protect };
