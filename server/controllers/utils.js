import Snippet from "../models/Snippet.js";

export async function buildUserProfile(user) {
  // Fetch all created snippets
  console.log(user)
  const createdSnippets = await Snippet.find({ author: user._id });

  // Calculate stats
  const publicSnippets = createdSnippets.length;
  const totalUpvotes = createdSnippets.reduce(
    (sum, s) => sum + (s.upvotes || 0),
    0
  );
  const totalViews = createdSnippets.reduce(
    (sum, s) => sum + (s.views || 0),
    0
  );

  // Language usage
  const languageMap = {};
  createdSnippets.forEach((s) => {
    if (!languageMap[s.language]) languageMap[s.language] = 0;
    languageMap[s.language]++;
  });
  const languages = Object.entries(languageMap).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / publicSnippets) * 100),
  }));

  // Pinned and recent snippets (for now, just use first 3 and last 2)
  const pinnedSnippets = createdSnippets.slice(0, 3).map((s) => ({
    _id: s._id,
    title: s.title,
    description: s.description || "",
    language: s.language,
    tags: s.tags || [],
    upvotes: s.upvotes || 0,
    views: s.views || 0,
    createdAt: s.createdAt,
  }));
  const recentSnippets = createdSnippets.slice(-2).map((s) => ({
    _id: s._id,
    title: s.title,
    description: s.description || "",
    language: s.language,
    tags: s.tags || [],
    upvotes: s.upvotes || 0,
    views: s.views || 0,
    createdAt: s.createdAt,
  }));

  // Activity data (dummy for now)
  const activityData = {
    thisWeek: 0,
    thisMonth: 0,
    thisYear: publicSnippets,
    streak: 0,
  };

  // Compose profile
  return {
    _id: user._id,
    name: user.name,
    username: user.username || "",
    email: user.email,
    bio: user.bio || "",
    location: user.location || "",
    website: user.website || "",
    githubUsername: user.githubUsername || "",
    twitterUsername: user.twitterUsername || "",
    avatar: user.avatar || "",
    followers:user.followers||[],
    following:user.following||[],
    joinDate: user.createdAt,
    isVerified: !!user.isVerified,
    stats: {
      publicSnippets,
      totalUpvotes,
      followers: user.followers ? user.followers.length : 0,
      following: user.following ? user.following.length : 0,
      totalViews,
    },
    pinnedSnippets,
    recentSnippets,
    languages,
    activityData,
  };
}
