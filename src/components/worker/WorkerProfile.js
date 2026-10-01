import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import {
  HardHat,
  Phone,
  MapPin,
  ShieldCheck,
  Calendar,
  Clock,
  Truck,
  Star,
  LogOut,
  Building
} from 'lucide-react';

const WorkerProfile = () => {
  const { workerUser, complaints, logout } = useCivic();
  const [isOnDuty, setIsOnDuty] = useState(true);

  // Complaints assigned to this worker
  const myTasks = complaints.filter(c =>
    c.assignedWorker &&
    (c.assignedWorker.id === workerUser.id || c.assignedWorker.name === workerUser.name)
  );
  const resolvedTasks = myTasks.filter(t => t.status === 'Resolved');
  const activeTasks = myTasks.filter(t => t.status !== 'Resolved');

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 20px 60px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Officer Header Card */}
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
            {workerUser?.name?.charAt(0) || 'W'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#111827' }}>
                {workerUser?.name}
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
                Field Maintenance Officer
              </span>
              <span style={{
                background: isOnDuty ? '#DCFCE7' : '#FEE2E2',
                color: isOnDuty ? '#15803D' : '#991B1B',
                border: '1px solid',
                borderColor: isOnDuty ? '#BBF7D0' : '#FECACA',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                {isOnDuty ? '● ON SHIFT' : '○ OFF DUTY'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: '#4B5563', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <HardHat size={14} color="#E69500" />
                {workerUser?.department} • ID: {workerUser?.id || 'W-101'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#E69500" />
                {workerUser?.ward} (Central Civic Area)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={14} />
                {workerUser?.phone}
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsOnDuty(!isOnDuty)}
            style={{
              background: isOnDuty ? '#FEF3C7' : '#DCFCE7',
              color: isOnDuty ? '#92400E' : '#15803D',
              fontWeight: '700',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              border: '1px solid',
              borderColor: isOnDuty ? '#FDE68A' : '#BBF7D0',
              cursor: 'pointer'
            }}
          >
            {isOnDuty ? 'Switch to Off Duty' : 'Check In (On Duty)'}
          </button>

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

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left Column: Official Employment & Assignment Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Official Service Details */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <HardHat size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Municipal Service & Deployment Credentials
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Officer Name</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{workerUser?.name}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Municipal Employee Code</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>EMP-MNC-10492 ({workerUser?.id || 'W-101'})</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Designation / Rank</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>Senior Field Officer (Grade II)</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Department & Division</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#D97706' }}>{workerUser?.department}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Primary Operational Ward</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{workerUser?.ward} (West & Central)</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Date of Enlistment</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} color="#9CA3AF" />
                  12 March 2021 (4+ Yrs)
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Shift, Vehicle & Equipment Roster */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Truck size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Shift, Fleet & Equipment Allocation
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Assigned Shift Hours</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} color="#9CA3AF" />
                  07:00 AM – 04:00 PM (Shift A)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Municipal Vehicle Assigned</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>Truck MH-02-CE-4412 (Mini Tipper)</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Reporting Base Depot</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>Ward 12 Works Yard, Sector 4</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Field Tooling & Safety Gear</div>
                <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#15803D' }}>Issued: Level-2 PPE & Tool Kit</div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Emergency Info */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#111827', textTransform: 'uppercase', marginBottom: '12px' }}>
              Official Communication & Emergency Record
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
              <div>
                <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Official Mobile (GPS Tracked)</div>
                <div style={{ fontWeight: '700', color: '#111827' }}>{workerUser?.phone}</div>
              </div>

              <div>
                <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Official Municipal Email</div>
                <div style={{ fontWeight: '700', color: '#111827' }}>
                  {workerUser?.name?.toLowerCase().replace(/\s+/g, '.')}@civicsync.gov.in
                </div>
              </div>

              <div>
                <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Emergency Contact</div>
                <div style={{ fontWeight: '700', color: '#111827' }}>+91 98111 00099 (Spouse)</div>
              </div>

              <div>
                <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>Medical & Blood Group</div>
                <div style={{ fontWeight: '700', color: '#DC2626' }}>Blood Group: O+ Positive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Performance Track Record & Supervision */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Performance Summary */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827', marginBottom: '14px' }}>
              Field Performance & Redressal Rating
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>{myTasks.length}</div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: '600' }}>Assigned</div>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#D97706' }}>{activeTasks.length}</div>
                <div style={{ fontSize: '0.7rem', color: '#92400E', fontWeight: '600' }}>Active</div>
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#16A34A' }}>{resolvedTasks.length}</div>
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: '600' }}>Resolved</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#4B5563' }}>Citizen Satisfaction Score</span>
                <span style={{ fontWeight: '800', color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={13} fill="#F59E0B" color="#F59E0B" />
                  4.9 / 5.0 (Top 5% in Ward)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                <span style={{ color: '#4B5563' }}>Average Resolution Turnaround</span>
                <span style={{ fontWeight: '800', color: '#15803D' }}>
                  3.4 Hours (SLA: 24h)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                <span style={{ color: '#4B5563' }}>Photo Proof Verification Rate</span>
                <span style={{ fontWeight: '800', color: '#111827' }}>
                  100% Verified
                </span>
              </div>
            </div>
          </div>

          {/* Reporting Chain & Zonal Office */}
          <div style={{
            background: '#FFFBEB',
            borderRadius: '12px',
            border: '1px solid #FDE68A',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Building size={16} color="#B45309" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
                Zonal Reporting Authority
              </h4>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.4 }}>
              <div>
                <strong style={{ color: '#111827' }}>Supervising Authority:</strong>
                <div>Admin S. Mehta (Grievance Cell In-Charge)</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Dispatch Operations Desk:</strong>
                <div>Zonal Control Room, Ext. 104</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Emergency Field SOS Radio:</strong>
                <div style={{ fontWeight: '800', color: '#B45309' }}>Channel 4 (Ward 12 Maintenance)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
