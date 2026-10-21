import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/client';

const CivicContext = createContext();

// Complaints, workers and users are stored in MongoDB (see /server). Seed data lives in server/src/seed/data.js.

export const CivicProvider = ({ children }) => {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const fetchData = useCallback(async () => {
    try {
      const [complaintData, workerData] = await Promise.all([api.getComplaints(), api.getWorkers()]);
      setComplaints(complaintData);
      setWorkers(workerData);
      setError(null);
    } catch (err) {
      setError(`Could not reach CivicSync server: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Replace a single complaint in state with the server's copy
  const upsertComplaint = (updated) => {
    setComplaints(prev => {
      const exists = prev.some(c => c.id === updated.id);
      return exists ? prev.map(c => (c.id === updated.id ? updated : c)) : [updated, ...prev];
    });
  };

  const loginWithOtp = async ({ role, phone, name, ward, workerId }) => {
    try {
      const user = await api.login({ role, phone, name, ward, workerId });
      if (role === 'citizen') {
        setCitizenUser(user);
      } else if (role === 'worker') {
        setWorkerUser(user);
      } else if (role === 'admin') {
        setAdminUser(user);
      }
      setCurrentUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      return null;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Citizen adds a complaint
  const addComplaint = async (complaintData) => {
    try {
      const created = await api.createComplaint({
        ...complaintData,
        ward: complaintData.ward || citizenUser.ward || "Ward 12",
        citizen: {
          name: citizenUser.name,
          phone: citizenUser.phone,
          email: citizenUser.email,
          ward: citizenUser.ward
        }
      });
      upsertComplaint(created);
      return created;
    } catch (err) {
      setError(`Could not submit complaint: ${err.message}`);
      return null;
    }
  };

  // Admin assigns worker
  const assignWorker = async (complaintId, workerId, priority, adminNote) => {
    try {
      upsertComplaint(await api.assignWorker(complaintId, { workerId, priority, adminNote }));
    } catch (err) {
      setError(`Could not assign worker: ${err.message}`);
    }
  };

  // Worker or Admin updates status
  const updateComplaintStatus = async (complaintId, newStatus, remarks, proofImage) => {
    try {
      upsertComplaint(await api.updateStatus(complaintId, {
        status: newStatus,
        remarks,
        proofImage,
        actorRole: currentUser?.role
      }));
    } catch (err) {
      setError(`Could not update status: ${err.message}`);
    }
  };

  const upvoteComplaint = async (complaintId) => {
    // Optimistic update, then reconcile with the server
    setComplaints(prev => prev.map(c => (c.id === complaintId ? { ...c, upvotes: c.upvotes + 1 } : c)));
    try {
      upsertComplaint(await api.upvote(complaintId));
    } catch (err) {
      setError(`Could not upvote: ${err.message}`);
      fetchData();
    }
  };

  const resetData = async () => {
    try {
      await api.resetData();
      await fetchData();
    } catch (err) {
      setError(`Could not reset data: ${err.message}`);
    }
  };

  return (
    <CivicContext.Provider
      value={{
        complaints,
        workers,
        loading,
        error,
        refresh: fetchData,
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
