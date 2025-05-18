import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    let user;
    if (req.isAuthenticated && req.isAuthenticated()) {
      user = await User.findById(req.user.id || req.user._id).select(
        "-password"
      );
    } else if (req.userId) {
      user = await User.findById(req.userId).select("-password");
    }
    if (!user) return res.status(401).json({ error: "Not authenticated" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const saveSnippet = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });
    const { snippetId } = req.body;
    await User.findByIdAndUpdate(userId, {
      $addToSet: { savedSnippets: snippetId },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Could not save snippet" });
  }
};

export const unsaveSnippet = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });
    const { snippetId } = req.body;
    await User.findByIdAndUpdate(userId, {
      $pull: { savedSnippets: snippetId },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Could not unsave snippet" });
  }
};
