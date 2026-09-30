import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { X, MapPin, Phone, Mail, HardHat, ArrowRight } from 'lucide-react';

const AdminComplaintDetailModal = ({ complaint, onClose, onOpenAssignModal }) => {
  const { updateComplaintStatus } = useCivic();
  const [overrideStatus, setOverrideStatus] = useState(complaint.status);
  const [remarks, setRemarks] = useState('');
  const [statusUpdated, setStatusUpdated] = useState(false);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    updateComplaintStatus(complaint.id, overrideStatus, remarks || 'Status updated by Municipal Admin');
    setStatusUpdated(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          background: '#E69500',
          color: '#FFFFFF',
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Complaint Audit Dossier</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
              Ticket #{complaint.id}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`civic-badge ${
              complaint.status === 'Resolved' ? 'badge-resolved' :
              complaint.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
            }`} style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              {complaint.status}
            </span>
            <button
              onClick={onClose}
              style={{
                color: '#FFFFFF',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: 'calc(85vh - 70px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                Reporting Citizen
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                {complaint.citizenName}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Phone size={12} />
                <span>{complaint.citizenPhone}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <Mail size={12} />
                <span>{complaint.citizenEmail}</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>
                Municipal Area & Priority
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                {complaint.ward}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <MapPin size={12} color="#E69500" />
                <span>{complaint.location}</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#E69500', fontWeight: '700', marginTop: '4px' }}>
                Priority: {complaint.priority}
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
              Issue Description & Category
            </div>
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '10px',
              padding: '12px 14px'
            }}>
              <div style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: '700', color: '#E69500', background: '#FEF3C7', padding: '2px 8px', borderRadius: '6px', marginBottom: '6px' }}>
                {complaint.category}
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                {complaint.title}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5 }}>
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Assigned Worker Section */}
          <div style={{
            background: complaint.assignedWorker ? '#FFFBEB' : '#F1F5F9',
            border: '1px solid',
            borderColor: complaint.assignedWorker ? '#FDE68A' : '#CBD5E1',
            borderRadius: '12px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#F59E0B',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: '800'
              }}>
                <HardHat size={20} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
                  Assigned Maintenance Crew
                </div>
                {complaint.assignedWorker ? (
                  <>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A' }}>
                      {complaint.assignedWorker.name} ({complaint.assignedWorker.department})
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      Phone: {complaint.assignedWorker.phone}
                    </div>
                  </>
                ) : (
                  <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>
                    No field crew dispatched yet
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenAssignModal(complaint);
              }}
              style={{
                background: '#F59E0B',
                color: '#000000',
                fontWeight: '800',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{complaint.assignedWorker ? 'Reassign Crew' : 'Dispatch Worker'}</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Photo Evidences Comparison */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
              Photographic Evidence Audit
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ padding: '6px 10px', background: '#F8FAFC', fontSize: '0.72rem', fontWeight: '700', color: '#475569' }}>
                  1. Citizen Initial Photo
                </div>
                <div style={{ height: '140px', background: '#F1F5F9' }}>
                  {complaint.imageUrl ? (
                    <img src={complaint.imageUrl} alt="Initial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.75rem' }}>
                      No initial photo
                    </div>
                  )}
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ padding: '6px 10px', background: '#DCFCE7', fontSize: '0.72rem', fontWeight: '700', color: '#166534' }}>
                  2. Worker Completion Proof
                </div>
                <div style={{ height: '140px', background: '#F0FDF4' }}>
                  {complaint.resolvedImageUrl ? (
                    <img src={complaint.resolvedImageUrl} alt="Resolved" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.75rem', padding: '10px', textAlign: 'center' }}>
                      Pending completion by field worker
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
              Administrative Audit Trail
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderLeft: '2px solid #E2E8F0', paddingLeft: '14px', marginLeft: '6px' }}>
              {complaint.timeline?.map((event, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '3px',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#F59E0B'
                  }}></div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A' }}>
                    {event.stage} <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '500' }}>({event.date})</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                    {event.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Override Form */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              Municipal Status Override
            </div>

            <form onSubmit={handleUpdateStatus} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <select
                  value={overrideStatus}
                  onChange={(e) => setOverrideStatus(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="Pending">Pending Review</option>
                  <option value="In Progress">In Progress (Active Maintenance)</option>
                  <option value="Resolved">Resolved (Work Completed)</option>
                </select>

                <input
                  type="text"
                  placeholder="Optional admin note..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem'
                  }}
                />

                <button
                  type="submit"
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Update Status
                </button>
              </div>

              {statusUpdated && (
                <div style={{ color: '#16A34A', fontSize: '0.78rem', fontWeight: '700' }}>
                  ✓ Status updated successfully across the CivicSync network.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetailModal;
