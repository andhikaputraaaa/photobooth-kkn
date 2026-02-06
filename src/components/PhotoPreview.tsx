"use client";

import { useEffect, useRef } from "react";
import { PhotoData } from "@/types";

interface PhotoPreviewProps {
  photoData: PhotoData;
  exportCanvasRef?: React.RefObject<HTMLCanvasElement>;
}

export default function PhotoPreview({
  photoData,
  exportCanvasRef,
}: PhotoPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hasAllImages = photoData.images.every((img) => img !== null);

    if (hasAllImages && photoData.template) {
      const canvases = [canvasRef.current];
      if (exportCanvasRef?.current) {
        canvases.push(exportCanvasRef.current);
      }

      // Load semua gambar dulu
      const imagePromises = photoData.images.map((imgSrc) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = imgSrc!;
        });
      });

      Promise.all(imagePromises).then((loadedImages) => {
        // Render ke semua canvas setelah semua gambar loaded
        canvases.forEach((canvas) => {
          if (!canvas) return;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            // Set ukuran canvas untuk Instagram Story (9:16 ratio)
            canvas.width = 1080;
            canvas.height = 1920;

            // Background putih
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Terapkan template overlay dengan loaded images
            photoData.template?.overlay(
              ctx,
              canvas.width,
              canvas.height,
              photoData.images as string[],
              loadedImages,
            );
          }
        });
      });
    }
  }, [photoData, exportCanvasRef]);

  const hasAllImages = photoData.images.every((img) => img !== null);
  const capturedCount = photoData.images.filter((img) => img !== null).length;

  if (!hasAllImages) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-white drop-shadow-lg flex items-center gap-2">
          ⚡ PROGRESS FOTO ⚡
        </h3>
        <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-4 border-accent-yellow shadow-2xl">
          <div className="text-center">
            <div className="text-6xl font-black text-accent-yellow mb-4">
              {capturedCount} / 3
            </div>
            <p className="text-white text-lg font-bold">Foto Terkumpul</p>
            <p className="text-gray-400 mt-2">
              Ambil {3 - capturedCount} foto lagi!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-black text-white drop-shadow-lg flex items-center gap-2">
        ⚡ PREVIEW PHOTOCARD ⚡
      </h3>
      <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border-4 border-accent-yellow shadow-2xl shadow-accent-yellow/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-accent-pink/10 pointer-events-none"></div>
        <canvas
          ref={canvasRef}
          className="w-full h-auto rounded-lg relative z-10 shadow-2xl border-2 border-white"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          <div
            className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-accent-yellow rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
