require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedDatabase = require('./seed/seed');
const Worker = require('./models/Worker');

const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/workers');
const complaintRoutes = require('./routes/complaints');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000' }));
// Complaint photos are sent as base64 data URLs, so allow larger bodies
app.use(express.json({ limit: '15mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/complaints', complaintRoutes);

// POST /api/admin/reset — restore dummy data (dev convenience)
app.post('/api/admin/reset', async (_req, res, next) => {
  try {
    res.json({ message: 'Database reset', counts: await seedDatabase() });
  } catch (err) {
    next(err);
  }
});

app.use((_req, res) => res.status(404).json({ message: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.name === 'ValidationError' ? 400 : 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    // Auto-seed an empty database so the app works on first run
    if ((await Worker.countDocuments()) === 0) {
      console.log('Empty database detected, seeding dummy data...');
      console.log('Seeded:', await seedDatabase());
    }
    app.listen(PORT, () => console.log(`CivicSync API listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
})();
