import Snippet from "../models/Snippet.js";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const createSnippet = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const { title, code, language, tags } = req.body;
  try {
    const snippet = new Snippet({
      title,
      code,
      language,
      tags,
      author: req.userId,
    });
    await snippet.save();
    // Add snippet to user's createdSnippets
    await User.findByIdAndUpdate(
      req.userId,
      { $push: { createdSnippets: snippet._id } },
      { new: true }
    );
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Error creating snippet" });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.aggregate([{ $sample: { size: 20 } }]);
    // Populate author field manually since aggregate doesn't support populate
    const populatedSnippets = await Snippet.populate(snippets, {
      path: "author",
      select: "name",
    });
    res.json(populatedSnippets);
  } catch (err) {
    res.status(500).json({ error: "Error fetching snippets" });
  }
};

export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Error fetching snippet" });
  }
};

export const searchSnippets = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }
  try {
    const regex = new RegExp(q, "i"); // case-insensitive
    const snippets = await Snippet.find({
      $or: [{ title: regex }, { tags: { $in: [regex] } }, { language: regex }],
    }).populate("author", "name");
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Error searching snippets" });
  }
};

// Controller to get total upvotes for a user's created snippets
export const getTotalUpvotesByUser = async (req, res) => {
  const { id } = req.params; // Use 'id' to match the route
  try {
    const snippets = await Snippet.find({ author: id });
    const totalUpvotes = snippets.reduce((sum, s) => sum + (s.upvotes || 0), 0);
    res.json({ totalUpvotes });
  } catch (err) {
    res.status(500).json({ error: "Error fetching upvotes" });
  }
};

// Controller to upvote a snippet (requires userId in body)
export const upvoteSnippet = async (req, res) => {
  const { snippetId, userId } = req.body;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!snippetId) {
    return res.status(400).json({ error: "Missing snippetId" });
  }
  try {
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    // Check if user has already upvoted
    if (snippet.upvotedBy && snippet.upvotedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already upvoted this snippet" });
    }
    snippet.upvotes += 1;
    snippet.upvotedBy = snippet.upvotedBy || [];
    snippet.upvotedBy.push(userId);
    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Error upvoting snippet" });
  }
};

// Controller to remove upvote from a snippet (requires userId in body)
export const removeUpvoteFromSnippet = async (req, res) => {
  const { snippetId, userId } = req.body;
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  if (!snippetId) {
    return res.status(400).json({ error: "Missing snippetId" });
  }
  try {
    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }
    // Check if user has upvoted
    if (!snippet.upvotedBy || !snippet.upvotedBy.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have not upvoted this snippet" });
    }
    snippet.upvotes = Math.max(0, snippet.upvotes - 1);
    snippet.upvotedBy = snippet.upvotedBy.filter(
      (uid) => uid.toString() !== userId.toString()
    );
    await snippet.save();
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Error removing upvote" });
  }
};
