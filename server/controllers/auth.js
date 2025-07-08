import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { buildUserProfile } from "./utils.js";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

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
    if (req.userId) {
      user = await User.findById(req.userId).select("-password").lean();
    }
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    const profile = await buildUserProfile(user);
    res.json({ ...user, ...profile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const saveSnippet = async (req, res) => {
  try {
    const userId = req.userId;
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
    const userId = req.userId;
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) return res.status(401).json({ error: "Not authenticated" });

    const {
      name,
      email,
      bio,
      location,
      website,
      githubUsername,
      twitterUsername,
    } = req.body;

    let avatarUrl;
    if (req.file) {
      // Upload avatar to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      avatarUrl = uploadResult.secure_url;
    }

    const updatedFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(bio && { bio }),
      ...(location && { location }),
      ...(website && { website }),
      ...(githubUsername && { githubUsername }),
      ...(twitterUsername && { twitterUsername }),
      ...(avatarUrl && { profilePicture: avatarUrl }),
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Could not update profile" });
  }
};
