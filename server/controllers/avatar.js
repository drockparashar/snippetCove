// import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const avatarUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  cloudinary.uploader
    .upload_stream({ resource_type: "auto" }, async (error, result) => {
      if (error) {
        console.log("Error:", error);
        return res.status(500).json({ error: "Error uploading to Cloudinary" });
      }

      try {
        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, {
          profilePicture: result.secure_url,
        });

        res.json({ public_id: result.public_id, url: result.secure_url });
      } catch (err) {
        console.log("Database Error:", err);
        res.status(500).json({ error: "Error updating user profile picture" });
      }
    })
    .end(req.file.buffer);
};
