import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { ShieldCheck, LogIn, CheckCircle2 } from 'lucide-react';

const AdminAuth = ({ onLoginSuccess }) => {
  const { setAdminUser } = useCivic();
  const [email, setEmail] = useState('admin.ward12@civicsync.gov');
  const [password, setPassword] = useState('admin123');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdminUser({
      name: "Admin S. Mehta",
      email: email,
      role: "Zonal Ward Officer",
      ward: "Ward 12 - Central Zone",
      isLoggedIn: true
    });
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleDemoLogin = () => {
    setAdminUser({
      name: "Admin S. Mehta",
      email: "admin.ward12@civicsync.gov",
      role: "Zonal Ward Officer",
      ward: "Ward 12 - Central Zone",
      isLoggedIn: true
    });
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 46px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F1F5F9',
      padding: '24px'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '420px',
        borderRadius: '16px',
        padding: '36px 32px',
        border: '1px solid #E2E8F0'
      }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: '#FEF3C7',
            border: '2px solid #F59E0B',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={36} color="#B45309" />
          </div>
          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: '900',
            color: '#E69500',
            letterSpacing: '0.8px',
            marginBottom: '4px'
          }}>
            CIVICSYNC
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '600' }}>
            Municipal Administration Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Administrator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@civicsync.gov"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.92rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
              Security Password
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
                fontSize: '0.92rem'
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
            <span>Sign In to Municipal Portal</span>
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleDemoLogin}
            style={{
              background: '#F8FAFC',
              border: '1px dashed #CBD5E1',
              color: '#0F172A',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={14} color="#16A34A" />
            Quick Demo Login (Admin Officer)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
