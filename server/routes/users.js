import express from "express";
import { getUserById } from "../controllers/users.js";

const router = express.Router();

// GET /api/users/id/:id - Get user by ID
router.get("/id/:id", getUserById);

export default router;
