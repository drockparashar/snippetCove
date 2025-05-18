import express from "express";
import passport from "passport";

const router = express.Router();

// Start GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Successful authentication
    // Redirect to frontend login success page
    res.redirect("http://localhost:3000/submit"); // Change to your frontend URL/route
  }
);

export default router;
