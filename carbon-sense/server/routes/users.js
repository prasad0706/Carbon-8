const express = require('express');
const { getUserProfile, updateUserProfile, getUserDashboard } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

router.get('/dashboard', getUserDashboard);

module.exports = router;