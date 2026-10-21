require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Worker = require('../models/Worker');
const Complaint = require('../models/Complaint');
const Counter = require('../models/Counter');
const { INITIAL_WORKERS, INITIAL_COMPLAINTS, INITIAL_USERS } = require('./data');

// "2026-09-28 09:30 AM" -> Date
const parseCreatedAt = (str) => {
  const m = /^(\d{4}-\d{2}-\d{2}) (\d{1,2}):(\d{2}) (AM|PM)$/.exec(str || '');
  if (!m) return new Date();
  let hours = Number(m[2]) % 12;
  if (m[4] === 'PM') hours += 12;
  return new Date(`${m[1]}T${String(hours).padStart(2, '0')}:${m[3]}:00`);
};

// Wipes and re-populates all collections. Used by `npm run seed` and POST /api/admin/reset.
const seedDatabase = async () => {
  await Promise.all([
    User.deleteMany({}),
    Worker.deleteMany({}),
    Complaint.deleteMany({}),
    Counter.deleteMany({})
  ]);

  await User.insertMany(INITIAL_USERS);
  await Worker.insertMany(INITIAL_WORKERS);
  await Complaint.insertMany(
    INITIAL_COMPLAINTS.map((c) => ({ ...c, reportedAt: parseCreatedAt(c.createdAt) })),
    { timestamps: false }
  );

  const maxSeq = Math.max(...INITIAL_COMPLAINTS.map((c) => Number(c.id.replace('CS-', ''))));
  await Counter.create({ _id: 'complaint', seq: maxSeq });

  return {
    users: INITIAL_USERS.length,
    workers: INITIAL_WORKERS.length,
    complaints: INITIAL_COMPLAINTS.length
  };
};

if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      const counts = await seedDatabase();
      console.log('Seeded:', counts);
    } catch (err) {
      console.error('Seeding failed:', err.message);
      process.exitCode = 1;
    } finally {
      await mongoose.disconnect();
    }
  })();
}

module.exports = seedDatabase;
