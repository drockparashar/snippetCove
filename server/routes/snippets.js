import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  searchSnippets,
  getTotalUpvotesByUser,
  upvoteSnippet,
  removeUpvoteFromSnippet,
} from "../controllers/snippets.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createSnippet); // <-- Requires authentication
router.get("/", getSnippets);
router.get("/search", searchSnippets);
router.get("/:id", getSnippetById);
router.get("/user/:id/upvotes", getTotalUpvotesByUser);
router.post("/upvote", upvoteSnippet);
router.post("/upvote/remove", removeUpvoteFromSnippet);

export default router;
