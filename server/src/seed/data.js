// Dummy seed data — mirrors the original frontend mock data in src/context/CivicContext.js

const INITIAL_WORKERS = [
  {
    id: "W-101",
    name: "Ramesh Patil",
    department: "Road Maintenance",
    phone: "+91 98220 11223",
    status: "On Duty",
    ward: "Ward 12",
    rating: 4.8,
    completedCount: 42
  },
  {
    id: "W-102",
    name: "Sunil Shinde",
    department: "Sanitation & Waste",
    phone: "+91 98331 44556",
    status: "On Duty",
    ward: "Ward 12",
    rating: 4.9,
    completedCount: 68
  },
  {
    id: "W-103",
    name: "Vikram Kadam",
    department: "Water Works",
    phone: "+91 98442 77889",
    status: "On Duty",
    ward: "Ward 14",
    rating: 4.7,
    completedCount: 35
  },
  {
    id: "W-104",
    name: "Deepak More",
    department: "Electrical & Lighting",
    phone: "+91 98553 99001",
    status: "Available",
    ward: "Ward 12",
    rating: 4.9,
    completedCount: 51
  }
];

const INITIAL_COMPLAINTS = [
  {
    id: "CS-101",
    title: "Deep Pothole at Main Market Crossing",
    category: "Roads & Infrastructure",
    description: "Dangerous pothole near the bus stop causing severe traffic jams and two-wheeler skidding.",
    location: "Main Market Road, Ward 12, West Zone",
    landmark: "Opposite City Bakery",
    ward: "Ward 12",
    priority: "High",
    status: "In Progress",
    citizenName: "Aarav Sharma",
    citizenPhone: "+91 98201 45678",
    citizenEmail: "aarav.sharma@example.com",
    createdAt: "2026-09-28 09:30 AM",
    upvotes: 24,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
    resolvedImageUrl: null,
    workerNotes: "Asphalt mixture allocated. Patching team dispatched on site.",
    assignedWorker: {
      id: "W-101",
      name: "Ramesh Patil",
      department: "Road Maintenance",
      phone: "+91 98220 11223"
    },
    timeline: [
      { stage: "Complaint Registered", date: "Sep 28, 09:30 AM", note: "Reported by citizen with photo & GPS", actor: "Citizen" },
      { stage: "Under Review", date: "Sep 28, 11:15 AM", note: "Verified by Ward 12 Admin Desk", actor: "Admin" },
      { stage: "Worker Assigned", date: "Sep 28, 02:40 PM", note: "Assigned to Ramesh Patil (Road Dept)", actor: "Admin" },
      { stage: "In Progress", date: "Sep 29, 10:00 AM", note: "Repair work underway with road roller", actor: "Worker" }
    ]
  },
  {
    id: "CS-102",
    title: "Overflowing Garbage Dump near Community Hall",
    category: "Sanitation & Waste",
    description: "Bin has not been cleared for 3 days. Stray dogs scattering garbage onto the walking footpath.",
    location: "Sector 4 Community Center, Ward 12",
    landmark: "Near Gate 3 Park",
    ward: "Ward 12",
    priority: "Urgent",
    status: "Pending",
    citizenName: "Pooja Deshmukh",
    citizenPhone: "+91 98112 33445",
    citizenEmail: "pooja.d@example.com",
    createdAt: "2026-09-29 08:15 AM",
    upvotes: 18,
    imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80",
    resolvedImageUrl: null,
    workerNotes: null,
    assignedWorker: null,
    timeline: [
      { stage: "Complaint Registered", date: "Sep 29, 08:15 AM", note: "Reported by citizen", actor: "Citizen" }
    ]
  },
  {
    id: "CS-103",
    title: "Broken Streetlight outside Girls School",
    category: "Electrical & Lighting",
    description: "Streetlight flickering and dark for a week, causing safety concerns for evening commuters.",
    location: "Kasturba Road, Lane 4, Ward 12",
    landmark: "Outside St. Teresa High School",
    ward: "Ward 12",
    priority: "High",
    status: "Resolved",
    citizenName: "Rohan Verma",
    citizenPhone: "+91 97654 32109",
    citizenEmail: "rohan.v@example.com",
    createdAt: "2026-09-26 06:45 PM",
    upvotes: 31,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80",
    resolvedImageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    workerNotes: "Replaced faulty sodium bulb with energy-efficient 45W LED fixture. Tested and operational.",
    assignedWorker: {
      id: "W-104",
      name: "Deepak More",
      department: "Electrical & Lighting",
      phone: "+91 98553 99001"
    },
    timeline: [
      { stage: "Complaint Registered", date: "Sep 26, 06:45 PM", note: "Filed via CivicSync User App", actor: "Citizen" },
      { stage: "Under Review", date: "Sep 27, 09:30 AM", note: "Approved by Electric Inspector", actor: "Admin" },
      { stage: "Worker Assigned", date: "Sep 27, 10:15 AM", note: "Assigned to Deepak More", actor: "Admin" },
      { stage: "Resolved & Verified", date: "Sep 27, 03:20 PM", note: "LED Luminaire installed with proof photo", actor: "Worker" }
    ]
  },
  {
    id: "CS-104",
    title: "Drinking Water Pipeline Leakage",
    category: "Water Supply",
    description: "Continuous water gushing out of underground junction pipe onto road surface wasting clean water.",
    location: "Shivaji Chowk, Ward 14",
    landmark: "Near Metro Pillar #142",
    ward: "Ward 14",
    priority: "High",
    status: "In Progress",
    citizenName: "Meera Nair",
    citizenPhone: "+91 99887 66554",
    citizenEmail: "meera.nair@example.com",
    createdAt: "2026-09-29 02:00 PM",
    upvotes: 42,
    imageUrl: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80",
    resolvedImageUrl: null,
    workerNotes: "Isolation valve closed. Excavating trench to replace 4-inch damaged gasket.",
    assignedWorker: {
      id: "W-103",
      name: "Vikram Kadam",
      department: "Water Works",
      phone: "+91 98442 77889"
    },
    timeline: [
      { stage: "Complaint Registered", date: "Sep 29, 02:00 PM", note: "High urgency reported", actor: "Citizen" },
      { stage: "Under Review", date: "Sep 29, 02:30 PM", note: "Escalated to Emergency Water Squad", actor: "Admin" },
      { stage: "Worker Assigned", date: "Sep 29, 03:00 PM", note: "Dispatched Vikram Kadam", actor: "Admin" },
      { stage: "In Progress", date: "Sep 30, 08:30 AM", note: "Excavation and pipe welding in progress", actor: "Worker" }
    ]
  },
  {
    id: "CS-105",
    title: "Clogged Stormwater Drain & Stagnant Water",
    category: "Drainage",
    description: "Drain choked with plastic debris. Foul odor and mosquito breeding hazard.",
    location: "Gandhi Nagar 3rd Cross, Ward 12",
    landmark: "Behind Municipal Dispensary",
    ward: "Ward 12",
    priority: "Medium",
    status: "Pending",
    citizenName: "Karan Johar",
    citizenPhone: "+91 91234 56789",
    citizenEmail: "karan.j@example.com",
    createdAt: "2026-09-30 11:10 AM",
    upvotes: 9,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    resolvedImageUrl: null,
    workerNotes: null,
    assignedWorker: null,
    timeline: [
      { stage: "Complaint Registered", date: "Sep 30, 11:10 AM", note: "Awaiting inspection", actor: "Citizen" }
    ]
  }
];

