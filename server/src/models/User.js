const mongoose = require('mongoose');

// Citizens and admins. Workers live in their own collection.
const userSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ['citizen', 'admin'], required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    ward: { type: String, default: 'Ward 12' },
    roleTitle: { type: String } // admin only, e.g. "Zonal Ward Officer"
  },
  { timestamps: true }
);

userSchema.index({ role: 1, phone: 1 }, { unique: true });

userSchema.set('toJSON', {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
