import express from "express";

const router = express.Router();

router.get("/check", (req, res) => {
  // JWT-based check
  const token =
    req.header("x-auth-token") ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return res.json({ authenticated: false });
  try {
    const jwt = require("jsonwebtoken");
    const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, userId: decoded.id });
  } catch (err) {
    res.json({ authenticated: false });
  }
});

export default router;
