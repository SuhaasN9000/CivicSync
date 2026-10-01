import React, { useState } from 'react';
import { CheckCircle, MapPin, Phone, ArrowLeft, Star } from 'lucide-react';

const TrackComplaintModal = ({ complaint, onClose }) => {
  const [rating, setRating] = useState(5);
  const [feedbackSent, setFeedbackSent] = useState(false);

  if (!complaint) return null;

  const STEPS = [
    { id: 1, title: 'Complaint Registered', desc: 'Submitted by citizen' },
    { id: 2, title: 'Under Review', desc: 'Verified by Ward Desk' },
    { id: 3, title: 'Worker Assigned', desc: 'Dispatched to field maintenance' },
    { id: 4, title: 'Resolved & Verified', desc: 'Work finished with photo proof' }
  ];

  // Determine current active step
  let currentStep = 1;
  if (complaint.status === 'In Progress') {
    currentStep = complaint.assignedWorker ? 3 : 2;
  } else if (complaint.status === 'Resolved') {
    currentStep = 4;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '0', overflow: 'hidden' }}
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
              <ArrowLeft size={16} />
            </button>
            <div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Ticket Tracking</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800' }}>
                {complaint.id}
              </h3>
            </div>
          </div>

          <span className={`civic-badge ${
            complaint.status === 'Resolved' ? 'badge-resolved' :
            complaint.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
          }`}>
            {complaint.status}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', maxHeight: 'calc(80vh - 60px)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Issue Overview Card */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: '#E69500', fontWeight: '700' }}>
                {complaint.category}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                {complaint.createdAt}
              </span>
            </div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              {complaint.title}
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, marginBottom: '10px' }}>
              {complaint.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748B' }}>
              <MapPin size={12} color="#E69500" />
              <span>{complaint.location}</span>
            </div>
          </div>

          {/* Stepper Progress Bar (matching Figma) */}
          <div>
            <h5 style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', marginBottom: '12px' }}>
              Resolution Progress
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', paddingLeft: '8px' }}>
              {STEPS.map((step, index) => {
                const isPassed = step.id < currentStep;
                const isCurrent = step.id === currentStep;
                const isResolved = complaint.status === 'Resolved';

                return (
                  <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', position: 'relative' }}>
                    {/* Circle icon */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: (isPassed || (isCurrent && isResolved)) ? '#DCFCE7' : isCurrent ? '#FEF3C7' : '#F1F5F9',
                      border: '2px solid',
                      borderColor: (isPassed || (isCurrent && isResolved)) ? '#16A34A' : isCurrent ? '#F59E0B' : '#CBD5E1',
                      color: (isPassed || (isCurrent && isResolved)) ? '#16A34A' : isCurrent ? '#B45309' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '800',
                      flexShrink: 0,
                      zIndex: 2
                    }}>
                      {isPassed || (isCurrent && isResolved) ? <CheckCircle size={15} /> : step.id}
                    </div>

                    {/* Step description */}
                    <div style={{ flex: 1, paddingTop: '2px' }}>
                      <div style={{
                        fontSize: '0.85rem',
                        fontWeight: isCurrent ? '800' : '600',
                        color: isCurrent ? '#0F172A' : isPassed ? '#334155' : '#94A3B8'
                      }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {step.desc}
                      </div>

                      {/* Matching timeline event if present */}
                      {complaint.timeline && complaint.timeline[index] && (
                        <div style={{ fontSize: '0.7rem', color: '#E69500', fontWeight: '600', marginTop: '2px' }}>
                          📅 {complaint.timeline[index].date} - {complaint.timeline[index].note}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Worker Info (if present) */}
          {complaint.assignedWorker && (
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '12px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase', marginBottom: '6px' }}>
                👷 Assigned Field Maintenance Officer
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A' }}>
                    {complaint.assignedWorker.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {complaint.assignedWorker.department}
                  </div>
                </div>

                <a
                  href={`tel:${complaint.assignedWorker.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#F59E0B',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={12} />
                  <span>Call Officer</span>
                </a>
              </div>
            </div>
          )}

          {/* Photos Comparison (Before / After) */}
          <div>
            <h5 style={{ fontSize: '0.82rem', fontWeight: '800', color: '#334155', textTransform: 'uppercase', marginBottom: '8px' }}>
              Photographic Evidence
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: complaint.resolvedImageUrl ? '1fr 1fr' : '1fr', gap: '8px' }}>
              {complaint.imageUrl && (
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748B', marginBottom: '4px' }}>
                    Citizen Initial Report
                  </div>
                  <div style={{ height: '110px', borderRadius: '8px', overflow: 'hidden', background: '#F1F5F9' }}>
                    <img src={complaint.imageUrl} alt="Initial Issue" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              )}

              {complaint.resolvedImageUrl && (
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', color: '#16A34A', marginBottom: '4px' }}>
                    Worker Resolution Proof
                  </div>
                  <div style={{ height: '110px', borderRadius: '8px', overflow: 'hidden', background: '#DCFCE7' }}>
                    <img src={complaint.resolvedImageUrl} alt="Resolution" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
              )}
            </div>

            {complaint.workerNotes && (
              <div style={{
                marginTop: '8px',
                background: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '0.75rem',
                color: '#166534'
              }}>
                <strong>Worker Remarks:</strong> {complaint.workerNotes}
              </div>
            )}
          </div>

          {/* Feedback Rating when resolved */}
          {complaint.status === 'Resolved' && (
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '14px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                Rate Municipal Redressal
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '10px' }}>
                How satisfied are you with the resolution speed and work quality?
              </div>

              {feedbackSent ? (
                <div style={{ color: '#16A34A', fontSize: '0.8rem', fontWeight: '700' }}>
                  ✓ Thank you! Your feedback has been sent to Ward 12 Council.
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '12px' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{ color: star <= rating ? '#F59E0B' : '#CBD5E1' }}
                      >
                        <Star size={24} fill={star <= rating ? '#F59E0B' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setFeedbackSent(true)}
                    style={{
                      background: '#F59E0B',
                      color: '#000000',
                      fontWeight: '700',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.8rem'
                    }}
                  >
                    Submit Citizen Rating
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackComplaintModal;
