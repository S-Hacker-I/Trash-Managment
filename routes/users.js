const express  = require('express');
const { protect, authorize } = require('../middleware/auth');
const User     = require('../models/User');
const router   = express.Router();

// List & profile (you already have these)
router.get('/', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
router.get('/prof', protect, async (req, res) => {
  const me = await User.findById(req.user.id).select('-password');
  res.json(me);
});

// Create (already handled in /auth/register)…

// **Update user**
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  const { name, email, role } = req.body;
  const updated = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true, runValidators: true }
  ).select('-password');
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(updated);
});

// **Delete user**
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  const removed = await User.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Deleted successfully' });
});

module.exports = router;
