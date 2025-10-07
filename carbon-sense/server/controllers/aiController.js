const axios = require('axios');
const Suggestion = require('../models/Suggestion');
const Calculation = require('../models/Calculation');

// Mock function to generate AI suggestions
// In a real implementation, this would integrate with OpenAI API or similar
const generateAISuggestions = async (calculationData) => {
  // This is a mock implementation - in a real app, you would call the OpenAI API
  const suggestions = [
    "Consider switching to LED light bulbs to reduce electricity consumption",
    "Try reducing meat consumption as it has a high carbon footprint",
    "Use public transportation or carpool to reduce transport emissions",
    "Recycle more materials to reduce waste impact",
    "Fix any water leaks in your home to reduce water consumption"
  ];
  
  // Return a random selection of suggestions
  const randomSuggestions = [];
  const numSuggestions = Math.floor(Math.random() * 3) + 2; // 2-4 suggestions
  
  for (let i = 0; i < numSuggestions; i++) {
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    randomSuggestions.push(suggestions[randomIndex]);
  }
  
  return randomSuggestions.join('. ') + '.';
};

// Get AI suggestions based on user's latest calculation
const getAISuggestions = async (req, res) => {
  try {
    // Get user's latest calculation
    const latestCalculation = await Calculation.findOne({ userId: req.user._id })
      .sort({ timestamp: -1 });
    
    if (!latestCalculation) {
      return res.status(404).json({ message: 'No calculations found for this user' });
    }
    
    // Generate AI suggestions
    const aiResponse = await generateAISuggestions(latestCalculation);
    
    // Save suggestion to database
    const suggestion = new Suggestion({
      userId: req.user._id,
      calculationId: latestCalculation._id,
      aiResponse
    });
    
    const savedSuggestion = await suggestion.save();
    
    res.json({
      suggestion: savedSuggestion
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all AI suggestions for a user
const getUserAISuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({ userId: req.user._id })
      .sort({ date: -1 });
    
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAISuggestions,
  getUserAISuggestions
};