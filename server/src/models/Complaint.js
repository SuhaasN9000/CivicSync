const mongoose = require('mongoose');

const STATUSES = ['Pending', 'In Progress', 'Resolved'];
const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

const timelineEntrySchema = new mongoose.Schema(
  {
    stage: { type: String, required: true },
    date: { type: String, required: true }, // display string, e.g. "Sep 28, 09:30 AM"
    note: { type: String },
    actor: { type: String, enum: ['Citizen', 'Admin', 'Worker'], required: true }
  },
  { _id: false }
);

// Snapshot of the worker at assignment time (what the UI renders)
const assignedWorkerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String },
    phone: { type: String }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // e.g. "CS-101"
    title: { type: String, required: true, trim: true },
    category: { type: String, default: 'Roads & Infrastructure' },
    description: { type: String, required: true },
    location: { type: String, required: true },
    landmark: { type: String },
    ward: { type: String, default: 'Ward 12', index: true },
    priority: { type: String, enum: PRIORITIES, default: 'Medium' },
    status: { type: String, enum: STATUSES, default: 'Pending', index: true },
    citizenName: { type: String },
    citizenPhone: { type: String },
    citizenEmail: { type: String },
    createdAt: { type: String }, // display string kept for frontend compatibility
    upvotes: { type: Number, default: 0, min: 0 },
    imageUrl: { type: String }, // URL or base64 data URL
    resolvedImageUrl: { type: String, default: null },
    workerNotes: { type: String, default: null },
    assignedWorker: { type: assignedWorkerSchema, default: null },
    timeline: { type: [timelineEntrySchema], default: [] }
  },
  // Real Date timestamps live under different names so they don't clash with the display `createdAt`
  { timestamps: { createdAt: 'reportedAt', updatedAt: 'updatedAt' } }
);

complaintSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  }
});

complaintSchema.statics.STATUSES = STATUSES;
complaintSchema.statics.PRIORITIES = PRIORITIES;

module.exports = mongoose.model('Complaint', complaintSchema);
