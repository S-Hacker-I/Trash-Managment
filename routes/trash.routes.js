const express = require('express');
const { Trashdata } = require('../middleware/trash.controller');
const router = express.Router();

// List all trash data (employee only)
router.get('/trashs',Trashdata);
router.post('/trash', async(req,res)=>{
    try {
        const { trashBin } = req.body;
        const trashs = await Trash.findOne({ trashBin });
        // if trash already created then updates the data to the new one if not create a new one
        const trashsave = await Trash.create({ trash_id, level, latitude, longitude });
    } catch (error) {
        
    }
});

module.exports = router;