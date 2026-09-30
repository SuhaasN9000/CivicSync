import React from 'react';
import { useCivic } from '../../context/CivicContext';
import { ShieldCheck } from 'lucide-react';

const AdminAnalytics = () => {
  const { complaints } = useCivic();
  const categories = [
    { name: "Roads & Infrastructure", color: "#F59E0B" },
    { name: "Sanitation & Waste", color: "#10B981" },
    { name: "Water Supply", color: "#06B6D4" },
    { name: "Electrical & Lighting", color: "#F97316" },
    { name: "Drainage", color: "#8B5CF6" }
  ];

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A' }}>
          Ward Performance & Redressal Analytics
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
          SLA compliance, department efficiency metrics, and citizen satisfaction ratings
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Department Volume & Resolution Breakdown */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '20px'
        }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>
            Departmental Redressal Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categories.map(cat => {
              const catComplaints = complaints.filter(c => c.category === cat.name);
              const resolved = catComplaints.filter(c => c.status === 'Resolved').length;
              const percent = catComplaints.length > 0 ? Math.round((resolved / catComplaints.length) * 100) : 0;

              return (
                <div key={cat.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', color: '#334155' }}>{cat.name}</span>
                    <span style={{ color: '#64748B' }}>
                      <strong>{resolved}</strong> / {catComplaints.length} solved ({percent}%)
                    </span>
                  </div>

                  <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: cat.color,
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SLA & Citizen Satisfaction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', marginBottom: '8px' }}>
              <ShieldCheck size={22} />
              <h4 style={{ fontSize: '0.98rem', fontWeight: '800' }}>
                Municipal SLA Compliance Rate
              </h4>
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#92400E' }}>
              94.2%
            </div>
            <p style={{ fontSize: '0.8rem', color: '#78350F', marginTop: '4px' }}>
              Complaints verified within 2 hours, dispatched within 4 hours, and resolved within 48 hours.
            </p>
          </div>

          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <h4 style={{ fontSize: '0.98rem', fontWeight: '800', color: '#0F172A', marginBottom: '12px' }}>
              Citizen Feedback Score
            </h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#E69500' }}>4.82</span>
              <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: '700' }}>/ 5.0</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '6px' }}>
              Based on 140+ citizen verification ratings submitted upon complaint closure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
