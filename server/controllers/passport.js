import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ["user:email"], // Request user email from GitHub
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        // Safely get email if available
        let email =
          profile.emails && profile.emails[0] && profile.emails[0].value
            ? profile.emails[0].value
            : null;
        if (!user && email) {
          // If not found by githubId, try by email
          user = await User.findOne({ email });
        }
        if (!user) {
          if (!email) {
            // No email available from GitHub, cannot create user
            return done(
              new Error(
                "No email associated with this GitHub account. Please make your email public or add an email to your GitHub account."
              ),
              null
            );
          }
          user = new User({
            name: profile.displayName || profile.username,
            email: email,
            githubId: profile.id,
            password: "", // No password for OAuth users
          });
          await user.save();
        } else if (!user.githubId) {
          // Link githubId if not already set
          user.githubId = profile.id;
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
