import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { X, Camera, MapPin, CheckCircle } from 'lucide-react';

const SAMPLE_IMAGES = [
  { label: 'Pothole', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80' },
  { label: 'Garbage', url: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=600&auto=format&fit=crop&q=80' },
  { label: 'Streetlight', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80' },
  { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&auto=format&fit=crop&q=80' }
];

const ReportIssueModal = ({ onClose, onComplaintCreated }) => {
  const { addComplaint, citizenUser } = useCivic();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Roads & Infrastructure',
    description: '',
    location: `${citizenUser.ward || 'Ward 12'}, Shivaji Nagar Road`,
    landmark: 'Near Central Bus Terminus',
    priority: 'High',
    imageUrl: SAMPLE_IMAGES[0].url
  });

  const [isLocating, setIsLocating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdComplaint, setCreatedComplaint] = useState(null);

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: `Ward 12, MG Road Junction (Lat: 18.5204, Lng: 73.8567)`,
        landmark: 'Auto-detected via GPS sensor'
      }));
      setIsLocating(false);
    }, 600);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const newIssue = addComplaint(formData);
    setCreatedComplaint(newIssue);
    setIsSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Header */}
        <div style={{
          background: '#E69500',
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>📝</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>
              Report Civic Issue
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#FFFFFF',
              background: 'rgba(0,0,0,0.15)',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', maxHeight: 'calc(80vh - 60px)', overflowY: 'auto' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '24px 10px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#DCFCE7',
                color: '#15803D',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <CheckCircle size={36} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Complaint Registered!
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '16px' }}>
                Your ticket <strong>#{createdComplaint?.id}</strong> has been logged and transmitted to Ward 12 Municipal Desk.
              </p>

              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'left',
                fontSize: '0.8rem',
                color: '#334155',
                marginBottom: '20px'
              }}>
                <div><strong>Category:</strong> {createdComplaint?.category}</div>
                <div><strong>Location:</strong> {createdComplaint?.location}</div>
                <div><strong>Status:</strong> <span style={{ color: '#DC2626', fontWeight: '700' }}>Pending Verification</span></div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  if (onComplaintCreated && createdComplaint) {
                    onComplaintCreated(createdComplaint);
                  }
                }}
                className="civic-btn-primary"
                style={{ width: '100%' }}
              >
                Track This Complaint
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Category selector */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Issue Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    background: '#FFFFFF'
                  }}
                >
                  <option value="Roads & Infrastructure">Roads & Potholes</option>
                  <option value="Sanitation & Waste">Garbage & Sanitation</option>
                  <option value="Water Supply">Drinking Water Supply</option>
                  <option value="Electrical & Lighting">Street Lighting & Electricity</option>
                  <option value="Drainage">Drainage & Sewage</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Issue Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hazardous pothole near market gate"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Detailed Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the severity, damage caused, and how long the problem has existed..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    resize: 'none'
                  }}
                />
              </div>

              {/* Location Picker */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155' }}>
                    Location & Landmark *
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isLocating}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: '#D97706',
                      background: '#FEF3C7',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}
                  >
                    <MapPin size={11} />
                    {isLocating ? 'Detecting...' : 'Auto-Detect GPS'}
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Street name, landmark, Ward"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Attach Photo Evidence
                </label>
                
                {/* Image preview */}
                {formData.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: '110px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '8px',
                    position: 'relative'
                  }}>
                    <img
                      src={formData.imageUrl}
                      alt="Evidence"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '6px',
                      background: 'rgba(0,0,0,0.6)',
                      color: '#FFF',
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      Photo attached
                    </div>
                  </div>
                )}

                {/* Sample quick picks */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', alignSelf: 'center' }}>Presets:</span>
                  {SAMPLE_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, imageUrl: img.url })}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        borderRadius: '6px',
                        background: formData.imageUrl === img.url ? '#F59E0B' : '#F1F5F9',
                        color: formData.imageUrl === img.url ? '#000' : '#475569',
                        fontWeight: formData.imageUrl === img.url ? '700' : '500'
                      }}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

                {/* File input */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  background: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  color: '#475569',
                  fontWeight: '600'
                }}>
                  <Camera size={16} color="#F59E0B" />
                  <span>Take photo or upload from device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* Priority */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Urgency Level
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p })}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        border: '1px solid',
                        borderColor: formData.priority === p ? '#F59E0B' : '#E2E8F0',
                        background: formData.priority === p ? '#FEF3C7' : '#FFFFFF',
                        color: formData.priority === p ? '#B45309' : '#64748B'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
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
                  marginTop: '8px',
                  border: '1px solid #D97706'
                }}
              >
                <span>Submit Complaint to Municipality</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportIssueModal;
