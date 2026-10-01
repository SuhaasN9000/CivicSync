import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { HardHat, LogOut, CheckCircle2, ListTodo } from 'lucide-react';

const WorkerHeader = ({ activeTab, setActiveTab }) => {
  const { workerUser, logout } = useCivic();
  const [isOnDuty, setIsOnDuty] = useState(true);

  return (
    <header style={{
      background: '#E69500',
      color: '#FFFFFF',
      borderBottom: '1px solid #D97706',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0 24px',
        height: '62px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        {/* Left: Brand & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onClick={() => setActiveTab('tasks')}
          >
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FFFFFF',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HardHat size={20} color="#E69500" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '0.5px', color: '#FFFFFF' }}>
                CIVICSYNC
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: '800',
                background: 'rgba(0,0,0,0.18)',
                padding: '2px 6px',
                borderRadius: '4px',
                letterSpacing: '0.5px'
              }}>
                FIELD
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', gap: '4px', height: '62px' }}>
            <button
              onClick={() => setActiveTab('tasks')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'tasks' ? '800' : '500',
                borderBottom: activeTab === 'tasks' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'tasks' ? 'rgba(0,0,0,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <ListTodo size={15} />
              <span>Task Queue</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'history' ? '800' : '500',
                borderBottom: activeTab === 'history' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'history' ? 'rgba(0,0,0,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <CheckCircle2 size={15} />
              <span>Completed Logs</span>
            </button>
          </nav>
        </div>

        {/* Right Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Duty Status */}
          <button
            onClick={() => setIsOnDuty(!isOnDuty)}
            style={{
              background: isOnDuty ? '#DCFCE7' : 'rgba(0,0,0,0.22)',
              color: isOnDuty ? '#15803D' : '#FFFFFF',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: isOnDuty ? '#16A34A' : '#EF4444'
            }}></span>
            <span>{isOnDuty ? 'ON DUTY' : 'OFF DUTY'}</span>
          </button>

          {/* Worker Profile Badge - Clickable to open Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            title="View Officer Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'profile' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.12)',
              padding: '4px 12px 4px 4px',
              borderRadius: '20px',
              border: activeTab === 'profile' ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              textAlign: 'left'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '0.8rem'
            }}>
              {workerUser?.name?.charAt(0) || 'W'}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: 1.1, color: '#FFFFFF' }}>
                {workerUser?.name}
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.85, color: '#FFFFFF' }}>
                Officer Profile
              </div>
            </div>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            title="Sign Out to Login Page"
            style={{
              color: '#FFFFFF',
              background: 'rgba(0,0,0,0.15)',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default WorkerHeader;
