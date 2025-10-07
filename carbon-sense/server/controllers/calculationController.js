const Calculation = require('../models/Calculation');
const User = require('../models/User');
const History = require('../models/History');

// Mock function to calculate carbon footprint
// In a real implementation, this would integrate with the Carbon Interface API
const calculateCarbonFootprint = (data) => {
  // These are sample conversion factors - in a real app, you would get accurate data from APIs
  const ELECTRICITY_FACTOR = 0.45; // kg CO2 per kWh
  const TRANSPORT_FACTOR = 0.21; // kg CO2 per mile
  const DIET_FACTOR = 2.5; // kg CO2 per meal (varies greatly)
  const WASTE_FACTOR = 0.8; // kg CO2 per kg of waste
  const WATER_FACTOR = 0.0003; // kg CO2 per liter
  
  const electricityEmissions = data.electricity * ELECTRICITY_FACTOR;
  const transportEmissions = data.transport * TRANSPORT_FACTOR;
  const dietEmissions = data.diet * DIET_FACTOR;
  const wasteEmissions = data.waste * WASTE_FACTOR;
  const waterEmissions = data.water * WATER_FACTOR;
  
  return {
    electricityEmissions,
    transportEmissions,
    dietEmissions,
    wasteEmissions,
    waterEmissions,
    total: electricityEmissions + transportEmissions + dietEmissions + wasteEmissions + waterEmissions
  };
};

// Create a new calculation
const createCalculation = async (req, res) => {
  try {
    const { electricity, transport, diet, waste, water } = req.body;
    
    // Validate input
    if (!electricity || !transport || !diet || !waste || !water) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Calculate carbon footprint
    const calculationResult = calculateCarbonFootprint({
      electricity,
      transport,
      diet,
      waste,
      water
    });
    
    // Create calculation record
    const calculation = new Calculation({
      userId: req.user._id,
      electricity,
      transport,
      diet,
      waste,
      water,
      total: calculationResult.total
    });
    
    const savedCalculation = await calculation.save();
    
    // Update user's total footprint
    const user = await User.findById(req.user._id);
    user.totalFootprint += calculationResult.total;
    await user.save();
    
    // Add to history
    let history = await History.findOne({ userId: req.user._id });
    
    if (!history) {
      history = new History({
        userId: req.user._id,
        calculationIds: [savedCalculation._id]
      });
    } else {
      history.calculationIds.push(savedCalculation._id);
    }
    
    await history.save();
    
    res.status(201).json({
      ...savedCalculation.toObject(),
      breakdown: calculationResult
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all calculations for a user
const getUserCalculations = async (req, res) => {
  try {
    const calculations = await Calculation.find({ userId: req.user._id })
      .sort({ timestamp: -1 });
    
    res.json(calculations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific calculation
const getCalculationById = async (req, res) => {
  try {
    const calculation = await Calculation.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!calculation) {
      return res.status(404).json({ message: 'Calculation not found' });
    }
    
    res.json(calculation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCalculation,
  getUserCalculations,
  getCalculationById
};