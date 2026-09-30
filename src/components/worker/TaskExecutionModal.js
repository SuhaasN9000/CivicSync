import React, { useState } from 'react';
import { useCivic } from '../../context/CivicContext';
import { X, Camera, CheckCircle2, ArrowLeft } from 'lucide-react';

const RESOLUTION_PRESET_IMAGES = [
  { label: 'Paved Road', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?w=600&auto=format&fit=crop&q=80' },
  { label: 'Cleared Bin', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80' },
  { label: 'Fixed Light', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80' },
  { label: 'Welded Pipe', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80' }
];

const TaskExecutionModal = ({ task, onClose }) => {
  const { updateComplaintStatus } = useCivic();

  const [remarks, setRemarks] = useState(
    task.category.includes('Road') ? 'Pothole filled with 45kg hot bitumen premix and compacted with roller.' :
    task.category.includes('Sanitation') ? 'Garbage bin cleared and surrounding pavement disinfected with lime powder.' :
    task.category.includes('Light') ? 'Installed 45W energy-saving LED luminaire fixture. Inspected wiring.' :
    'Maintenance completed. Defective fitting replaced and water pressure verified.'
  );

  const [proofImage, setProofImage] = useState(
    task.category.includes('Road') ? RESOLUTION_PRESET_IMAGES[0].url :
    task.category.includes('Sanitation') ? RESOLUTION_PRESET_IMAGES[1].url :
    task.category.includes('Light') ? RESOLUTION_PRESET_IMAGES[2].url :
    RESOLUTION_PRESET_IMAGES[3].url
  );

  const [isDone, setIsDone] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteTask = (e) => {
    e.preventDefault();
    updateComplaintStatus(task.id, 'Resolved', remarks, proofImage);
    setIsDone(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          background: '#E69500',
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <ArrowLeft size={16} />
            </button>
            <div>
              <div style={{ fontSize: '0.72rem', opacity: 0.9 }}>Work Order Execution</div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800' }}>
                {task.id} - Resolution
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ color: '#FFFFFF', background: 'rgba(0,0,0,0.15)', borderRadius: '50%', padding: '4px' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '20px', maxHeight: 'calc(80vh - 60px)', overflowY: 'auto' }}>
          {isDone ? (
            <div style={{ textAlign: 'center', padding: '28px 10px' }}>
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
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                Task Resolved & Synced!
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                Completion proof and notes submitted. Status updated to <strong>Resolved</strong> for Citizen and Admin.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCompleteTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Task Summary */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                padding: '12px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#E69500', fontWeight: '700' }}>
                  {task.category}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0F172A', margin: '2px 0 4px 0' }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                  Location: {task.location}
                </div>
              </div>

              {/* Upload Proof Photo */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  After-Work Completion Proof (Photo) *
                </label>

                {proofImage && (
                  <div style={{
                    width: '100%',
                    height: '130px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '8px',
                    position: 'relative'
                  }}>
                    <img
                      src={proofImage}
                      alt="Proof"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '6px',
                      right: '6px',
                      background: 'rgba(22, 101, 52, 0.9)',
                      color: '#FFF',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      ✓ After-Repair Proof
                    </div>
                  </div>
                )}

                {/* Preset resolution images */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', alignSelf: 'center' }}>Presets:</span>
                  {RESOLUTION_PRESET_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setProofImage(img.url)}
                      style={{
                        padding: '3px 8px',
                        fontSize: '0.72rem',
                        borderRadius: '6px',
                        background: proofImage === img.url ? '#F59E0B' : '#F1F5F9',
                        color: proofImage === img.url ? '#000' : '#475569',
                        fontWeight: proofImage === img.url ? '700' : '500'
                      }}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

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
                  <Camera size={16} color="#E69500" />
                  <span>Capture completion photo via camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* Resolution Remarks */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' }}>
                  Maintenance Remarks & Materials Used *
                </label>
                <textarea
                  required
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Details of repair, equipment used, safety checks done..."
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

              {/* Submit CTA */}
              <button
                type="submit"
                style={{
                  background: '#16A34A',
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
                  border: '1px solid #15803D'
                }}
              >
                <CheckCircle2 size={18} />
                <span>Mark as Resolved & Close Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskExecutionModal;
