import express from "express";
import {
  signup,
  login,
  getMe,
  saveSnippet,
  unsaveSnippet,
} from "../controllers/auth.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated user info
router.get("/me", auth, getMe);
router.post("/save-snippet", auth, saveSnippet);
router.post("/unsave-snippet", auth, unsaveSnippet);

export default router;
