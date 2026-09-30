import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { MapPin, CheckCircle2, Navigation, PlayCircle } from 'lucide-react';

const WorkerTaskList = ({ onSelectTask, onStartExecution }) => {
  const { complaints, workerUser, updateComplaintStatus } = useCivic();
  const [filterType, setFilterType] = useState('all'); // 'all' | 'in_progress' | 'pending'

  // Tasks assigned to this specific worker
  const myTasks = complaints.filter(c => 
    c.assignedWorker && (c.assignedWorker.id === workerUser?.id || c.assignedWorker.name === workerUser?.name)
  );

  const inProgressTasks = myTasks.filter(c => c.status === 'In Progress');
  const completedTasks = myTasks.filter(c => c.status === 'Resolved');

  const filteredTasks = myTasks.filter(t => {
    if (filterType === 'in_progress') return t.status === 'In Progress';
    if (filterType === 'pending') return t.status === 'Pending';
    return t.status !== 'Resolved';
  });

  const handleQuickStart = (e, task) => {
    e.stopPropagation();
    updateComplaintStatus(task.id, 'In Progress', 'Field crew arrived on site. Commencing maintenance work.');
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px 24px 60px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Daily Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #FDE68A',
          padding: '18px 20px',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B45309', textTransform: 'uppercase' }}>
            Active Tasks Assigned
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '900', color: '#B45309', marginTop: '4px' }}>
            {myTasks.filter(t => t.status !== 'Resolved').length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#B45309', marginTop: '2px' }}>
            Awaiting completion
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #FECACA',
          padding: '18px 20px',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#DC2626', textTransform: 'uppercase' }}>
            Currently On Site (In Progress)
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '900', color: '#DC2626', marginTop: '4px' }}>
            {inProgressTasks.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#DC2626', marginTop: '2px' }}>
            Work active on field
          </div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #BBF7D0',
          padding: '18px 20px',
          borderRadius: '16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#15803D', textTransform: 'uppercase' }}>
            Completed Work Orders
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: '900', color: '#15803D', marginTop: '4px' }}>
            {completedTasks.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#15803D', marginTop: '2px' }}>
            Verified with photo proof
          </div>
        </div>
      </div>

      {/* Filter and Title */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A' }}>
            Maintenance Task Queue ({filteredTasks.length})
          </h3>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            Assigned to {workerUser?.name}
          </span>
        </div>

        <div style={{
          display: 'flex',
          background: '#F1F5F9',
          borderRadius: '10px',
          padding: '3px'
        }}>
          <button
            onClick={() => setFilterType('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: filterType === 'all' ? '800' : '600',
              background: filterType === 'all' ? '#FFFFFF' : 'transparent',
              color: filterType === 'all' ? '#0F172A' : '#64748B',
              border: filterType === 'all' ? '1px solid #D1D5DB' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            All Assigned ({myTasks.filter(t => t.status !== 'Resolved').length})
          </button>

          <button
            onClick={() => setFilterType('in_progress')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: filterType === 'in_progress' ? '800' : '600',
              background: filterType === 'in_progress' ? '#FFFFFF' : 'transparent',
              color: filterType === 'in_progress' ? '#0F172A' : '#64748B',
              border: filterType === 'in_progress' ? '1px solid #D1D5DB' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            In Progress ({inProgressTasks.length})
          </button>
        </div>
      </div>

      {/* Task Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '20px'
      }}>
        {filteredTasks.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px dashed #CBD5E1',
            padding: '48px 24px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              All Caught Up!
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '420px', margin: '0 auto' }}>
              No pending maintenance jobs assigned to your shift right now. New citizen complaints will appear here once dispatched by Ward Admin.
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              onClick={() => onSelectTask(task)}
              style={{
                background: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #E2E8F0',
                padding: '18px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Header: ID, Priority & Status */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#E69500' }}>
                    {task.id}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: task.priority === 'Urgent' ? '#FEE2E2' : task.priority === 'High' ? '#FEF3C7' : '#F1F5F9',
                    color: task.priority === 'Urgent' ? '#DC2626' : task.priority === 'High' ? '#B45309' : '#475569'
                  }}>
                    {task.priority} Priority
                  </span>
                </div>

                <span className={`civic-badge ${
                  task.status === 'Resolved' ? 'badge-resolved' :
                  task.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
                }`}>
                  {task.status}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px', lineHeight: 1.3 }}>
                  {task.title}
                </h4>
                <p style={{
                  fontSize: '0.82rem',
                  color: '#475569',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.45
                }}>
                  {task.description}
                </p>
              </div>

              {/* Citizen photo */}
              {task.imageUrl && (
                <div style={{
                  width: '100%',
                  height: '140px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#F1F5F9'
                }}>
                  <img src={task.imageUrl} alt={task.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}

              {/* Location info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#F8FAFC',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '0.78rem',
                color: '#475569',
                marginTop: 'auto'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={14} color="#E69500" />
                  <span style={{ fontWeight: '600', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.location}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#0284C7', fontWeight: '700' }}>
                  <Navigation size={13} />
                  <span>GPS Directions</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '8px',
                paddingTop: '8px',
                borderTop: '1px solid #F1F5F9'
              }}>
                {task.status === 'Pending' && (
                  <button
                    onClick={(e) => handleQuickStart(e, task)}
                    style={{
                      flex: 1,
                      background: '#FEF3C7',
                      color: '#B45309',
                      border: '1px solid #FDE68A',
                      fontWeight: '800',
                      padding: '10px',
                      borderRadius: '10px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <PlayCircle size={15} />
                    <span>Begin Work (On Site)</span>
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartExecution(task);
                  }}
                  style={{
                    flex: 1,
                    background: '#E69500',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    border: '1px solid #D97706',
                    cursor: 'pointer'
                  }}
                >
                  <CheckCircle2 size={15} />
                  <span>Resolve & Upload Proof</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerTaskList;
