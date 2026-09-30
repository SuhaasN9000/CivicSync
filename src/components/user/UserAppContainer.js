import React, { useState } from 'react';
import UserHeader from './UserHeader';
import UserFeed from './UserFeed';
import UserMyReports from './UserMyReports';
import UserProfile from './UserProfile';
import ReportIssueModal from './ReportIssueModal';
import TrackComplaintModal from './TrackComplaintModal';

const UserAppContainer = () => {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'myreports' | 'profile'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      <UserHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'feed' && (
          <UserFeed
            onOpenReportModal={() => setIsReportModalOpen(true)}
            onSelectComplaint={(complaint) => setSelectedComplaint(complaint)}
          />
        )}

        {activeTab === 'myreports' && (
          <UserMyReports
            onSelectComplaint={(complaint) => setSelectedComplaint(complaint)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfile />
        )}
      </main>

      {/* Report Complaint Modal */}
      {isReportModalOpen && (
        <ReportIssueModal
          onClose={() => setIsReportModalOpen(false)}
          onComplaintCreated={(newComp) => {
            setSelectedComplaint(newComp);
          }}
        />
      )}

      {/* Tracking Details Modal */}
      {selectedComplaint && (
        <TrackComplaintModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </div>
  );
};

export default UserAppContainer;
