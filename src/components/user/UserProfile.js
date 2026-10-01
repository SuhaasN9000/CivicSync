import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Calendar,
  Building,
  Bell,
  CheckCircle2,
  LogOut,
  Edit2,
  Save
} from 'lucide-react';

const UserProfile = () => {
  const { citizenUser, complaints, logout } = useCivic();

  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile form state initialized from citizenUser
  const [formData, setFormData] = useState({
    name: citizenUser?.name || 'Aarav Sharma',
    phone: citizenUser?.phone || '+91 9820145678',
    email: citizenUser?.email || 'aarav.sharma@civicsync.gov.in',
    gender: 'Male',
    dob: '1992-08-14',
    address: 'Flat 402, Sunshine Heights, Link Road',
    landmark: 'Opposite City Municipal Garden',
    ward: citizenUser?.ward || 'Ward 12',
    pincode: '400053',
    city: 'Mumbai, Maharashtra',
    citizenId: 'CIVIC-DL-98201',
    voterId: 'EPIC-MH/12/094821',
    aadhaarMasked: '•••• •••• 9820'
  });

  // Notification toggles
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  // Complaints statistics
  const myComplaints = complaints.filter(c =>
    c.citizenEmail === citizenUser.email || c.citizenName === citizenUser.name
  );
  const resolvedCount = myComplaints.filter(c => c.status === 'Resolved').length;
  const inProgressCount = myComplaints.filter(c => c.status === 'In Progress').length;

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 20px 60px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Profile Header Banner */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: '#FEF3C7',
            color: '#B45309',
            border: '2px solid #F59E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.85rem',
            fontWeight: '900'
          }}>
            {formData.name.charAt(0) || 'C'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#111827' }}>
                {formData.name}
              </h2>
              <span style={{
                background: '#DCFCE7',
                color: '#15803D',
                border: '1px solid #BBF7D0',
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={13} />
                Verified Resident
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: '#4B5563', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#E69500" />
                {formData.ward} • South Central Zone
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={14} />
                {formData.phone}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} />
                {formData.email}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: '#FFFFFF',
                color: '#111827',
                fontWeight: '700',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid #D1D5DB',
                cursor: 'pointer'
              }}
            >
              <Edit2 size={14} />
              <span>Edit Details</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              style={{
                background: '#16A34A',
                color: '#FFFFFF',
                fontWeight: '700',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                border: '1px solid #15803D',
                cursor: 'pointer'
              }}
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          )}

          <button
            onClick={logout}
            style={{
              background: '#F9FAFB',
              color: '#4B5563',
              fontWeight: '600',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #E5E7EB',
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div style={{
          background: '#DCFCE7',
          border: '1px solid #BBF7D0',
          color: '#15803D',
          borderRadius: '10px',
          padding: '10px 16px',
          fontSize: '0.82rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={16} />
          <span>Profile updated successfully! All municipal contact records are up to date.</span>
        </div>
      )}

      {/* Main Grid: User Details + Municipal Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left Side: Personal & Residential Info Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Personal & Contact Information */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <User size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Personal & Contact Details
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Full Legal Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.name}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Mobile Number (OTP Verified)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Gender
                </label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem',
                      background: '#FFFFFF'
                    }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.gender}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    14 August 1992
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Primary Language
                </label>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                  English / Hindi (Default)
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Residential Address & Ward Details */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Building size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Residential & Municipal Jurisdiction
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Registered Residential Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.address}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Landmark
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.landmark}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Municipal Ward
                </label>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#D97706' }}>
                  {formData.ward} (Central Civic Area)
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  Postal PIN Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.85rem'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                    {formData.pincode}
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                  City & State
                </label>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                  {formData.city}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Notification & Alert Preferences */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Bell size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Notification & Communication Channels
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
                    SMS Complaint Status Updates
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Receive real-time SMS when your complaint status changes to In Progress or Resolved
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  style={{
                    background: smsAlerts ? '#DCFCE7' : '#F3F4F6',
                    color: smsAlerts ? '#15803D' : '#6B7280',
                    border: '1px solid',
                    borderColor: smsAlerts ? '#BBF7D0' : '#D1D5DB',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {smsAlerts ? '● Active' : 'Disabled'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
                    Email Resolution Receipts
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Receive digital resolution confirmation with worker photo proofs attached
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  style={{
                    background: emailAlerts ? '#DCFCE7' : '#F3F4F6',
                    color: emailAlerts ? '#15803D' : '#6B7280',
                    border: '1px solid',
                    borderColor: emailAlerts ? '#BBF7D0' : '#D1D5DB',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {emailAlerts ? '● Active' : 'Disabled'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
                    Ward 12 Emergency Civic Broadcasts
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Water maintenance pipeline shutdowns, monsoon waterlogging alerts
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEmergencyAlerts(!emergencyAlerts)}
                  style={{
                    background: emergencyAlerts ? '#DCFCE7' : '#F3F4F6',
                    color: emergencyAlerts ? '#15803D' : '#6B7280',
                    border: '1px solid',
                    borderColor: emergencyAlerts ? '#BBF7D0' : '#D1D5DB',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {emergencyAlerts ? '● Active' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Verification Badges & Ward Representatives */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Civic Identity & Verification */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={18} color="#16A34A" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Identity & Civic Verification
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Citizen Civic ID</div>
                  <div style={{ fontWeight: '800', color: '#111827' }}>{formData.citizenId}</div>
                </div>
                <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '700' }}>
                  ✓ Active
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Aadhaar Residency Proof</div>
                  <div style={{ fontWeight: '700', color: '#111827' }}>{formData.aadhaarMasked}</div>
                </div>
                <span style={{ color: '#15803D', fontWeight: '700', fontSize: '0.75rem' }}>
                  Verified
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Electoral Voter ID</div>
                  <div style={{ fontWeight: '700', color: '#111827' }}>{formData.voterId}</div>
                </div>
                <span style={{ color: '#15803D', fontWeight: '700', fontSize: '0.75rem' }}>
                  Verified
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Citizen Trust Score</div>
                  <div style={{ fontWeight: '800', color: '#D97706' }}>98.4% Authentic Submissions</div>
                </div>
                <span style={{ background: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '700' }}>
                  High Trust
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid #F3F4F6', paddingTop: '10px', color: '#6B7280', fontSize: '0.75rem' }}>
                <Calendar size={13} />
                <span>Member of CivicSync since January 15, 2024</span>
              </div>
            </div>
          </div>

          {/* Grievance Track Record Mini-Card */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
              Citizen Civic Activity
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px 4px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#111827' }}>{myComplaints.length}</div>
                <div style={{ fontSize: '0.68rem', color: '#6B7280', fontWeight: '600' }}>Reported</div>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '10px 4px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#D97706' }}>{inProgressCount}</div>
                <div style={{ fontSize: '0.68rem', color: '#92400E', fontWeight: '600' }}>In Progress</div>
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '10px 4px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#16A34A' }}>{resolvedCount}</div>
                <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: '600' }}>Resolved</div>
              </div>
            </div>
          </div>

          {/* Designated Ward 12 Municipal Authorities */}
          <div style={{
            background: '#FFFBEB',
            borderRadius: '12px',
            border: '1px solid #FDE68A',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Building size={16} color="#B45309" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
                Ward 12 Municipal Authorities
              </h4>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.4 }}>
              <div>
                <strong style={{ color: '#111827' }}>Zonal Officer / Admin:</strong>
                <div>S. Mehta (Grievance Cell In-Charge)</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Ward Councillor:</strong>
                <div>Rajesh V. Kadam (Elected Ward 12 Representative)</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Zonal Municipal Office:</strong>
                <div>Municipal Complex, 2nd Floor, Sector 4</div>
              </div>

              <div style={{ borderTop: '1px solid #FDE68A', paddingTop: '8px', marginTop: '2px' }}>
                <strong style={{ color: '#92400E' }}>Civic Helpline (24x7):</strong>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#B45309' }}>1800-233-CIVIC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
