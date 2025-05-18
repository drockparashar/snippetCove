import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  searchSnippets,
} from "../controllers/snippets.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createSnippet); // <-- Requires authentication
router.get("/", getSnippets);
router.get("/search", searchSnippets);
router.get("/:id", getSnippetById);

export default router;