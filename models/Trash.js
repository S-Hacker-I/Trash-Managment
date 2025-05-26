const { Schema, model } = require('mongoose');
const TrashSchema = new Schema({
  trash_id: { type: String, required: true },
  level: { type: Number, required: true, unique: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
}, { timestamps: true });
module.exports = model('Trash', TrashSchema);