const express = require('express');
const { getAISuggestions, getUserAISuggestions } = require('../controllers/aiController');
const auth = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/suggestions', getAISuggestions);
router.get('/history', getUserAISuggestions);

module.exports = router;