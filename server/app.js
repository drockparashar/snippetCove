import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import snippetRoutes from "./routes/snippets.js";
import authRoutes from "./routes/authRoutes.js";
import githubAuthRoutes from "./routes/githubAuth.js";
import checkAuthRoutes from "./routes/checkAuth.js";
import populate from "./populate.js";
import session from "express-session";
import passport from "passport";
import "./controllers/passport.js";
import dotenv from "dotenv";
import { getSessionMiddleware } from "./config/session.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Session middleware (required for Passport)
app.use(getSessionMiddleware());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", githubAuthRoutes);
app.use("/api/auth", checkAuthRoutes);
app.use("/", populate);

// Database
connectDB();

export default app;
