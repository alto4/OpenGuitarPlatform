const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get JWT from request header
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    // 401 -> access denied
    return res.status(401).json({ message: 'No access token could be generated. Access denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid access token.' });
  }
};
