"use client";

import { useState, useRef } from "react";
import CameraCapture from "@/components/CameraCapture";
import FileUpload from "@/components/FileUpload";
import TemplateSelector from "@/components/TemplateSelector";
import PhotoPreview from "@/components/PhotoPreview";
import ExportButton from "@/components/ExportButton";
import { templates } from "@/templates/templates";
import { PhotoData, Template } from "@/types";

export default function Home() {
  const [photoData, setPhotoData] = useState<PhotoData>({
    image: null,
    template: null,
  });
  const [activeTab, setActiveTab] = useState<"camera" | "upload">("camera");
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  const handleImageCapture = (image: string) => {
    setPhotoData({ ...photoData, image });
  };

  const handleTemplateSelect = (template: Template) => {
    setPhotoData({ ...photoData, template });
  };

  const handleReset = () => {
    setPhotoData({ image: null, template: null });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-pink shadow-2xl border-b-4 border-accent-yellow">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-secondary-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 rounded-full bg-accent-yellow animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="w-3 h-3 rounded-full bg-accent-pink animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse" style={{animationDelay: '0.8s'}}></div>
            </div>
            <h1 className="text-6xl font-black text-white tracking-wider drop-shadow-2xl">
              ⚡ PIKUL RANGERS ⚡
            </h1>
            <p className="text-2xl font-bold text-accent-yellow drop-shadow-lg animate-pulse">
              IT'S MORPHIN TIME! 🦸‍♂️
            </p>
            <p className="text-white/90 text-sm tracking-widest">WE ARE RANGERS!!!</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel Kiri: Input */}
          <div className="space-y-6">
            {/* Tab Selector */}
            <div className="flex gap-2 bg-gradient-to-r from-gray-800 to-gray-900 p-2 rounded-xl border-2 border-accent-yellow shadow-xl">
              <button
                onClick={() => setActiveTab("camera")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  activeTab === "camera"
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                📷 KAMERA
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  activeTab === "upload"
                    ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-lg shadow-secondary-500/50"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                📁 UPLOAD
              </button>
            </div>

            {/* Input Area */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border-4 border-accent-yellow shadow-2xl shadow-accent-yellow/20">
              {activeTab === "camera" ? (
                <CameraCapture onCapture={handleImageCapture} />
              ) : (
                <FileUpload onUpload={handleImageCapture} />
              )}
            </div>

            {/* Template Selector */}
            {photoData.image && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border-4 border-accent-pink shadow-2xl shadow-accent-pink/20 animate-slide-in">
                <TemplateSelector
                  templates={templates}
                  selectedTemplate={photoData.template}
                  onSelect={handleTemplateSelect}
                />
              </div>
            )}
          </div>

          {/* Panel Kanan: Preview & Export */}
          <div className="space-y-6">
            {photoData.image && photoData.template ? (
              <>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border-4 border-accent-green shadow-2xl shadow-accent-green/20 animate-slide-in">
                  <PhotoPreview photoData={photoData} />
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                <ExportButton
                  canvasRef={canvasRef}
                  disabled={!photoData.image || !photoData.template}
                />

                <button
                  onClick={handleReset}
                  className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 border-2 border-accent-yellow text-white font-bold rounded-lg hover:from-accent-yellow hover:to-accent-yellow hover:text-black transition-all transform hover:scale-105 shadow-lg"
                >
                  🔄 AMBIL FOTO BARU
                </button>
              </>
            ) : (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-xl text-center border-4 border-dashed border-accent-yellow shadow-2xl">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-pink rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                    <span className="text-4xl">⚡</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-yellow rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-wider">
                  READY TO MORPH!
                </h3>
                <p className="text-accent-yellow font-bold text-lg mb-2">
                  ⚡ Preview Akan Muncul Di Sini ⚡
                </p>
                <p className="text-gray-400">
                  Ambil foto dan pilih template Power Rangers!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-pink mt-16 py-6 border-t-4 border-accent-yellow shadow-2xl">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-bold text-lg drop-shadow-lg">⚡ GO GO PIKUL RANGERS! ⚡</p>
          <p className="text-white/80 text-sm mt-2">Dibuat dengan penuh kenangan untuk KKN Piasa Kulon 2026</p>
        </div>
      </footer>
    </main>
  );
}
