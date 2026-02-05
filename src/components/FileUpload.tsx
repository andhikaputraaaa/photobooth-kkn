"use client";

import { useCallback } from "react";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onUpload: (image: string) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onUpload(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onUpload],
  );

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-secondary-500/20 to-accent-pink/20 border-4 border-dashed border-accent-yellow rounded-2xl cursor-pointer hover:border-accent-pink hover:from-secondary-500/30 hover:to-accent-pink/30 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-accent-yellow/50"
      >
        <div className="bg-gradient-to-r from-primary-500 to-accent-pink p-4 rounded-full mb-4 animate-pulse">
          <Upload size={48} className="text-white" />
        </div>
        <span className="text-xl font-black text-white drop-shadow-lg">📤 UPLOAD FOTO</span>
        <span className="text-sm text-accent-yellow font-bold mt-2">
          atau drag & drop di sini
        </span>
        <div className="mt-4 flex gap-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </label>
    </div>
  );
}
