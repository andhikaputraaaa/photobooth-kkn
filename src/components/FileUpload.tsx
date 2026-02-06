"use client";

import { useCallback, useState } from "react";
import { Upload, RotateCcw, CheckCircle } from "lucide-react";

interface FileUploadProps {
  onUpload: (images: (string | null)[]) => void;
  uploadedImages?: (string | null)[];
}

export default function FileUpload({
  onUpload,
  uploadedImages = [null, null, null],
}: FileUploadProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const newImages = [...uploadedImages];
            const emptyIndex = newImages.findIndex((img) => img === null);
            if (emptyIndex !== -1) {
              newImages[emptyIndex] = event.target.result as string;
              onUpload(newImages);
              setCurrentIndex(emptyIndex);
            }
          }
        };
        reader.readAsDataURL(file);
      }
      // Reset input untuk bisa upload file yang sama lagi
      e.target.value = "";
    },
    [onUpload, uploadedImages],
  );

  const retakePhoto = useCallback(
    (index: number) => {
      const newImages = [...uploadedImages];
      newImages[index] = null;
      onUpload(newImages);
      setCurrentIndex(index);
    },
    [uploadedImages, onUpload],
  );

  const uploadedCount = uploadedImages.filter((img) => img !== null).length;

  return (
    <div className="space-y-4">
      {/* Preview 3 Foto */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden border-4 ${
              uploadedImages[index] ? "border-accent-green" : "border-gray-600"
            }`}
          >
            {uploadedImages[index] ? (
              <>
                <img
                  src={uploadedImages[index]!}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => retakePhoto(index)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                  title="Hapus dan upload ulang"
                >
                  <RotateCcw size={16} />
                </button>
                <div className="absolute bottom-2 left-2 bg-accent-green text-white px-2 py-1 rounded text-xs font-bold">
                  ✓ Foto {index + 1}
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                  <Upload size={24} className="text-gray-600 mx-auto mb-1" />
                  <span className="text-gray-500 text-xs font-bold">
                    Foto {index + 1}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={uploadedCount >= 3}
        />
        <label
          htmlFor="file-upload"
          className={`flex flex-col items-center justify-center h-48 bg-gradient-to-br from-secondary-500/20 to-accent-pink/20 border-4 border-dashed rounded-2xl transition-all transform shadow-xl ${
            uploadedCount >= 3
              ? "border-gray-600 cursor-not-allowed opacity-50"
              : "border-accent-yellow cursor-pointer hover:border-accent-pink hover:from-secondary-500/30 hover:to-accent-pink/30 hover:scale-105 hover:shadow-2xl hover:shadow-accent-yellow/50"
          }`}
        >
          <div className="bg-gradient-to-r from-primary-500 to-accent-pink p-4 rounded-full mb-4 animate-pulse">
            <Upload size={48} className="text-white" />
          </div>
          <span className="text-xl font-black text-white drop-shadow-lg flex items-center gap-2">
            {uploadedCount >= 3 ? (
              <>
                <CheckCircle className="w-6 h-6" />
                SEMUA FOTO TERUPLOAD
              </>
            ) : (
              "UPLOAD FOTO"
            )}
          </span>
          <span className="text-sm text-accent-yellow font-bold mt-2">
            {uploadedCount} / 3 Foto
          </span>
          <div className="mt-4 flex gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-accent-yellow rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
}
