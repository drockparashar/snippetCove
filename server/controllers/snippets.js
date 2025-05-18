import Snippet from "../models/Snippet.js";
import User from "../models/User.js";

export const createSnippet = async (req, res) => {
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
