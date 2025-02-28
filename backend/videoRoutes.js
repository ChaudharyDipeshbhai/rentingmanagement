// videoRoutes.js
const express = require('express');
const router = express.Router();

// Define your video routes here
router.get('/videos', (req, res) => {
  res.json({ message: 'List of videos' });
});

module.exports = router;
