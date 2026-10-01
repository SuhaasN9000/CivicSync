import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { Star } from 'lucide-react';

const AdminWorkerDirectory = ({ onSelectWorkerTasks }) => {
  const { workers, complaints } = useCivic();

  const getWorkerTasks = (workerId) => {
    return complaints.filter(c => c.assignedWorker?.id === workerId);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>
            Municipal Field Workforce
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
            Duty rosters, crew workload distribution, and citizen ratings
          </p>
        </div>

        <div style={{
          background: '#DCFCE7',
          color: '#15803D',
          border: '1px solid #BBF7D0',
          padding: '8px 16px',
          borderRadius: '10px',
          fontSize: '0.82rem',
          fontWeight: '700'
        }}>
          ● {workers.length} Field Officers Active in Ward 12 & 14
        </div>
      </div>

      {/* Workers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {workers.map(worker => {
          const tasks = getWorkerTasks(worker.id);
          const activeTasks = tasks.filter(t => t.status !== 'Resolved');
          const resolvedTasks = tasks.filter(t => t.status === 'Resolved');

          return (
            <div
              key={worker.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#FEF3C7',
                    color: '#B45309',
                    border: '2px solid #F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: '800'
                  }}>
                    {worker.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A' }}>
                      {worker.name}
                    </h3>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      ID: {worker.id} • {worker.department}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '12px',
                  background: worker.status === 'On Duty' ? '#DCFCE7' : '#F1F5F9',
                  color: worker.status === 'On Duty' ? '#15803D' : '#64748B',
                  border: '1px solid',
                  borderColor: worker.status === 'On Duty' ? '#BBF7D0' : '#E2E8F0'
                }}>
                  {worker.status}
                </span>
              </div>

              {/* Bio & Ratings */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: '#F8FAFC',
                padding: '10px',
                borderRadius: '10px',
                fontSize: '0.78rem'
              }}>
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>Zone / Area:</div>
                  <div style={{ fontWeight: '700', color: '#0F172A' }}>{worker.ward}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>Phone:</div>
                  <div style={{ fontWeight: '700', color: '#0F172A' }}>{worker.phone}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>Citizen Rating:</div>
                  <div style={{ fontWeight: '700', color: '#D97706', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <span>{worker.rating} / 5.0</span>
                  </div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '0.7rem' }}>All-Time Resolved:</div>
                  <div style={{ fontWeight: '700', color: '#16A34A' }}>{worker.completedCount + resolvedTasks.length} jobs</div>
                </div>
              </div>

              {/* Current Shift Load */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#475569' }}>
                  Current Active Workload:
                </span>
                <span style={{
                  fontWeight: '800',
                  color: activeTasks.length > 2 ? '#B45309' : '#15803D',
                  background: activeTasks.length > 2 ? '#FEF3C7' : '#DCFCE7',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {activeTasks.length} task(s) active
                </span>
              </div>

              {/* Active Tasks list */}
              {activeTasks.length > 0 && (
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '0.75rem' }}>
                  <div style={{ fontWeight: '700', color: '#64748B', marginBottom: '4px' }}>
                    Currently Handling:
                  </div>
                  {activeTasks.map(t => (
                    <div key={t.id} style={{ color: '#334155', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <span style={{ color: '#E69500', fontWeight: '800' }}>{t.id}:</span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminWorkerDirectory;
