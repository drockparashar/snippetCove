import Snippet from "../models/Snippet.js";

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
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Error creating snippet" });
  }
};

export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().populate("author", "name");
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: "Error fetching snippets" });
  }
};