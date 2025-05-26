const Trash = require ('../models/Trash');

const Trashdata = async (req,res) =>
{
    try {
        const trashBin = await Trash.find().sort({time: -1});
        res.status(200).json(trashBin);
    } catch (err) {
        res.status(500).json({error:"failed o get the trash data"})
    }
};

module.exports = {Trashdata};