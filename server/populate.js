import Snippet from "./models/Snippet.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/populate", async (req, res) => {
  try {
    // Read and parse the entries.json file
    const file = await fs.readFile(path.join(__dirname, "entries.json"), "utf-8");
    const entries = JSON.parse(file);

    // Save each entry to the database
    const insertedSnippets = await Promise.all(
      entries.map(async (entry) => {
        const snippet = new Snippet(entry);
        return await snippet.save();
      })
    );

    res.status(201).json({ message: "Snippets populated", data: insertedSnippets });
  } catch (err) {
    console.error("Error populating snippets:", err);
    res.status(500).json({ message: "Failed to populate snippets", error: err.message });
  }
});

export default router;
