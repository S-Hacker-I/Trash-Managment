const { Schema, model } = require('mongoose');
const reportSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });
module.exports = model('Report', reportSchema);