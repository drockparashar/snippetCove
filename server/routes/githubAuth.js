import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

// Start GitHub OAuth with state param for redirect
router.get("/github", (req, res, next) => {
  // Pass redirect as state param to GitHub
  const state = req.query.redirect
    ? encodeURIComponent(req.query.redirect)
    : "";
  passport.authenticate("github", {
    scope: ["user:email"],
    state,
  })(req, res, next);
});

// GitHub OAuth callback using state param for redirect
import User from "../models/User.js";

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    let redirectUrl = req.query.state
      ? decodeURIComponent(req.query.state)
      : null;
    if (
      !redirectUrl ||
      typeof redirectUrl !== "string" ||
      !redirectUrl.startsWith("/")
    ) {
      redirectUrl = "/snippets";
    }
    const frontendUrl = process.env.FRONTEND_URL;
    // Generate JWT for the authenticated user
    const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
    const user = req.user;
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });
    // Redirect to frontend with token as query param
    res.redirect(`${frontendUrl}${redirectUrl}?token=${token}`);
  }
);

export default router;
