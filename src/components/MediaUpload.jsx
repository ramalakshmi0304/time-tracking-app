import React, { useState } from "react";
import { supabase } from "../config/supabase";
import { Upload, Loader2, CheckCircle } from "lucide-react";

export default function MediaUpload({ memoryId, onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      if (!file) return;

      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${memoryId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('activity memories') // Ensure this matches your bucket name
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('activity memories')
        .getPublicUrl(filePath);

      // 3. Save URL to 'media' table
      const { error: dbError } = await supabase
        .from('media')
        .insert([{ 
          memory_id: memoryId, 
          file_url: publicUrl,
          file_type: file.type 
        }]);

      if (dbError) throw dbError;

      onUploadSuccess();
      alert("Memory saved!");
    } catch (error) {
      alert("Error uploading media: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all">
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        ) : (
          <Upload className="w-4 h-4 text-indigo-600" />
        )}
        {uploading ? "Uploading..." : "Add Media"}
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={uploading}
        />
      </label>
    </div>
  );
}