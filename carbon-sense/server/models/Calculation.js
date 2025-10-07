const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  electricity: {
    type: Number, // kWh
    required: true
  },
  transport: {
    type: Number, // miles or km
    required: true
  },
  diet: {
    type: Number, // meals or kg
    required: true
  },
  waste: {
    type: Number, // kg
    required: true
  },
  water: {
    type: Number, // liters or gallons
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calculation', calculationSchema);