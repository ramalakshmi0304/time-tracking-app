import React, { useState } from "react";
import { supabase } from "../config/supabase";

export default function MediaUpload({ memoryId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 1. Upload file
      const { error: uploadError } = await supabase.storage
        .from("activity-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("activity-media")
        .getPublicUrl(filePath);

      // 3. Insert record into 'media' table
      const { error: dbError } = await supabase
        .from("media")
        .insert([
          {
            memory_id: memoryId,
            file_url: publicUrl,
            file_type: file.type,
            created_at: new Date().toISOString()
          },
        ]);

      if (dbError) throw dbError;

      if (onUploadSuccess) onUploadSuccess(publicUrl);

    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <label style={uploadButtonStyle(uploading)}>
        {uploading ? (
          <span style={loadingContent}>
            <span className="spinner-mini"></span> Uploading...
          </span>
        ) : (
          <>
            <span style={{ fontSize: '1.2rem' }}>📷</span>
            <span>Add Memory</span>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={uploadFile}
          disabled={uploading}
          style={hiddenInputStyle}
        />
      </label>
      
      {/* Visual helper text */}
      {!uploading && <span style={hintStyle}>JPEG, PNG up to 5MB</span>}
    </div>
  );
}

// --- STYLES ---

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px'
};

const uploadButtonStyle = (isUploading) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  backgroundColor: isUploading ? '#f3f4f6' : '#ffffff',
  color: isUploading ? '#9ca3af' : '#4b5563',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  cursor: isUploading ? 'not-allowed' : 'pointer',
  fontSize: '0.875rem',
  fontWeight: '600',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  ':hover': {
    backgroundColor: '#f9fafb',
    borderColor: '#9ca3af'
  }
});

const hiddenInputStyle = {
  display: 'none'
};

const hintStyle = {
  fontSize: '0.75rem',
  color: '#9ca3af',
  fontStyle: 'italic'
};

const loadingContent = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};