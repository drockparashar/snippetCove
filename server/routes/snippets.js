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
import { body } from "express-validator";
import rateLimit from "express-rate-limit";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

// Rate limiter: max 10 snippet submissions per hour per IP
const createSnippetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: "Too many snippets created from this IP, please try again later.",
  },
});

// Sanitization middleware for snippet creation
function sanitizeSnippetInput(req, res, next) {
  if (req.body.title)
    req.body.title = sanitizeHtml(req.body.title, {
      allowedTags: [],
      allowedAttributes: {},
    });
  if (req.body.code)
    req.body.code = sanitizeHtml(req.body.code, {
      allowedTags: [],
      allowedAttributes: {},
    });
  if (Array.isArray(req.body.tags))
    req.body.tags = req.body.tags.map((tag) =>
      sanitizeHtml(tag, { allowedTags: [], allowedAttributes: {} })
    );
  next();
}

router.post(
  "/",
  auth,
  createSnippetLimiter,
  [
    body("title").isString().trim().notEmpty().isLength({ max: 100 }),
    body("code").isString().trim().notEmpty(),
    body("language").isString().trim().notEmpty(),
    body("tags").isArray({ min: 1 }),
    body("tags.*").isString().trim().notEmpty().isLength({ max: 30 }),
  ],
  sanitizeSnippetInput,
  createSnippet
);
router.get("/", getSnippets);
router.get("/search", searchSnippets);
router.get("/:id", getSnippetById);
router.get("/user/:id/upvotes", getTotalUpvotesByUser);
router.post("/upvote", upvoteSnippet);
router.post("/upvote/remove", removeUpvoteFromSnippet);

export default router;
