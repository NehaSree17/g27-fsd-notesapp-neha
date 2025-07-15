const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use actual .env value
    req.user = decoded; // Attach user info to request
    next(); // Proceed to route
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
