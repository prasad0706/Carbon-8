const express = require('express');
const { getLeaderboard, getUserRank } = require('../controllers/leaderboardController');
const auth = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getLeaderboard);
router.get('/user-rank', getUserRank);

module.exports = router;