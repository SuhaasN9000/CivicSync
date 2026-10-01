import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { CheckCircle2, Star } from 'lucide-react';

const WorkerHistory = ({ onSelectTask }) => {
  const { workerUser, complaints } = useCivic();

  const completedTasks = complaints.filter(c =>
    c.status === 'Resolved' &&
    c.assignedWorker &&
    (c.assignedWorker.id === workerUser.id || c.assignedWorker.name === workerUser.name)
  );

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '40px' }}>
      {/* Officer Bio Card */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          background: '#DCFCE7',
          color: '#15803D',
          border: '2px solid #16A34A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          fontWeight: '800'
        }}>
          {workerUser.name.charAt(0)}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A' }}>
              {workerUser.name}
            </h3>
            <span style={{
              background: '#FEF3C7',
              color: '#B45309',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '2px 6px',
              borderRadius: '10px'
            }}>
              OFFICER
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
            {workerUser.department} • {workerUser.ward}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '0.75rem', color: '#B45309', fontWeight: '700' }}>
            <Star size={13} fill="#F59E0B" color="#F59E0B" />
            <span>4.9 / 5.0 (Municipal Citizen Rating)</span>
          </div>
        </div>
      </div>

      {/* Finished Tasks List */}
      <div>
        <h4 style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0F172A', marginBottom: '10px' }}>
          Completed Maintenance Orders ({completedTasks.length})
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {completedTasks.length === 0 ? (
            <div style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px dashed #CBD5E1',
              padding: '28px 16px',
              textAlign: 'center',
              color: '#64748B',
              fontSize: '0.85rem'
            }}>
              No completed tasks logged yet for this shift.
            </div>
          ) : (
            completedTasks.map(task => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#E69500' }}>
                    {task.id}
                  </span>
                  <span className="civic-badge badge-resolved">
                    <CheckCircle2 size={10} />
                    Resolved
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>
                  {task.title}
                </div>

                {/* Proof images */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '4px' }}>
                  {task.imageUrl && (
                    <div style={{ height: '70px', borderRadius: '6px', overflow: 'hidden', background: '#F1F5F9' }}>
                      <img src={task.imageUrl} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  {task.resolvedImageUrl && (
                    <div style={{ height: '70px', borderRadius: '6px', overflow: 'hidden', background: '#DCFCE7' }}>
                      <img src={task.resolvedImageUrl} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>

                {task.workerNotes && (
                  <div style={{ fontSize: '0.75rem', color: '#166534', background: '#F0FDF4', padding: '6px 8px', borderRadius: '6px', marginTop: '2px' }}>
                    ✓ {task.workerNotes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerHistory;
