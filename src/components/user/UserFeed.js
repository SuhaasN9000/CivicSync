import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { ThumbsUp, MapPin, Plus, Clock, CheckCircle, AlertCircle, ChevronRight, Search } from 'lucide-react';

const CATEGORIES = [
  "All",
  "Roads & Infrastructure",
  "Sanitation & Waste",
  "Water Supply",
  "Electrical & Lighting",
  "Drainage"
];

const UserFeed = ({ onOpenReportModal, onSelectComplaint }) => {
  const { complaints, upvoteComplaint, citizenUser } = useCivic();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComplaints = complaints.filter(c => {
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 60px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Welcome Bar - Clean & Flat */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#D97706', textTransform: 'uppercase' }}>
            Ward 12 Citizen Portal
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111827', marginTop: '2px' }}>
            Welcome, {citizenUser?.name || 'Citizen'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#4B5563', maxWidth: '620px', marginTop: '4px' }}>
            Report road potholes, broken streetlights, water leaks, or garbage dumps directly to the municipal team.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          style={{
            background: '#E69500',
            color: '#FFFFFF',
            fontWeight: '700',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid #D97706',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          <span>Report Issue</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>
            Total Complaints
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#111827', marginTop: '2px' }}>
            {complaints.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>Ward 12 total</div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#B45309', textTransform: 'uppercase' }}>
            In Progress
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>
            {inProgressCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#B45309' }}>Under repair</div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#991B1B', textTransform: 'uppercase' }}>
            Pending
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#DC2626', marginTop: '2px' }}>
            {pendingCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#991B1B' }}>Awaiting crew</div>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '14px 16px'
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#166534', textTransform: 'uppercase' }}>
            Resolved
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>
            {resolvedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#166534' }}>Verified fixed</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                whiteSpace: 'nowrap',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: selectedCategory === cat ? '700' : '500',
                background: selectedCategory === cat ? '#E69500' : '#F3F4F6',
                color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#F9FAFB',
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          padding: '6px 12px',
          width: '260px'
        }}>
          <Search size={14} color="#9CA3AF" />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.82rem',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* Issues Feed Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827' }}>
          Issues List ({filteredComplaints.length})
        </h3>
        <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
          Click any card to track status
        </span>
      </div>

      {/* Grid of Complaints */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '16px'
      }}>
        {filteredComplaints.map(complaint => (
          <div
            key={complaint.id}
            onClick={() => onSelectComplaint(complaint)}
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              overflow: 'hidden',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image Preview */}
            {complaint.imageUrl && (
              <div style={{
                width: '100%',
                height: '160px',
                background: '#F3F4F6',
                position: 'relative',
                borderBottom: '1px solid #E5E7EB'
              }}>
                <img
                  src={complaint.imageUrl}
                  alt={complaint.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px'
                }}>
                  <span className={`civic-badge ${
                    complaint.status === 'Resolved' ? 'badge-resolved' :
                    complaint.status === 'In Progress' ? 'badge-inprogress' : 'badge-pending'
                  }`}>
                    {complaint.status === 'Resolved' && <CheckCircle size={10} />}
                    {complaint.status === 'In Progress' && <Clock size={10} />}
                    {complaint.status === 'Pending' && <AlertCircle size={10} />}
                    {complaint.status}
                  </span>
                </div>
              </div>
            )}

            {/* Card Content */}
            <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#E69500' }}>
                  {complaint.id}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: '4px', fontWeight: '600' }}>
                  {complaint.category}
                </span>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#111827', marginBottom: '2px', lineHeight: 1.3 }}>
                  {complaint.title}
                </h4>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#4B5563',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.4
                }}>
                  {complaint.description}
                </p>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#6B7280', marginTop: 'auto' }}>
                <MapPin size={12} color="#E69500" />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {complaint.location}
                </span>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '8px',
                borderTop: '1px solid #F3F4F6',
                marginTop: '4px'
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    upvoteComplaint(complaint.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#F9FAFB',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#4B5563',
                    border: '1px solid #E5E7EB'
                  }}
                >
                  <ThumbsUp size={12} color="#E69500" />
                  <span>{complaint.upvotes} Citizens</span>
                </button>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  color: '#E69500',
                  fontSize: '0.8rem',
                  fontWeight: '700'
                }}>
                  <span>Track</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFeed;
