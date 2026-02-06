"use client";

import { Download, Zap } from "lucide-react";
import html2canvas from "html2canvas";

interface ExportButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  disabled: boolean;
}

export default function ExportButton({
  canvasRef,
  disabled,
}: ExportButtonProps) {
  const handleExport = async () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const link = document.createElement("a");
      link.download = `KKN-Photo-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled}
      className={`w-full py-5 rounded-xl font-black text-xl text-white flex items-center justify-center gap-3 transition-all transform border-4 shadow-2xl ${
        disabled
          ? "bg-gray-600 cursor-not-allowed border-gray-500"
          : "bg-gradient-to-r from-accent-green via-secondary-500 to-accent-pink hover:from-accent-yellow hover:to-accent-yellow hover:text-black hover:scale-105 border-white shadow-accent-green/50 animate-pulse"
      }`}
    >
      <Zap size={28} />
      <Download size={28} />
      DOWNLOAD FOTO RANGER!
      <Zap size={28} />
    </button>
  );
}
