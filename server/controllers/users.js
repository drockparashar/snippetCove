import User from "../models/User.js";
import { buildUserProfile } from "./utils.js";

// GET /api/users/id/:id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const profile = await buildUserProfile(user);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
