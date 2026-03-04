import React, { useState } from "react";
import { supabase, getToday } from "../config/supabase";
import MediaUpload from "./MediaUpload";

export default function Dashboard({ user, activities, setActivities }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const addActivity = async () => {
    if (!name || !duration) return alert("Please fill in all fields");

    const { data, error } = await supabase
      .from('activities')
      .insert([{
          name,
          duration: Number(duration),
          user_id: user.id,
          date: getToday()
      }])
      .select();

    if (error) {
      alert(error.message);
    } else {
      setActivities([...activities, ...data]);
      setName("");
      setDuration("");
    }
  };

  const deleteActivity = async (id) => {
    if (!window.confirm("Delete this activity?")) return;
    const { error } = await supabase.from('activities').delete().eq('id', id);
    if (error) alert(error.message);
    else setActivities(activities.filter((a) => a.id !== id));
  };

  return (
    <div style={containerStyle}>
      {/* --- INPUT SECTION --- */}
      <div style={cardStyle}>
        <h3 style={headerStyle}>Track New Activity</h3>
        <div style={inputGroupStyle}>
          <input
            style={inputStyle}
            placeholder="What are you doing?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={{ ...inputStyle, width: '100px' }}
            type="number"
            placeholder="Mins"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button style={buttonStyle} onClick={addActivity}>Add Activity</button>
        </div>
      </div>

      {/* --- LOG SECTION --- */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={headerStyle}>Today's Timeline</h3>
        {activities.length === 0 ? (
          <div style={emptyStateStyle}>No activities tracked yet. Let's get started!</div>
        ) : (
          <div style={timelineStyle}>
            {activities.map((a) => (
              <div key={a.id} style={activityItemStyle}>
                <div style={activityContentStyle}>
                  <div>
                    <strong style={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>{a.name}</strong>
                    <span style={durationTagStyle}>{a.duration} mins</span>
                  </div>
                  <button onClick={() => deleteActivity(a.id)} style={deleteButtonStyle}>✕</button>
                </div>

                {/* Media Gallery */}
                {a.media && a.media.length > 0 && (
                  <div style={galleryStyle}>
                    {a.media.map((img) => (
                      <img
                        key={img.id}
                        src={img.file_url}
                        alt="Activity attachment"
                        style={imageStyle}
                      />
                    ))}
                  </div>
                )}

                <div style={{ marginTop: '10px' }}>
                  <MediaUpload memoryId={a.id} onUploadSuccess={() => {/* Optional: Add logic to refresh */}} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- STYLES ---
const containerStyle = { maxWidth: '800px', margin: '0 auto', padding: '20px' };

const cardStyle = {
  background: '#fff',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb'
};

const headerStyle = { margin: '0 0 20px 0', fontSize: '1.4rem', color: '#111827' };

const inputGroupStyle = { display: 'flex', gap: '12px', flexWrap: 'wrap' };

const inputStyle = {
  flex: 1,
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border 0.2s',
};

const buttonStyle = {
  backgroundColor: '#4f46e5',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  fontWeight: '600',
  cursor: 'pointer'
};

const timelineStyle = { display: 'flex', flexDirection: 'column', gap: '16px' };

const activityItemStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  borderLeft: '4px solid #4f46e5',
  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
  borderTop: '1px solid #f3f4f6',
  borderRight: '1px solid #f3f4f6',
  borderBottom: '1px solid #f3f4f6',
};

const activityContentStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

const durationTagStyle = {
  marginLeft: '12px',
  backgroundColor: '#eef2ff',
  color: '#4338ca',
  padding: '4px 10px',
  borderRadius: '99px',
  fontSize: '0.85rem',
  fontWeight: '600'
};

const deleteButtonStyle = { background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '1.2rem' };

const galleryStyle = { display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' };

const imageStyle = { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #e5e7eb' };

const emptyStateStyle = { textAlign: 'center', padding: '40px', color: '#6b7280', background: '#f9fafb', borderRadius: '12px', border: '2px dashed #e5e7eb' };