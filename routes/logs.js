const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Activity = require('../models/Activity');
const router = express.Router();

// Get all activity logs (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email').sort({ timestamp: -1 });
  res.json(activities);
});

module.exports = router;
