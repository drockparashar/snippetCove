import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import snippetRoutes from "./routes/snippets.js";
import authRoutes from "./routes/authRoutes.js";
import githubAuthRoutes from "./routes/githubAuth.js";
import checkAuthRoutes from "./routes/checkAuth.js";
import populate from "./populate.js";
import passport from "passport";
import "./controllers/passport.js";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://snippet-cove.vercel.app",
      "https://snippetcove.onrender.com",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
app.use(express.json());

// Removed session middleware
app.use(passport.initialize());

// Routes
app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", githubAuthRoutes);
app.use("/api/auth", checkAuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/", populate);

// Database
connectDB();

export default app;
