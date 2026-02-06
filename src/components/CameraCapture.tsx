"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Camera, XCircle, RotateCcw, Zap } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (images: (string | null)[]) => void;
  capturedImages: (string | null)[];
}

export default function CameraCapture({
  onCapture,
  capturedImages,
}: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Effect untuk set video stream ketika stream dan video element siap
  useEffect(() => {
    if (stream && videoRef.current && isStreaming) {
      console.log("Setting video stream in useEffect");
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;

      videoElement.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }

    return () => {
      // Cleanup saat component unmount
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream, isStreaming]);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
      });

      console.log("Media stream obtained:", mediaStream);
      console.log("Active tracks:", mediaStream.getTracks());

      setStream(mediaStream);
      setIsStreaming(true);

      // Set index ke foto pertama yang belum diambil
      const firstEmptyIndex = capturedImages.findIndex((img) => img === null);
      setCurrentPhotoIndex(firstEmptyIndex !== -1 ? firstEmptyIndex : 0);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera. Pastikan izin kamera diberikan.");
    }
  }, [capturedImages]);

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

        // Update array dengan foto baru
        const newImages = [...capturedImages];
        newImages[currentPhotoIndex] = imageData;
        onCapture(newImages);

        // Cek apakah masih ada foto yang perlu diambil
        const nextEmptyIndex = newImages.findIndex(
          (img, idx) => img === null && idx > currentPhotoIndex,
        );

        if (nextEmptyIndex !== -1) {
          // Masih ada foto yang perlu diambil
          setCurrentPhotoIndex(nextEmptyIndex);
        } else {
          // Semua foto sudah diambil
          stopCamera();
        }
      }
    }
  }, [capturedImages, currentPhotoIndex, onCapture, stopCamera]);

  const retakePhoto = useCallback(
    (index: number) => {
      const newImages = [...capturedImages];
      newImages[index] = null;
      onCapture(newImages);
      setCurrentPhotoIndex(index);

      // Buka kamera jika belum streaming
      if (!isStreaming) {
        startCamera();
      }
    },
    [capturedImages, onCapture, isStreaming, startCamera],
  );

  return (
    <div className="space-y-4">
      {/* Preview 3 Foto */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg overflow-hidden border-4 ${
              currentPhotoIndex === index && isStreaming
                ? "border-accent-yellow animate-pulse"
                : capturedImages[index]
                  ? "border-accent-green"
                  : "border-gray-600"
            }`}
          >
            {capturedImages[index] ? (
              <>
                <img
                  src={capturedImages[index]!}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => retakePhoto(index)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg"
                  title="Retake foto ini"
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
                  <Camera size={32} className="text-gray-600 mx-auto mb-1" />
                  <span className="text-gray-500 text-xs font-bold">
                    Foto {index + 1}
                  </span>
                </div>
              </div>
            )}
            {currentPhotoIndex === index && isStreaming && (
              <div className="absolute top-2 left-2 bg-accent-yellow text-black px-2 py-1 rounded text-xs font-bold animate-pulse flex items-center gap-1">
                <Camera size={14} />
                Aktif
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Camera View */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border-4 border-primary-500 shadow-2xl shadow-primary-500/50">
        {isStreaming ? (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto rounded-xl"
              onLoadedMetadata={(e) => {
                console.log("Video metadata loaded");
                const video = e.currentTarget;
                console.log(
                  "Video dimensions:",
                  video.videoWidth,
                  "x",
                  video.videoHeight,
                );
                video
                  .play()
                  .then(() => console.log("Video playing"))
                  .catch((err) => console.error("Error playing video:", err));
              }}
              onError={(e) => {
                console.error("Video error:", e);
              }}
            />
            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-110 shadow-lg shadow-red-500/50 border-2 border-white"
            >
              <XCircle size={24} />
            </button>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
              <Camera size={18} />
              Foto {currentPhotoIndex + 1} dari 3
            </div>
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
        ) : (
          <div className="flex items-center justify-center h-64 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
            <button
              onClick={startCamera}
              className="flex flex-col items-center gap-3 px-10 py-6 bg-gradient-to-r from-primary-500 to-secondary-500 border-4 border-accent-yellow rounded-2xl hover:from-accent-yellow hover:to-accent-yellow hover:text-black transition-all transform hover:scale-110 shadow-2xl shadow-primary-500/50 animate-pulse"
            >
              <Camera size={56} className="text-white" />
              <span className="text-xl font-black text-white drop-shadow-lg">
                BUKA KAMERA
              </span>
              <span className="text-sm text-white/80">
                {capturedImages.filter((img) => img !== null).length} / 3 Foto
              </span>
            </button>
          </div>
        )}
      </div>

      {isStreaming && (
        <button
          onClick={capturePhoto}
          className="w-full py-4 bg-gradient-to-r from-accent-green to-secondary-500 text-white font-black text-lg rounded-xl hover:from-accent-yellow hover:to-accent-yellow hover:text-black transition-all transform hover:scale-105 shadow-xl shadow-accent-green/50 border-2 border-white flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          AMBIL FOTO {currentPhotoIndex + 1}!
          <Zap className="w-5 h-5" />
        </button>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
