import express from "express";
import {
  signup,
  login,
  getMe,
  saveSnippet,
  unsaveSnippet,
} from "../controllers/auth.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Authenticated user info
router.get("/me", getMe);
router.post("/save-snippet", saveSnippet);
router.post("/unsave-snippet", unsaveSnippet);

export default router;
