// routes/trash.routes.js
const express = require('express');
const router  = express.Router();
const Trash   = require('../models/Trash');        // <-- your Mongoose model
const { Trashdata } = require('../middleware/trash.controller');

// List all trash data (employee only)
router.get('/trashs', Trashdata);

// Create or upsert a trash record
router.post('/trash', async (req, res) => {
  try {
    const { trash_id, level, latitude, longitude } = req.body;
    let trash = await Trash.findOne({ trash_id });
    if (trash) {
      // update existing
      trash.level = level;
      trash.latitude = latitude;
      trash.longitude = longitude;
      await trash.save();
    } else {
      // create new
      trash = await Trash.create({ trash_id, level, latitude, longitude });
    }
    res.status(200).json(trash);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// **New**: empty a trash bin (set level to 0)
router.put('/trash/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Trash.findByIdAndUpdate(
      id,
      { level: 0 },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update level only for existing trash bin
router.put('/trash/level/:id', async (req, res) => {
  try {
    const { level } = req.body;
    const updated = await Trash.findByIdAndUpdate(
      req.params.id,
      { level },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Trash bin not found' });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating level' });
  }
});


module.exports = router;

