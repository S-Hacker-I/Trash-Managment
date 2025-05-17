const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Report = require('../models/Report');
const router = express.Router();

// Employee posts a report
router.post('/', protect, authorize('employee'), async (req, res) => {
  const { title, description } = req.body;
  const report = await Report.create({ employee: req.user._id, title, description });
  res.status(201).json(report);
});

// List all reports (admin) or own reports (employee)
router.get('/', protect, async (req, res) => {
  if (req.user.role === 'admin') {
    const reports = await Report.find().populate('employee', 'name email');
    return res.json(reports);
  }
  const reports = await Report.find({ employee: req.user._id });
  res.json(reports);
});

// Delete a report (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  await Report.findByIdAndDelete(req.params.id);
  res.json({ message: 'Report deleted' });
});

module.exports = router;