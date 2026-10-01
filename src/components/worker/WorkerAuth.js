import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { HardHat, LogIn, CheckCircle2 } from 'lucide-react';

const WorkerAuth = ({ onLoginSuccess }) => {
  const { setWorkerUser, workers } = useCivic();
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id || 'W-101');
  const [password, setPassword] = useState('worker123');

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = workers.find(w => w.id === selectedWorkerId);
    if (found) {
      setWorkerUser({
        ...found,
        isLoggedIn: true
      });
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const handleQuickLogin = (worker) => {
    setWorkerUser({
      ...worker,
      isLoggedIn: true
    });
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100%',
      padding: '32px 24px',
      background: '#FFFFFF'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '64px',
          height: '64px',
          background: '#FEF3C7',
          borderRadius: '20px',
          marginBottom: '16px',
          border: '1px solid #FDE68A'
        }}>
          <HardHat size={34} color="#B45309" />
        </div>
        <h1 style={{
          color: '#E69500',
          fontSize: '1.8rem',
          fontWeight: '900',
          letterSpacing: '1px',
          marginBottom: '4px'
        }}>
          CIVICSYNC
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.88rem', fontWeight: '600' }}>
          Municipal Field Maintenance Portal
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '340px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Select Worker Profile
            </label>
            <select
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.9rem'
              }}
            >
              {workers.map(w => (
                <option key={w.id} value={w.id}>
                  {w.name} — {w.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Worker Security PIN
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#F59E0B',
              color: '#000000',
              fontWeight: '800',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
              border: '1px solid #D97706'
            }}
          >
            <LogIn size={18} />
            <span>Login to Field App</span>
          </button>
        </form>

        <div style={{ marginTop: '24px', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748B', marginBottom: '10px', textAlign: 'center' }}>
            Or quick demo switch:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {workers.slice(0, 2).map(w => (
              <button
                key={w.id}
                type="button"
                onClick={() => handleQuickLogin(w)}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#334155'
                }}
              >
                <span>{w.name} ({w.department})</span>
                <CheckCircle2 size={14} color="#F59E0B" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerAuth;
