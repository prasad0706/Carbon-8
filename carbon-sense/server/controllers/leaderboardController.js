const User = require('../models/User');
const Leaderboard = require('../models/Leaderboard');

// Get leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    
    // Get leaderboard entries for the specified period
    const leaderboardEntries = await Leaderboard.find({ period })
      .populate('userId', 'name')
      .sort({ score: -1 })
      .limit(100); // Limit to top 100
    
    res.json(leaderboardEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's rank
const getUserRank = async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    
    // Find user's leaderboard entry
    const userEntry = await Leaderboard.findOne({
      userId: req.user._id,
      period
    }).populate('userId', 'name');
    
    if (!userEntry) {
      return res.json({ rank: null, score: 0 });
    }
    
    // Count how many users have a higher score
    const higherRankedUsers = await Leaderboard.countDocuments({
      period,
      score: { $gt: userEntry.score }
    });
    
    res.json({
      rank: higherRankedUsers + 1,
      score: userEntry.score,
      user: userEntry.userId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update leaderboard (would be called by a cron job or background task)
const updateLeaderboard = async () => {
  try {
    // This function would typically be called by a scheduled task
    // For now, we'll implement a simplified version
    
    // Get all users sorted by total footprint (ascending for lowest footprint ranking)
    const users = await User.find().sort({ totalFootprint: 1 });
    
    // Clear existing monthly leaderboard
    await Leaderboard.deleteMany({ period: 'monthly' });
    
    // Create new leaderboard entries
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const rank = i + 1;
      // Using negative score because lower footprint = better rank
      const score = -user.totalFootprint;
      
      await Leaderboard.create({
        userId: user._id,
        rank,
        score,
        period: 'monthly'
      });
    }
    
    console.log('Leaderboard updated successfully');
  } catch (error) {
    console.error('Error updating leaderboard:', error.message);
  }
};

module.exports = {
  getLeaderboard,
  getUserRank,
  updateLeaderboard
};