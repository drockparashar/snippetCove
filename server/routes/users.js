import express from "express";
import {
  getUserById,
  followUser,
  unfollowUser,
  getUserByUsername,
} from "../controllers/users.js";
import { avatarUpload } from "../controllers/avatar.js";

const router = express.Router();

// GET /api/users/id/:id - Get user by ID (specific route first)
router.get("/id/:id", getUserById);
// GET /api/users/username/:username - Get user by username
router.get("/username/:username", getUserByUsername);

// Route to follow a user
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.post("/upload", avatarUpload);

export default router;
