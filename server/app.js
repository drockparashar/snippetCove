import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
// import authRoutes from "./routes/auth.js";
import snippetRoutes from "./routes/snippets.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);

// Database
connectDB();

export default app;