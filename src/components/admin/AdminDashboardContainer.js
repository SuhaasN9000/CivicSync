import React, { useState } from 'react';
import AdminTopNav from './AdminTopNav';
import AdminOverview from './AdminOverview';
import AdminWorkerDirectory from './AdminWorkerDirectory';
import AdminAnalytics from './AdminAnalytics';
import AdminProfile from './AdminProfile';
import AssignWorkerModal from './AssignWorkerModal';
import AdminComplaintDetailModal from './AdminComplaintDetailModal';

const AdminDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'workers' | 'analytics' | 'profile'
  const [assigningComplaint, setAssigningComplaint] = useState(null);
  const [detailComplaint, setDetailComplaint] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <AdminTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1 }}>
        {activeTab === 'complaints' && (
          <AdminOverview
            onOpenAssignModal={(complaint) => setAssigningComplaint(complaint)}
            onOpenDetailModal={(complaint) => setDetailComplaint(complaint)}
          />
        )}

        {activeTab === 'workers' && (
          <AdminWorkerDirectory />
        )}

        {activeTab === 'analytics' && (
          <AdminAnalytics />
        )}

        {activeTab === 'profile' && (
          <AdminProfile />
        )}
      </main>

      {/* Assign Worker Modal */}
      {assigningComplaint && (
        <AssignWorkerModal
          complaint={assigningComplaint}
          onClose={() => setAssigningComplaint(null)}
        />
      )}

      {/* Audit Detail Modal */}
      {detailComplaint && (
        <AdminComplaintDetailModal
          complaint={detailComplaint}
          onClose={() => setDetailComplaint(null)}
          onOpenAssignModal={(c) => {
            setDetailComplaint(null);
            setAssigningComplaint(c);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboardContainer;
