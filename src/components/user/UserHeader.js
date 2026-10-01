import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { LogOut, Plus } from 'lucide-react';

const UserHeader = ({ activeTab, setActiveTab, onOpenReportModal }) => {
  const { citizenUser, logout } = useCivic();

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
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 24px',
        height: '62px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => setActiveTab('feed')}
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
              <span style={{ fontSize: '18px' }}>🏛️</span>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '0.5px', color: '#FFFFFF' }}>
                CIVICSYNC
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', gap: '4px', height: '62px' }}>
            <button
              onClick={() => setActiveTab('feed')}
              style={{
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'feed' ? '800' : '500',
                borderBottom: activeTab === 'feed' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'feed' ? 'rgba(0,0,0,0.08)' : 'transparent'
              }}
            >
              Issues Feed
            </button>

            <button
              onClick={() => setActiveTab('myreports')}
              style={{
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'myreports' ? '800' : '500',
                borderBottom: activeTab === 'myreports' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'myreports' ? 'rgba(0,0,0,0.08)' : 'transparent'
              }}
            >
              My Reports
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'profile' ? '800' : '500',
                borderBottom: activeTab === 'profile' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'profile' ? 'rgba(0,0,0,0.08)' : 'transparent'
              }}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* White Report Button */}
          <button
            onClick={onOpenReportModal}
            style={{
              background: '#FFFFFF',
              color: '#111827',
              fontWeight: '700',
              padding: '7px 15px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(0,0,0,0.08)',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} color="#D97706" strokeWidth={2.5} />
            <span>Report Issue</span>
          </button>

          {/* User Icon & Pill - Clickable to open Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            title="View Citizen Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'profile' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.12)',
              padding: '4px 12px 4px 4px',
              borderRadius: '20px',
              border: activeTab === 'profile' ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
              cursor: 'pointer',
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
              {citizenUser?.name?.charAt(0) || 'C'}
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: 1.1, color: '#FFFFFF' }}>
                {citizenUser?.name}
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.9, color: '#FFFFFF' }}>
                {citizenUser?.ward}
              </div>
            </div>
          </button>

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
              gap: '4px'
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

export default UserHeader;
