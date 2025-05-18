import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const auth = (req, res, next) => {
  // Passport session-based authentication
  if (req.isAuthenticated && req.isAuthenticated()) {
    req.userId = req.user.id || req.user._id;
    return next();
  }

  // JWT authentication fallback
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ error: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
