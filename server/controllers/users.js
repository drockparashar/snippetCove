import User from "../models/User.js";
import { buildUserProfile } from "./utils.js";

// GET /api/users/id/:id
export const getUserById = async (req, res) => {
  try {
    const publicUserId = req.params.id;
    const publicUser = await User.findById(publicUserId)

    // console.log(publicUser);

    if (!publicUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await buildUserProfile(publicUser);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "User ID and Target User ID are required." });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or Target User not found." });
    }

    if (user.following.includes(targetUserId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    user.following.push(targetUserId);
    targetUser.followers.push(userId);

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User followed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (!userId || !targetUserId) {
      return res
        .status(400)
        .json({ error: "User ID and Target User ID are required." });
    }

    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or Target User not found." });
    }

    if (!user.following.includes(targetUserId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    user.following = user.following.filter(
      (id) => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (id) => id.toString() !== userId
    );

    await user.save();
    await targetUser.save();

    res.status(200).json({ message: "User unfollowed successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
};
