const express = require('express');
const { handleGenerateShortNewURL, handleShortIdAnalytics } = require('../controller/url');
const router = express.Router();  // ✅ Correct

router.post('/', handleGenerateShortNewURL);

router.get('/analytics/:shortId', handleShortIdAnalytics);
module.exports = router;