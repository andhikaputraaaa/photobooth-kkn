"use client";

import { useRef, useState, useCallback } from "react";
import { Camera, XCircle } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (image: string) => void;
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL("image/png");
        onCapture(imageData);
        stopCamera();
      }
    }
  }, [onCapture, stopCamera]);

  return (
    <div className="space-y-4">
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-4 border-primary-500 shadow-2xl shadow-primary-500/50">
        {isStreaming ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto rounded-xl"
            />
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-110 shadow-lg shadow-red-500/50 border-2 border-white"
            >
              <XCircle size={24} />
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-accent-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
            <button
              onClick={startCamera}
              className="flex flex-col items-center gap-3 px-10 py-6 bg-gradient-to-r from-primary-500 to-secondary-500 border-4 border-accent-yellow rounded-2xl hover:from-accent-yellow hover:to-accent-yellow hover:text-black transition-all transform hover:scale-110 shadow-2xl shadow-primary-500/50 animate-pulse"
            >
              <Camera size={56} className="text-white" />
              <span className="text-xl font-black text-white drop-shadow-lg">
                📸 BUKA KAMERA
              </span>
            </button>
          </div>
        )}
      </div>

      {isStreaming && (
        <button
          onClick={capturePhoto}
          className="w-full py-4 bg-gradient-to-r from-accent-green to-secondary-500 text-white font-black text-lg rounded-xl hover:from-accent-yellow hover:to-accent-yellow hover:text-black transition-all transform hover:scale-105 shadow-xl shadow-accent-green/50 border-2 border-white"
        >
          ⚡ AMBIL FOTO! ⚡
        </button>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
