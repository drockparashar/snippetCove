import express from "express";
import passport from "passport";
import dotenv from "dotenv";

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
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Use redirect from state param if available
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
    // Use environment variable for frontend URL
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(`${frontendUrl}${redirectUrl}`);
  }
);

export default router;
