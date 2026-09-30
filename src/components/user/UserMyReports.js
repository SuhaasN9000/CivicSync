import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import {
  Plus,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Search,
  HardHat
} from 'lucide-react';

const UserMyReports = ({ onSelectComplaint, onOpenReportModal }) => {
  const { citizenUser, complaints } = useCivic();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'in_progress' | 'resolved'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter complaints filed by this citizen
  const myComplaints = complaints.filter(c =>
    c.citizenEmail === citizenUser.email || c.citizenName === citizenUser.name
  );

  const pendingComplaints = myComplaints.filter(c => c.status === 'Pending');
  const inProgressComplaints = myComplaints.filter(c => c.status === 'In Progress');
  const resolvedComplaints = myComplaints.filter(c => c.status === 'Resolved');

  const filteredList = myComplaints.filter(item => {
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'pending'
        ? item.status === 'Pending'
        : filterStatus === 'in_progress'
        ? item.status === 'In Progress'
        : item.status === 'Resolved';

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 60px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
            Citizen Grievance Tracker
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginTop: '2px' }}>
            My Filed Reports ({myComplaints.length})
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#4B5563', maxWidth: '620px', marginTop: '4px' }}>
            Real-time status updates, field crew dispatch assignments, and completion photo proofs for issues you reported.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          style={{
            background: '#E69500',
            color: '#FFFFFF',
            fontWeight: '700',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #D97706',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* KPI Count Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        <div
          onClick={() => setFilterStatus('all')}
          style={{
            background: '#FFFFFF',
            border: '1px solid',
            borderColor: filterStatus === 'all' ? '#D97706' : '#E5E7EB',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>
            Total Reported
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', marginTop: '2px' }}>
            {myComplaints.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>All citizen tickets</div>
        </div>

        <div
          onClick={() => setFilterStatus('pending')}
          style={{
            background: '#FFFFFF',
            border: '1px solid',
            borderColor: filterStatus === 'pending' ? '#DC2626' : '#FECACA',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#DC2626', textTransform: 'uppercase' }}>
            Pending Review
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#DC2626', marginTop: '2px' }}>
            {pendingComplaints.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#991B1B' }}>Awaiting triage</div>
        </div>

        <div
          onClick={() => setFilterStatus('in_progress')}
          style={{
            background: '#FFFFFF',
            border: '1px solid',
            borderColor: filterStatus === 'in_progress' ? '#D97706' : '#FDE68A',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B45309', textTransform: 'uppercase' }}>
            In Progress
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>
            {inProgressComplaints.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#B45309' }}>Field crew active</div>
        </div>

        <div
          onClick={() => setFilterStatus('resolved')}
          style={{
            background: '#FFFFFF',
            border: '1px solid',
            borderColor: filterStatus === 'resolved' ? '#16A34A' : '#BBF7D0',
            borderRadius: '10px',
            padding: '14px 16px',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#15803D', textTransform: 'uppercase' }}>
            Resolved
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>
            {resolvedComplaints.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#15803D' }}>Photo proof verified</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F9FAFB',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          padding: '6px 12px',
          flex: '1',
          minWidth: '240px'
        }}>
          <Search size={15} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Search by title, ticket ID, or landmark..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.85rem',
              width: '100%',
              color: '#111827'
            }}
          />
        </div>

        {/* Category selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '0.82rem',
              background: '#FFFFFF',
              color: '#374151'
            }}
          >
            <option value="All">All Categories</option>
            <option value="Roads & Infrastructure">Roads & Infrastructure</option>
            <option value="Sanitation & Waste">Sanitation & Waste</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electrical & Lighting">Electrical & Lighting</option>
            <option value="Drainage">Drainage</option>
          </select>

          {/* Status Tabs */}
          <div style={{
            display: 'flex',
            background: '#F3F4F6',
            borderRadius: '8px',
            padding: '3px'
          }}>
            <button
              onClick={() => setFilterStatus('all')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: filterStatus === 'all' ? '700' : '500',
                background: filterStatus === 'all' ? '#FFFFFF' : 'transparent',
                color: filterStatus === 'all' ? '#111827' : '#4B5563',
                border: filterStatus === 'all' ? '1px solid #D1D5DB' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: filterStatus === 'pending' ? '700' : '500',
                background: filterStatus === 'pending' ? '#FFFFFF' : 'transparent',
                color: filterStatus === 'pending' ? '#111827' : '#4B5563',
                border: filterStatus === 'pending' ? '1px solid #D1D5DB' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('in_progress')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: filterStatus === 'in_progress' ? '700' : '500',
                background: filterStatus === 'in_progress' ? '#FFFFFF' : 'transparent',
                color: filterStatus === 'in_progress' ? '#111827' : '#4B5563',
                border: filterStatus === 'in_progress' ? '1px solid #D1D5DB' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: filterStatus === 'resolved' ? '700' : '500',
                background: filterStatus === 'resolved' ? '#FFFFFF' : 'transparent',
                color: filterStatus === 'resolved' ? '#111827' : '#4B5563',
                border: filterStatus === 'resolved' ? '1px solid #D1D5DB' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredList.length === 0 ? (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px dashed #D1D5DB',
            padding: '50px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📁</div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '6px' }}>
              No Reports Found
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#6B7280', maxWidth: '420px', margin: '0 auto 16px auto' }}>
              {searchTerm || selectedCategory !== 'All' || filterStatus !== 'all'
                ? 'Try adjusting your filters or search terms.'
                : 'You have not reported any civic issues yet.'}
            </p>
            <button
              onClick={onOpenReportModal}
              style={{
                background: '#E69500',
                color: '#FFFFFF',
                fontWeight: '700',
                padding: '9px 18px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                border: '1px solid #D97706',
                cursor: 'pointer'
              }}
            >
              Report a Civic Issue Now
            </button>
          </div>
        ) : (
          filteredList.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectComplaint(item)}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '18px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              {/* Photo Evidence if available */}
              {item.imageUrl && (
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#F3F4F6',
                  flexShrink: 0
                }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              {/* Main Info */}
              <div style={{ flex: '1', minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#E69500' }}>
                    {item.id}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#4B5563', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>
                    • Reported on {item.createdAt}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#111827', marginBottom: '4px', lineHeight: 1.3 }}>
                  {item.title}
                </h4>

                <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: 1.4, marginBottom: '6px' }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: '#6B7280', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#E69500" />
                    {item.location}
                  </span>

                  {item.assignedWorker && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#B45309', fontWeight: '600' }}>
                      <HardHat size={12} />
                      Assigned: {item.assignedWorker.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Status and Action */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }}>
                  <span className={`civic-badge ${
                    item.status === 'Resolved' ? 'badge-resolved' :
                    item.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
                  }`} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                    {item.status === 'Resolved' && <CheckCircle size={12} />}
                    {item.status === 'In Progress' && <Clock size={12} />}
                    {item.status === 'Pending' && <AlertCircle size={12} />}
                    {item.status}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '4px' }}>
                    Priority: {item.priority}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#E69500',
                  fontSize: '0.82rem',
                  fontWeight: '700'
                }}>
                  <span>Track Status</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserMyReports;
