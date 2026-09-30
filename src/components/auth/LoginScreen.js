import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { User, HardHat, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const LoginScreen = () => {
  const { loginWithOtp, workers } = useCivic();

  const [role, setRole] = useState('citizen'); // 'citizen' | 'worker' | 'admin'
  const [phone, setPhone] = useState('9820145678');
  const [userName, setUserName] = useState('');
  const [workerId, setWorkerId] = useState(workers[0]?.id || 'W-101');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState(['1', '2', '3', '4']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 4) return;
    setOtpStep(true);
  };

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      loginWithOtp({
        role,
        phone: `+91 ${phone}`,
        name: userName || (role === 'citizen' ? 'Aarav Sharma' : role === 'worker' ? 'Ramesh Patil' : 'Admin S. Mehta'),
        ward: 'Ward 12',
        workerId
      });
    }, 250);
  };

  const handleQuickRoleLogin = (targetRole, defaultPhone, defaultName) => {
    setRole(targetRole);
    setPhone(defaultPhone);
    setUserName(defaultName);
    loginWithOtp({
      role: targetRole,
      phone: `+91 ${defaultPhone}`,
      name: defaultName,
      ward: 'Ward 12',
      workerId: workers[0]?.id
    });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F9FAFB',
      padding: '24px 16px'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '460px',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        overflow: 'hidden'
      }}>
        {/* Brand Banner - Clean & Flat */}
        <div style={{
          background: '#E69500',
          color: '#FFFFFF',
          padding: '24px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '900',
            letterSpacing: '0.5px',
            marginBottom: '4px',
            color: '#FFFFFF'
          }}>
            CIVICSYNC
          </h1>
          <p style={{ fontSize: '0.85rem', opacity: 0.95, fontWeight: '500' }}>
            Municipal Grievance & Issue Redressal System
          </p>
        </div>

        {/* Card Body */}
        <div style={{ padding: '24px' }}>
          {/* Role Selection Tabs */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              color: '#374151',
              display: 'block',
              marginBottom: '8px'
            }}>
              Select Role
            </label>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              background: '#F3F4F6',
              padding: '4px',
              borderRadius: '8px'
            }}>
              <button
                type="button"
                onClick={() => { setRole('citizen'); setOtpStep(false); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: role === 'citizen' ? '700' : '500',
                  background: role === 'citizen' ? '#FFFFFF' : 'transparent',
                  color: role === 'citizen' ? '#D97706' : '#4B5563',
                  border: role === 'citizen' ? '1px solid #D1D5DB' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <User size={14} />
                <span>Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('worker'); setOtpStep(false); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: role === 'worker' ? '700' : '500',
                  background: role === 'worker' ? '#FFFFFF' : 'transparent',
                  color: role === 'worker' ? '#D97706' : '#4B5563',
                  border: role === 'worker' ? '1px solid #D1D5DB' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <HardHat size={14} />
                <span>Worker</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('admin'); setOtpStep(false); }}
                style={{
                  padding: '8px 4px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: role === 'admin' ? '700' : '500',
                  background: role === 'admin' ? '#FFFFFF' : 'transparent',
                  color: role === 'admin' ? '#D97706' : '#4B5563',
                  border: role === 'admin' ? '1px solid #D1D5DB' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ShieldCheck size={14} />
                <span>Admin</span>
              </button>
            </div>

            <div style={{
              marginTop: '6px',
              fontSize: '0.75rem',
              color: '#6B7280',
              textAlign: 'center'
            }}>
              {role === 'citizen' && 'Report and track civic issues in Ward 12'}
              {role === 'worker' && 'Field maintenance task queue and proof submission'}
              {role === 'admin' && 'City-wide triage, crew dispatching, and monitoring'}
            </div>
          </div>

          {!otpStep ? (
            /* STEP 1: Phone Input */
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Mobile Number (Any number for demo) *
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#FFFFFF'
                }}>
                  <span style={{
                    padding: '10px 12px',
                    background: '#F9FAFB',
                    borderRight: '1px solid #D1D5DB',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: '#4B5563'
                  }}>
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Enter any mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      flex: 1,
                      border: 'none',
                      padding: '10px 12px',
                      fontSize: '0.9rem',
                      outline: 'none',
                      color: '#111827'
                    }}
                  />
                </div>
              </div>

              {/* Optional Name */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                  Name (Optional for demo)
                </label>
                <input
                  type="text"
                  placeholder={role === 'citizen' ? 'Aarav Sharma' : role === 'worker' ? 'Ramesh Patil' : 'Admin S. Mehta'}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              {role === 'worker' && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>
                    Select Field Officer Profile
                  </label>
                  <select
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      background: '#FFFFFF',
                      fontSize: '0.85rem'
                    }}
                  >
                    {workers.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.department}) - {w.ward}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Demo Helper Pill */}
              <div style={{
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.78rem',
                color: '#4B5563'
              }}>
                <strong>Demo Mode:</strong> Any mobile number & OTP will log in.
              </div>

              {/* Submit CTA - Flat & Simple */}
              <button
                type="submit"
                style={{
                  background: '#E69500',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '4px',
                  border: '1px solid #D97706'
                }}
              >
                <span>Send OTP</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* STEP 2: OTP Verification */
            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '4px' }}>
                  OTP sent to <strong>+91 {phone}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: '600', textDecoration: 'underline' }}
                >
                  Change phone number
                </button>
              </div>

              {/* OTP Boxes */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#374151', display: 'block', textAlign: 'center', marginBottom: '8px' }}>
                  Enter 4-Digit OTP
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      style={{
                        width: '46px',
                        height: '48px',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        color: '#111827',
                        background: '#FFFFFF',
                        outline: 'none'
                      }}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#166534', textAlign: 'center', marginTop: '6px', fontWeight: '600' }}>
                  Any 4 digits accepted (e.g. 1234)
                </div>
              </div>

              {/* Verify CTA - Flat */}
              <button
                type="submit"
                disabled={isVerifying}
                style={{
                  background: '#E69500',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid #D97706'
                }}
              >
                {isVerifying ? (
                  <span>Logging in...</span>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Verify & Login as {role.toUpperCase()}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick One-Click Demo Logins */}
          <div style={{ marginTop: '20px', borderTop: '1px solid #E5E7EB', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', textAlign: 'center', marginBottom: '8px' }}>
              One-Click Instant Login
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickRoleLogin('citizen', '9820145678', 'Aarav Sharma')}
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#374151',
                  textAlign: 'center'
                }}
              >
                👤 Citizen
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('worker', '9822011223', 'Ramesh Patil')}
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#374151',
                  textAlign: 'center'
                }}
              >
                👷 Worker
              </button>

              <button
                type="button"
                onClick={() => handleQuickRoleLogin('admin', '9811122334', 'Admin S. Mehta')}
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  color: '#374151',
                  textAlign: 'center'
                }}
              >
                🏛️ Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
