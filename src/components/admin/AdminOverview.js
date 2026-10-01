import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { Search, HardHat, CheckCircle2, Clock, AlertTriangle, Eye, UserPlus } from 'lucide-react';

const AdminOverview = ({ onOpenAssignModal, onOpenDetailModal }) => {
  const { complaints } = useCivic();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [wardFilter, setWardFilter] = useState('All');

  // KPI Calculations
  const totalCount = complaints.length;
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const resolutionRate = totalCount > 0 ? Math.round((resolvedCount / totalCount) * 100) : 0;

  // Filter complaints
  const filtered = complaints.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchesWard = wardFilter === 'All' || c.ward === wardFilter;

    return matchesSearch && matchesStatus && matchesCategory && matchesWard;
  });

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>
            Municipal Operations Dashboard
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Real-time citizen grievance intake, crew dispatch, and SLA resolution tracking
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '8px 14px',
            fontSize: '0.82rem',
            fontWeight: '700',
            color: '#334155'
          }}>
            🏢 Active Ward: <span style={{ color: '#E69500' }}>Ward 12 (Central)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '14px'
      }}>
        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px 18px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
            Total Complaints
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>
            {totalCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: '700', marginTop: '2px' }}>
            ● Citywide Registered
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #FECACA',
          padding: '16px 18px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#DC2626', textTransform: 'uppercase' }}>
            Pending Verification
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#DC2626', marginTop: '4px' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#991B1B', fontWeight: '700', marginTop: '2px' }}>
            Requires Triage
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #FDE68A',
          padding: '16px 18px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B45309', textTransform: 'uppercase' }}>
            In Progress (Field Crews)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#D97706', marginTop: '4px' }}>
            {inProgressCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: '700', marginTop: '2px' }}>
            Active on site
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #BBF7D0',
          padding: '16px 18px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#15803D', textTransform: 'uppercase' }}>
            Resolved Cases
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#16A34A', marginTop: '4px' }}>
            {resolvedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: '700', marginTop: '2px' }}>
            Verified with Photo
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px 18px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
            Resolution Rate
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', marginTop: '4px' }}>
            {resolutionRate}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>
            Avg SLA: 18.4 hrs
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E2E8F0',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '10px',
          padding: '8px 14px',
          width: '320px'
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by ID, keyword, citizen, road..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.85rem',
              width: '100%'
            }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              <option value="All">All Departments</option>
              <option value="Roads & Infrastructure">Roads</option>
              <option value="Sanitation & Waste">Sanitation</option>
              <option value="Water Supply">Water</option>
              <option value="Electrical & Lighting">Electricity</option>
              <option value="Drainage">Drainage</option>
            </select>
          </div>

          {/* Ward Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Ward:</span>
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.82rem',
                fontWeight: '600'
              }}
            >
              <option value="All">All Wards</option>
              <option value="Ward 12">Ward 12 (Central)</option>
              <option value="Ward 14">Ward 14 (East)</option>
              <option value="Ward 08">Ward 08 (North)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Complaints Table matching Figma design */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Ticket ID
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Citizen
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Category & Issue
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Location / Ward
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Status
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase' }}>
                Assigned Worker
              </th>
              <th style={{ padding: '14px 18px', fontSize: '0.75rem', fontWeight: '800', color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '40px', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                  No complaints match your active search and filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((complaint, index) => (
                <tr
                  key={complaint.id}
                  style={{
                    borderBottom: '1px solid #F1F5F9',
                    background: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    transition: 'background 0.15s ease'
                  }}
                >
                  {/* Ticket ID */}
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      fontWeight: '800',
                      color: '#E69500',
                      fontSize: '0.85rem'
                    }}>
                      {complaint.id}
                    </span>
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                      {complaint.createdAt.split(',')[0]}
                    </div>
                  </td>

                  {/* Citizen */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0F172A' }}>
                      {complaint.citizenName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      {complaint.citizenPhone}
                    </div>
                  </td>

                  {/* Category & Title */}
                  <td style={{ padding: '14px 18px', maxWidth: '280px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B' }}>
                      {complaint.category}
                    </div>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      color: '#0F172A',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {complaint.title}
                    </div>
                  </td>

                  {/* Location */}
                  <td style={{ padding: '14px 18px', maxWidth: '200px' }}>
                    <div style={{
                      fontSize: '0.82rem',
                      color: '#334155',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {complaint.location}
                    </div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#94A3B8' }}>
                      {complaint.ward}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td style={{ padding: '14px 18px' }}>
                    <span className={`civic-badge ${
                      complaint.status === 'Resolved' ? 'badge-resolved' :
                      complaint.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
                    }`}>
                      {complaint.status === 'Resolved' && <CheckCircle2 size={10} />}
                      {complaint.status === 'In Progress' && <Clock size={10} />}
                      {complaint.status === 'Pending' && <AlertTriangle size={10} />}
                      {complaint.status}
                    </span>
                  </td>

                  {/* Assigned Worker */}
                  <td style={{ padding: '14px 18px' }}>
                    {complaint.assignedWorker ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: '#FEF3C7',
                          color: '#B45309',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: '800'
                        }}>
                          {complaint.assignedWorker.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A' }}>
                            {complaint.assignedWorker.name}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                            {complaint.assignedWorker.department}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => onOpenAssignModal(complaint)}
                        style={{
                          background: '#FFFBEB',
                          border: '1px dashed #F59E0B',
                          color: '#B45309',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <UserPlus size={12} />
                        Assign Worker
                      </button>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => onOpenDetailModal(complaint)}
                        title="View Full Audit"
                        style={{
                          background: '#F1F5F9',
                          color: '#334155',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={13} />
                        <span>Audit</span>
                      </button>

                      <button
                        onClick={() => onOpenAssignModal(complaint)}
                        title="Assign or Reassign Worker"
                        style={{
                          background: '#F59E0B',
                          color: '#000000',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '800',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <HardHat size={13} />
                        <span>Dispatch</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOverview;
