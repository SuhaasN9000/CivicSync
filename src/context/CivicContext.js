import React, { createContext, useContext, useState, useEffect } from 'react';

const CivicContext = createContext();

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

export const CivicProvider = ({ children }) => {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('civicsync_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('civicsync_workers');
    return saved ? JSON.parse(saved) : INITIAL_WORKERS;
  });

  // Always land on login page initially (currentUser is null)
  const [currentUser, setCurrentUser] = useState(null);

  // Default fallback user objects
  const [citizenUser, setCitizenUser] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98201 45678",
    ward: "Ward 12",
    isLoggedIn: true
  });

  const [workerUser, setWorkerUser] = useState({
    id: "W-101",
    name: "Ramesh Patil",
    department: "Road Maintenance",
    phone: "+91 98220 11223",
    ward: "Ward 12",
    isLoggedIn: true
  });

  const [adminUser, setAdminUser] = useState({
    name: "Admin S. Mehta",
    email: "admin.ward12@civicsync.gov",
    role: "Zonal Ward Officer",
    ward: "Ward 12 - Central Zone",
    isLoggedIn: true
  });

  const loginWithOtp = ({ role, phone, name, ward, workerId }) => {
    if (role === 'citizen') {
      const user = {
        role: 'citizen',
        name: name || "Aarav Sharma",
        email: "citizen@civicsync.org",
        phone: phone || "+91 98201 45678",
        ward: ward || "Ward 12",
        isLoggedIn: true
      };
      setCitizenUser(user);
      setCurrentUser(user);
    } else if (role === 'worker') {
      const existing = workers.find(w => w.id === workerId) || workers[0];
      const user = {
        ...existing,
        role: 'worker',
        name: name || existing.name,
        phone: phone || existing.phone,
        ward: ward || existing.ward,
        isLoggedIn: true
      };
      setWorkerUser(user);
      setCurrentUser(user);
    } else if (role === 'admin') {
      const user = {
        role: 'admin',
        name: name || "Admin S. Mehta",
        email: "admin.ward12@civicsync.gov",
        roleTitle: "Zonal Ward Officer",
        phone: phone || "+91 98111 22334",
        ward: "Ward 12 - Central Zone",
        isLoggedIn: true
      };
      setAdminUser(user);
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('civicsync_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('civicsync_workers', JSON.stringify(workers));
  }, [workers]);

  // Citizen adds a complaint
  const addComplaint = (complaintData) => {
    const newId = `CS-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newComplaint = {
      id: newId,
      title: complaintData.title,
      category: complaintData.category || "Roads & Infrastructure",
      description: complaintData.description,
      location: complaintData.location,
      landmark: complaintData.landmark || "Identified via Citizen GPS",
      ward: complaintData.ward || citizenUser.ward || "Ward 12",
      priority: complaintData.priority || "Medium",
      status: "Pending",
      citizenName: citizenUser.name,
      citizenPhone: citizenUser.phone,
      citizenEmail: citizenUser.email,
      createdAt: formattedDate,
      upvotes: 1,
      imageUrl: complaintData.imageUrl || "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
      resolvedImageUrl: null,
      workerNotes: null,
      assignedWorker: null,
      timeline: [
        {
          stage: "Complaint Registered",
          date: formattedDate,
          note: "Filed by citizen with photo and GPS location",
          actor: "Citizen"
        }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    return newComplaint;
  };

  // Admin assigns worker
  const assignWorker = (complaintId, workerId, priority, adminNote) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: "In Progress",
          priority: priority || c.priority,
          assignedWorker: {
            id: worker.id,
            name: worker.name,
            department: worker.department,
            phone: worker.phone
          },
          timeline: [
            ...c.timeline,
            {
              stage: "Worker Assigned",
              date: formattedDate,
              note: adminNote || `Assigned to ${worker.name} (${worker.department})`,
              actor: "Admin"
            }
          ]
        };
      }
      return c;
    }));
  };

  // Worker or Admin updates status
  const updateComplaintStatus = (complaintId, newStatus, remarks, proofImage) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', ' +
      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const updatedTimeline = [...c.timeline];
        
        if (newStatus === "Resolved") {
          updatedTimeline.push({
            stage: "Resolved & Verified",
            date: formattedDate,
            note: remarks || "Repair completed successfully and verified with proof photo.",
            actor: currentUser?.role === "worker" ? "Worker" : "Admin"
          });
        } else if (newStatus === "In Progress") {
          updatedTimeline.push({
            stage: "In Progress",
            date: formattedDate,
            note: remarks || "Field crew is working on the site.",
            actor: currentUser?.role === "worker" ? "Worker" : "Admin"
          });
        }

        return {
          ...c,
          status: newStatus,
          workerNotes: remarks || c.workerNotes,
          resolvedImageUrl: proofImage || c.resolvedImageUrl,
          timeline: updatedTimeline
        };
      }
      return c;
    }));
  };

  const upvoteComplaint = (complaintId) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return { ...c, upvotes: c.upvotes + 1 };
      }
      return c;
    }));
  };

  const resetData = () => {
    localStorage.removeItem('civicsync_complaints');
    localStorage.removeItem('civicsync_workers');
    setComplaints(INITIAL_COMPLAINTS);
    setWorkers(INITIAL_WORKERS);
  };

  return (
    <CivicContext.Provider
      value={{
        complaints,
        workers,
        currentUser,
        setCurrentUser,
        loginWithOtp,
        logout,
        citizenUser,
        setCitizenUser,
        workerUser,
        setWorkerUser,
        adminUser,
        setAdminUser,
        addComplaint,
        assignWorker,
        updateComplaintStatus,
        upvoteComplaint,
        resetData
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => useContext(CivicContext);
