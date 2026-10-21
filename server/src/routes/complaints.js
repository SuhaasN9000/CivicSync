const express = require('express');
const Complaint = require('../models/Complaint');
const Worker = require('../models/Worker');
const Counter = require('../models/Counter');
const formatDate = require('../utils/formatDate');

const router = express.Router();

// GET /api/complaints?status=&ward=&workerId=&citizenEmail=
router.get('/', async (req, res, next) => {
  try {
    const { status, ward, workerId, citizenEmail } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (ward) filter.ward = ward;
    if (workerId) filter['assignedWorker.id'] = workerId;
    if (citizenEmail) filter.citizenEmail = citizenEmail;
    res.json(await Complaint.find(filter).sort({ reportedAt: -1 }));
  } catch (err) {
    next(err);
  }
});

// GET /api/complaints/:id
router.get('/:id', async (req, res, next) => {
  try {
    const complaint = await Complaint.findOne({ id: req.params.id });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    next(err);
  }
});

// POST /api/complaints  — citizen files a complaint
router.post('/', async (req, res, next) => {
  try {
    const { title, description, location, category, landmark, ward, priority, imageUrl, citizen = {} } = req.body;
    if (!title?.trim() || !description?.trim() || !location?.trim()) {
      return res.status(400).json({ message: 'title, description and location are required' });
    }

    const seq = await Counter.next('complaint');
    const now = formatDate();

    const complaint = await Complaint.create({
      id: `CS-${seq}`,
      title,
      category: category || 'Roads & Infrastructure',
      description,
      location,
      landmark: landmark || 'Identified via Citizen GPS',
      ward: ward || citizen.ward || 'Ward 12',
      priority: priority || 'Medium',
      status: 'Pending',
      citizenName: citizen.name,
      citizenPhone: citizen.phone,
      citizenEmail: citizen.email,
      createdAt: now,
      upvotes: 1,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
      timeline: [
        { stage: 'Complaint Registered', date: now, note: 'Filed by citizen with photo and GPS location', actor: 'Citizen' }
      ]
    });

    res.status(201).json(complaint);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/complaints/:id/assign  { workerId, priority, adminNote } — admin assigns a worker
router.patch('/:id/assign', async (req, res, next) => {
  try {
    const { workerId, priority, adminNote } = req.body;
    const worker = await Worker.findOne({ id: workerId });
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    const complaint = await Complaint.findOne({ id: req.params.id });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = 'In Progress';
    if (priority) complaint.priority = priority;
    complaint.assignedWorker = {
      id: worker.id,
      name: worker.name,
      department: worker.department,
      phone: worker.phone
    };
    complaint.timeline.push({
      stage: 'Worker Assigned',
      date: formatDate(),
      note: adminNote || `Assigned to ${worker.name} (${worker.department})`,
      actor: 'Admin'
    });

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/complaints/:id/status  { status, remarks, proofImage, actorRole }
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { status, remarks, proofImage, actorRole } = req.body;
    if (!Complaint.STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of ${Complaint.STATUSES.join(', ')}` });
    }

    const complaint = await Complaint.findOne({ id: req.params.id });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    const actor = actorRole === 'worker' ? 'Worker' : 'Admin';
    const date = formatDate();

    if (status === 'Resolved') {
      complaint.timeline.push({
        stage: 'Resolved & Verified',
        date,
        note: remarks || 'Repair completed successfully and verified with proof photo.',
        actor
      });
    } else if (status === 'In Progress') {
      complaint.timeline.push({
        stage: 'In Progress',
        date,
        note: remarks || 'Field crew is working on the site.',
        actor
      });
    }

    complaint.status = status;
    if (remarks) complaint.workerNotes = remarks;
    if (proofImage) complaint.resolvedImageUrl = proofImage;

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/complaints/:id/upvote
router.patch('/:id/upvote', async (req, res, next) => {
  try {
    const complaint = await Complaint.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { upvotes: 1 } },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
