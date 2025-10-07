const express = require('express');
const { getUserHistory, getUserHistoryPaginated } = require('../controllers/historyController');
const auth = require('../middlewares/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

router.get('/', getUserHistory);
router.get('/paginated', getUserHistoryPaginated);

module.exports = router;