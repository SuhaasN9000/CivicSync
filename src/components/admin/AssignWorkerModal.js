import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { X, HardHat, CheckCircle2 } from 'lucide-react';

const AssignWorkerModal = ({ complaint, onClose }) => {
  const { workers, assignWorker, complaints } = useCivic();

  // Suggest worker matching category
  const suggestedWorker = workers.find(w => {
    if (complaint.category.includes('Road') && w.department.includes('Road')) return true;
    if (complaint.category.includes('Sanitation') && w.department.includes('Sanitation')) return true;
    if (complaint.category.includes('Water') && w.department.includes('Water')) return true;
    if (complaint.category.includes('Light') && w.department.includes('Electrical')) return true;
    return false;
  }) || workers[0];

  const [selectedWorkerId, setSelectedWorkerId] = useState(complaint.assignedWorker?.id || suggestedWorker?.id);
  const [priority, setPriority] = useState(complaint.priority || 'High');
  const [adminNote, setAdminNote] = useState(
    `Dispatched by Ward 12 Authority. Please inspect location at ${complaint.location} and upload photo proof upon resolution.`
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const getWorkerActiveCount = (workerId) => {
    return complaints.filter(c => c.assignedWorker?.id === workerId && c.status !== 'Resolved').length;
  };

  const handleAssign = (e) => {
    e.preventDefault();
    assignWorker(complaint.id, selectedWorkerId, priority, adminNote);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          background: '#E69500',
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HardHat size={20} color="#FFFFFF" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>
              Assign Crew: {complaint.id}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#FFFFFF',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#DCFCE7',
                color: '#15803D',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px'
              }}>
                <CheckCircle2 size={34} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                Maintenance Assigned!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                Field crew has been dispatched. Status switched to <strong>In Progress</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Complaint Overview */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '12px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#E69500', fontWeight: '800' }}>
                  {complaint.category} • Ward 12
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
                  {complaint.title}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
                  Location: {complaint.location}
                </div>
              </div>

              {/* Select Worker */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Select Maintenance Field Officer *
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {workers.map(w => {
                    const isSelected = selectedWorkerId === w.id;
                    const activeCount = getWorkerActiveCount(w.id);

                    return (
                      <div
                        key={w.id}
                        onClick={() => setSelectedWorkerId(w.id)}
                        style={{
                          border: '1.5px solid',
                          borderColor: isSelected ? '#F59E0B' : '#E2E8F0',
                          background: isSelected ? '#FFFBEB' : '#FFFFFF',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: isSelected ? '#F59E0B' : '#F1F5F9',
                            color: isSelected ? '#000000' : '#475569',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: '800'
                          }}>
                            {w.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0F172A' }}>
                              {w.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                              {w.department} • Rating: {w.rating}★
                            </div>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            background: activeCount > 2 ? '#FEF3C7' : '#DCFCE7',
                            color: activeCount > 2 ? '#B45309' : '#15803D'
                          }}>
                            {activeCount} active tasks
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Set Priority */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Urgency / Priority Level
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        border: '1px solid',
                        borderColor: priority === p ? '#F59E0B' : '#E2E8F0',
                        background: priority === p ? '#FEF3C7' : '#FFFFFF',
                        color: priority === p ? '#B45309' : '#64748B'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Dispatch Instructions */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Officer Dispatch Instructions & SLA Note
                </label>
                <textarea
                  rows={2}
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* CTA */}
              <button
                type="submit"
                style={{
                  background: '#F59E0B',
                  color: '#000000',
                  fontWeight: '700',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid #D97706'
                }}
              >
                <CheckCircle2 size={16} />
                <span>Confirm Assignment & Notify Officer</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignWorkerModal;
