const History = require('../models/History');
const Calculation = require('../models/Calculation');

// Get user history
const getUserHistory = async (req, res) => {
  try {
    const history = await History.findOne({ userId: req.user._id }).populate({
      path: 'calculationIds',
      options: { sort: { timestamp: -1 } }
    });
    
    if (!history) {
      return res.json({ calculations: [] });
    }
    
    res.json({ calculations: history.calculationIds });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get history with pagination
const getUserHistoryPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const history = await History.findOne({ userId: req.user._id });
    
    if (!history) {
      return res.json({ calculations: [], totalPages: 0, currentPage: page });
    }
    
    const calculations = await Calculation.find({
      _id: { $in: history.calculationIds }
    })
    .sort({ timestamp: -1 })
    .skip(skip)
    .limit(limit);
    
    const totalCalculations = history.calculationIds.length;
    const totalPages = Math.ceil(totalCalculations / limit);
    
    res.json({
      calculations,
      totalPages,
      currentPage: page,
      totalCalculations
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserHistory,
  getUserHistoryPaginated
};