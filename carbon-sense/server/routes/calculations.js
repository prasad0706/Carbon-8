const express = require('express');
const { createCalculation, getUserCalculations, getCalculationById } = require('../controllers/calculationController');
const auth = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.route('/')
  .post(createCalculation)
  .get(getUserCalculations);

router.route('/:id')
  .get(getCalculationById);

module.exports = router;