const INITIAL_USERS = [
  { role: "citizen", name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "+91 98201 45678", ward: "Ward 12" },
  { role: "citizen", name: "Pooja Deshmukh", email: "pooja.d@example.com", phone: "+91 98112 33445", ward: "Ward 12" },
  { role: "citizen", name: "Rohan Verma", email: "rohan.v@example.com", phone: "+91 97654 32109", ward: "Ward 12" },
  { role: "citizen", name: "Meera Nair", email: "meera.nair@example.com", phone: "+91 99887 66554", ward: "Ward 14" },
  { role: "citizen", name: "Karan Johar", email: "karan.j@example.com", phone: "+91 91234 56789", ward: "Ward 12" },
  { role: "admin", name: "Admin S. Mehta", email: "admin.ward12@civicsync.gov", phone: "+91 98111 22334", ward: "Ward 12 - Central Zone", roleTitle: "Zonal Ward Officer" }
];

// Give every worker 5 jobs in total (CS-106 onwards)
const buildWorkerJobs = require('./workerJobs');
INITIAL_COMPLAINTS.push(
  ...buildWorkerJobs(INITIAL_WORKERS, INITIAL_USERS.filter(u => u.role === 'citizen'), INITIAL_COMPLAINTS.length + 101)
);

module.exports = { INITIAL_WORKERS, INITIAL_COMPLAINTS, INITIAL_USERS };
