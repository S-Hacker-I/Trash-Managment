const { Schema, model } = require('mongoose');
const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  action: { type: String },
  timestamp: { type: Date, default: Date.now }
});
module.exports = model('Activity', activitySchema);