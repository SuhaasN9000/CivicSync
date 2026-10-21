const express = require('express');
const Worker = require('../models/Worker');

const router = express.Router();

// GET /api/workers
router.get('/', async (_req, res, next) => {
  try {
    res.json(await Worker.find().sort({ id: 1 }));
  } catch (err) {
    next(err);
  }
});

// GET /api/workers/:id
router.get('/:id', async (req, res, next) => {
  try {
    const worker = await Worker.findOne({ id: req.params.id });
    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
