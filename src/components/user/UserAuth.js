import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { LogIn, UserPlus, CheckCircle2 } from 'lucide-react';

const UserAuth = ({ onLoginSuccess }) => {
  const { setCitizenUser } = useCivic();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98201 45678',
    password: 'password123',
    ward: 'Ward 12'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setCitizenUser({
      name: formData.name || 'Citizen User',
      email: formData.email,
      phone: formData.phone,
      ward: formData.ward || 'Ward 12',
      isLoggedIn: true
    });
    if (onLoginSuccess) onLoginSuccess();
  };

  const handleDemoLogin = () => {
    setCitizenUser({
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98201 45678',
      ward: 'Ward 12',
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
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
          <span style={{ fontSize: '32px' }}>🏛️</span>
        </div>
        <h1 style={{
          color: '#E69500',
          fontSize: '2rem',
          fontWeight: '900',
          letterSpacing: '1px',
          marginBottom: '4px'
        }}>
          CIVICSYNC
        </h1>
        <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: '500' }}>
          Citizen Civic Issue Redressal App
        </p>
      </div>

      <div style={{
        width: '100%',
        maxWidth: '340px',
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '8px 0'
      }}>
        <div style={{
          display: 'flex',
          background: '#F1F5F9',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: !isSignUp ? '700' : '500',
              background: !isSignUp ? '#FFFFFF' : 'transparent',
              color: !isSignUp ? '#0F172A' : '#64748B',
              boxShadow: !isSignUp ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: isSignUp ? '700' : '500',
              background: isSignUp ? '#FFFFFF' : 'transparent',
              color: isSignUp ? '#0F172A' : '#64748B',
              boxShadow: isSignUp ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Email / Mobile Number
            </label>
            <input
              type="text"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. citizen@example.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
          </div>

          {isSignUp && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Municipal Ward / Area
              </label>
              <select
                value={formData.ward}
                onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <option value="Ward 12">Ward 12 (Central Zone)</option>
                <option value="Ward 14">Ward 14 (East Suburbs)</option>
                <option value="Ward 08">Ward 08 (North Zone)</option>
                <option value="Ward 03">Ward 03 (South Zone)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            style={{
              background: '#F59E0B',
              color: '#000000',
              fontWeight: '700',
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
            {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
            {isSignUp ? 'Create Citizen Account' : 'Log In to CivicSync'}
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
            Quick Demo Login (Citizen)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
