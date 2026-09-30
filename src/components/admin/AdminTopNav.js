import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { Layers, Users, BarChart3, LogOut, MapPin } from 'lucide-react';

const AdminTopNav = ({ activeTab, setActiveTab }) => {
  const { adminUser, logout } = useCivic();

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
          {/* Logo & Brand */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap' }}
            onClick={() => setActiveTab('complaints')}
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
                ADMIN
              </span>
            </div>
          </div>

          {/* Navigation Tabs - Concise, Spacious & Single-Line */}
          <nav style={{ display: 'flex', gap: '4px', height: '62px' }}>
            <button
              onClick={() => setActiveTab('complaints')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'complaints' ? '800' : '500',
                borderBottom: activeTab === 'complaints' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'complaints' ? 'rgba(0,0,0,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <Layers size={15} />
              <span>Complaints</span>
            </button>

            <button
              onClick={() => setActiveTab('workers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'workers' ? '800' : '500',
                borderBottom: activeTab === 'workers' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'workers' ? 'rgba(0,0,0,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <Users size={15} />
              <span>Field Staff</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 14px',
                height: '100%',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: activeTab === 'analytics' ? '800' : '500',
                borderBottom: activeTab === 'analytics' ? '3px solid #FFFFFF' : '3px solid transparent',
                background: activeTab === 'analytics' ? 'rgba(0,0,0,0.1)' : 'transparent',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              <BarChart3 size={15} />
              <span>Analytics</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Ward Tag, Admin Profile Pill & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {/* Ward Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(0,0,0,0.12)',
            padding: '5px 10px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            <MapPin size={12} />
            <span>Ward 12</span>
          </div>

          {/* Admin Profile Pill - Interactive */}
          <button
            onClick={() => setActiveTab('profile')}
            title="View Municipal Admin Profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === 'profile' ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.12)',
              padding: '4px 12px 4px 4px',
              borderRadius: '20px',
              border: activeTab === 'profile' ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
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
              fontSize: '0.82rem',
              fontWeight: '800'
            }}>
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', lineHeight: 1.1, color: '#FFFFFF' }}>
                {adminUser?.name}
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.85, color: '#FFFFFF' }}>
                Admin Profile
              </div>
            </div>
          </button>

          {/* Sign Out */}
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

export default AdminTopNav;
