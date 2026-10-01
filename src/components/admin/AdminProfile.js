import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Users,
  Award,
  Bell,
  LogOut,
  Layers
} from 'lucide-react';

const AdminProfile = () => {
  const { adminUser, complaints, workers, logout } = useCivic();

  const [urgentSmsAlerts, setUrgentSmsAlerts] = useState(true);
  const [dailyBriefing, setDailyBriefing] = useState(true);

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedCount / totalComplaints) * 100) : 0;

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 20px 60px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Admin Profile Header Banner */}
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
            {adminUser?.name?.charAt(0) || 'A'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#111827' }}>
                {adminUser?.name}
              </h2>
              <span style={{
                background: '#FEF3C7',
                color: '#B45309',
                border: '1px solid #FDE68A',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={13} />
                ZONAL MUNICIPAL AUTHORITY
              </span>
              <span style={{
                background: '#DCFCE7',
                color: '#15803D',
                border: '1px solid #BBF7D0',
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '12px'
              }}>
                Level-3 Clearance
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.82rem', color: '#4B5563', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Building size={14} color="#E69500" />
                {adminUser?.role || 'Zonal Ward Officer'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#E69500" />
                {adminUser?.ward || 'Ward 12 - Central Zone'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={14} />
                +91 98111 22334
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} />
                {adminUser?.email || 's.mehta@civicsync.gov.in'}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={logout}
            style={{
              background: '#F9FAFB',
              color: '#4B5563',
              fontWeight: '600',
              padding: '9px 16px',
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

      {/* Main Grid: 2 Columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        gap: '20px',
        alignItems: 'start'
      }}>
        {/* Left Column: Official Administrative Details & Clearances */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Section 1: Government Appointment & Office */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Building size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Official Appointment & Jurisdiction
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Administrative Officer</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>{adminUser?.name}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Civil Service ID</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>ADM-MNC-GOV-0041</div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Government Designation</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#D97706' }}>
                  Deputy Municipal Commissioner (Grievances)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Executive Division</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                  Municipal Redressal & Public Works Cell
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Jurisdiction Boundary</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827' }}>
                  Ward 12 (Central Zone) & Ward 14
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: '#6B7280', fontWeight: '700' }}>Tenure Commencement</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} color="#9CA3AF" />
                  August 2022 (Current Zonal Head)
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Administrative Security Clearances & Powers */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldCheck size={18} color="#16A34A" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                System Access Privileges & Oversight Powers
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Field Force Dispatch & Reassignment</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>✓ Full Authority</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Municipal SLA & Status Override</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>✓ Full Authority</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Worker Photographic Audit Verification</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>✓ Full Authority</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
                <span style={{ color: '#374151', fontWeight: '600' }}>Emergency Ward Broadcast Notification</span>
                <span style={{ color: '#16A34A', fontWeight: '700' }}>✓ Full Authority</span>
              </div>
            </div>
          </div>

          {/* Section 3: Notification & Escalation Protocols */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Bell size={18} color="#E69500" />
              <h3 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#111827' }}>
                Administrative Notification Protocols
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
                    Critical Urgency Grievance Alerts
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Instant SMS when 'Urgent' safety or water hazard tickets are filed
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setUrgentSmsAlerts(!urgentSmsAlerts)}
                  style={{
                    background: urgentSmsAlerts ? '#DCFCE7' : '#F3F4F6',
                    color: urgentSmsAlerts ? '#15803D' : '#6B7280',
                    border: '1px solid',
                    borderColor: urgentSmsAlerts ? '#BBF7D0' : '#D1D5DB',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {urgentSmsAlerts ? '● Active' : 'Disabled'}
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#111827' }}>
                    Daily 09:00 AM Zonal Briefing Email
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Automated report on overnight reports, SLA risk tickets, and staff duty logs
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDailyBriefing(!dailyBriefing)}
                  style={{
                    background: dailyBriefing ? '#DCFCE7' : '#F3F4F6',
                    color: dailyBriefing ? '#15803D' : '#6B7280',
                    border: '1px solid',
                    borderColor: dailyBriefing ? '#BBF7D0' : '#D1D5DB',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {dailyBriefing ? '● Active' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Ward Operational Stats & Council Headquarters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Ward Command Metrics */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#111827', marginBottom: '14px' }}>
              Zonal Ward Oversight
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '16px' }}>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827' }}>{totalComplaints}</div>
                <div style={{ fontSize: '0.7rem', color: '#6B7280', fontWeight: '600' }}>Total In Ward</div>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#D97706' }}>{inProgressCount}</div>
                <div style={{ fontSize: '0.7rem', color: '#92400E', fontWeight: '600' }}>Active Jobs</div>
              </div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 6px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#16A34A' }}>{resolvedCount}</div>
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: '600' }}>Resolved</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} color="#E69500" />
                  Active Field Crew Staff
                </span>
                <span style={{ fontWeight: '800', color: '#111827' }}>
                  {workers.length} Officers Under Command
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                <span style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={14} color="#16A34A" />
                  Ward SLA Compliance
                </span>
                <span style={{ fontWeight: '800', color: '#16A34A' }}>
                  94.2% On-Time
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                <span style={{ color: '#4B5563', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} color="#3B82F6" />
                  Overall Resolution Rate
                </span>
                <span style={{ fontWeight: '800', color: '#111827' }}>
                  {resolutionRate}% Closed
                </span>
              </div>
            </div>
          </div>

          {/* Municipal Headquarters Location */}
          <div style={{
            background: '#FFFBEB',
            borderRadius: '12px',
            border: '1px solid #FDE68A',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Building size={16} color="#B45309" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#92400E', textTransform: 'uppercase' }}>
                Municipal Headquarters
              </h4>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#4B5563', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.4 }}>
              <div>
                <strong style={{ color: '#111827' }}>Office Suite:</strong>
                <div>Zonal Administrative Wing, Room 204, Sector 4</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Direct Official Line:</strong>
                <div>022-2654-8800 (Ext. 204)</div>
              </div>

              <div>
                <strong style={{ color: '#111827' }}>Public Grievance Hearing Hours:</strong>
                <div>Tues & Thurs: 02:00 PM – 05:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
