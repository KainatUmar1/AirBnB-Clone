import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  try {
    // Verify token using JWT_SECRET from the config file
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
