import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Smartphone, Monitor, User, HardHat, ShieldCheck, RefreshCw } from 'lucide-react';

const RoleSwitcher = () => {
  const {
    currentRole,
    setCurrentRole,
    deviceFrameMode,
    setDeviceFrameMode,
    resetData
  } = useCivic();

  return (
    <header className="role-switcher-banner">
      <div className="role-switcher-brand">
        <span style={{ color: '#F59E0B', fontSize: '1.1rem' }}>⚡</span>
        <span>CIVICSYNC</span>
        <span className="role-badge">
          {currentRole === 'citizen' && 'Citizen Portal'}
          {currentRole === 'worker' && 'Field Worker Portal'}
          {currentRole === 'admin' && 'Admin Portal'}
        </span>
      </div>

      <div className="role-buttons-group">
        <button
          className={`role-btn ${currentRole === 'citizen' ? 'active' : ''}`}
          onClick={() => setCurrentRole('citizen')}
          title="Switch to Citizen / User App"
        >
          <User size={15} />
          <span>User App</span>
        </button>

        <button
          className={`role-btn ${currentRole === 'worker' ? 'active' : ''}`}
          onClick={() => setCurrentRole('worker')}
          title="Switch to Municipal Worker App"
        >
          <HardHat size={15} />
          <span>Worker App</span>
        </button>

        <button
          className={`role-btn ${currentRole === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentRole('admin')}
          title="Switch to Municipal Admin Portal"
        >
          <ShieldCheck size={15} />
          <span>Admin Website</span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Toggle mobile shell vs full screen for mobile views */}
        {currentRole !== 'admin' && (
          <div className="view-mode-toggle">
            <span style={{ fontSize: '0.78rem', color: '#9CA3AF' }}>View:</span>
            <button
              style={{
                background: deviceFrameMode === 'mobile' ? '#374151' : 'transparent',
                color: deviceFrameMode === 'mobile' ? '#F59E0B' : '#9CA3AF',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem'
              }}
              onClick={() => setDeviceFrameMode('mobile')}
              title="Device Frame Mockup"
            >
              <Smartphone size={14} />
              Mobile Frame
            </button>
            <button
              style={{
                background: deviceFrameMode === 'expanded' ? '#374151' : 'transparent',
                color: deviceFrameMode === 'expanded' ? '#F59E0B' : '#9CA3AF',
                padding: '4px 8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.75rem'
              }}
              onClick={() => setDeviceFrameMode('expanded')}
              title="Expanded Responsive View"
            >
              <Monitor size={14} />
              Full
            </button>
          </div>
        )}

        <button
          onClick={resetData}
          style={{
            color: '#9CA3AF',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 8px',
            borderRadius: '6px',
            background: '#1F2937'
          }}
          title="Reset to initial sample complaints"
        >
          <RefreshCw size={12} />
          Reset Data
        </button>
      </div>
    </header>
  );
};

export default RoleSwitcher;
