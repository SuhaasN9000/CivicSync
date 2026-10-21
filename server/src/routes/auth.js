const express = require('express');
const User = require('../models/User');
const Worker = require('../models/Worker');

const router = express.Router();

// Match phones regardless of spacing: "+91 9820145678" == "+91 98201 45678"
const phoneQuery = (phone) => {
  const digits = String(phone).replace(/\D/g, '');
  return new RegExp(`^\\+?${digits.split('').join('\\s*')}$`);
};

// POST /api/auth/login  { role, phone, name, ward, workerId }
// Demo OTP login: OTP is not verified server-side. Citizens are created on first login.
router.post('/login', async (req, res, next) => {
  try {
    const { role, phone, name, ward, workerId } = req.body;

    if (role === 'citizen') {
      if (!phone) return res.status(400).json({ message: 'phone is required' });
      let user = await User.findOne({ role: 'citizen', phone: phoneQuery(phone) });
      if (!user) {
        user = await User.create({
          role: 'citizen',
          name: name || 'Citizen',
          email: 'citizen@civicsync.org',
          phone,
          ward: ward || 'Ward 12'
        });
      }
      return res.json({ ...user.toJSON(), isLoggedIn: true });
    }

    if (role === 'worker') {
      const worker = (workerId && (await Worker.findOne({ id: workerId }))) || (await Worker.findOne().sort({ id: 1 }));
      if (!worker) return res.status(404).json({ message: 'No workers found' });
      return res.json({ ...worker.toJSON(), role: 'worker', isLoggedIn: true });
    }

    if (role === 'admin') {
      const admin = (phone && (await User.findOne({ role: 'admin', phone: phoneQuery(phone) }))) || (await User.findOne({ role: 'admin' }));
      if (!admin) return res.status(404).json({ message: 'No admin account found' });
      return res.json({ ...admin.toJSON(), isLoggedIn: true });
    }

    return res.status(400).json({ message: 'role must be citizen, worker or admin' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
