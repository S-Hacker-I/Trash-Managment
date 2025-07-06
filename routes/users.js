const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// List all users (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
router.get('/prof', protect, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

module.exports = router;