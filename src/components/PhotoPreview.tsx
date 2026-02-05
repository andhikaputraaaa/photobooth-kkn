"use client";

import { useEffect, useRef } from "react";
import { PhotoData } from "@/types";

interface PhotoPreviewProps {
  photoData: PhotoData;
}

export default function PhotoPreview({ photoData }: PhotoPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (photoData.image && photoData.template && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;

          // Gambar foto
          ctx.drawImage(img, 0, 0);

          // Terapkan template overlay
          photoData.template?.overlay(ctx, canvas.width, canvas.height);
        };
        img.src = photoData.image;
      }
    }
  }, [photoData]);

  if (!photoData.image) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-white drop-shadow-lg flex items-center gap-2">
        ⚡ PREVIEW RANGER POWER ⚡
      </h3>
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-4 border-accent-yellow shadow-2xl shadow-accent-yellow/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-accent-pink/10 pointer-events-none"></div>
        <canvas ref={canvasRef} className="w-full h-auto rounded-lg relative z-10 shadow-2xl border-2 border-white" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-accent-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
}
