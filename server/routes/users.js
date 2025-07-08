import express from "express";
import { getUserById, followUser, unfollowUser } from "../controllers/users.js";
import { avatarUpload } from "../controllers/avatar.js";

const router = express.Router();

// GET /api/users/id/:id - Get user by ID
router.get("/id/:id", getUserById);

// Route to follow a user
router.post("/follow", followUser);
router.post("/unfollow", unfollowUser);
router.post("/upload",avatarUpload)

export default router;
