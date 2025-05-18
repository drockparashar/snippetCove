import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import snippetRoutes from "./routes/snippets.js";
import authRoutes from "./routes/authROutes.js"
import populate from "./populate.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/snippets", snippetRoutes);
app.use("/api/auth",authRoutes);
app.use("/",populate);


// Database
connectDB();

export default app;