const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  calculationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Calculation'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Suggestion', suggestionSchema);