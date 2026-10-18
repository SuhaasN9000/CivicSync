const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema(
  {
    // Human-readable id used throughout the frontend, e.g. "W-101"
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['On Duty', 'Available', 'Off Duty'], default: 'Available' },
    ward: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    completedCount: { type: Number, min: 0, default: 0 }
  },
  { timestamps: true }
);

workerSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Worker', workerSchema);
