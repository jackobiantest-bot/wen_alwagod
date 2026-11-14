const { Schema, model } = require('mongoose');

const stationSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    congestion: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true
  }
);

module.exports = model('Station', stationSchema);
