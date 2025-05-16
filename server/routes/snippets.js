import express from "express";
import { createSnippet, getSnippets } from "../controllers/snippets.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createSnippet);
router.get("/", getSnippets);

export default router;