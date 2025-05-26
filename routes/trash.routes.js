const express = require('express');
const { Trashdata } = require('../middleware/trash.controller');
const router = express.Router();

// List all trash data (employee only)
router.get('/trash',Trashdata);

module.exports = router;