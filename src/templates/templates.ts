import { Template } from "@/types";

// Helper function untuk menggambar image dengan aspect ratio yang benar
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imgRatio = img.width / img.height;
  const boxRatio = width / height;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = img.width;
  let sourceHeight = img.height;

  // Crop image untuk fill box tanpa stretch
  if (imgRatio > boxRatio) {
    // Image lebih lebar, crop sisi kiri-kanan
    sourceWidth = img.height * boxRatio;
    sourceX = (img.width - sourceWidth) / 2;
  } else {
    // Image lebih tinggi, crop atas-bawah
    sourceHeight = img.width / boxRatio;
    sourceY = (img.height - sourceHeight) / 2;
  }

  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    x,
    y,
    width,
    height,
  );
}

export const templates: Template[] = [
  {
    id: "classic",
    name: "Beach Vibes",
    thumbnail: "/templates/classic.png",
    overlay: (ctx, width, height, images, loadedImages) => {
      // Jika tidak ada loadedImages, return early
      if (!loadedImages || loadedImages.length === 0) return;

      // Background gradient biru langit ke biru laut
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#87CEEB"); // Sky blue
      bgGradient.addColorStop(0.4, "#5FB8E3");
      bgGradient.addColorStop(1, "#1E90FF"); // Ocean blue
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Awan lebih besar dan lebih banyak
      const drawCloud = (x: number, y: number, scale: number = 1) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(x, y, 35 * scale, 0, Math.PI * 2);
        ctx.arc(x + 35 * scale, y - 15 * scale, 40 * scale, 0, Math.PI * 2);
        ctx.arc(x + 70 * scale, y, 35 * scale, 0, Math.PI * 2);
        ctx.fill();
      };

      drawCloud(80, 80, 1);
      drawCloud(700, 120, 0.8);
      drawCloud(500, 1750, 0.9);
      drawCloud(150, 1650, 0.7);
      drawCloud(850, 1800, 0.85);

      // Matahari lebih besar di pojok kanan atas
      const sunGradient = ctx.createRadialGradient(
        width - 120,
        100,
        15,
        width - 120,
        100,
        90,
      );
      sunGradient.addColorStop(0, "#FFD700");
      sunGradient.addColorStop(0.5, "#FFA500");
      sunGradient.addColorStop(1, "rgba(255, 165, 0, 0.3)");
      ctx.fillStyle = sunGradient;
      ctx.beginPath();
      ctx.arc(width - 120, 100, 90, 0, Math.PI * 2);
      ctx.fill();

      // Sinar matahari lebih panjang
      ctx.strokeStyle = "rgba(255, 215, 0, 0.5)";
      ctx.lineWidth = 4;
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6;
        ctx.beginPath();
        ctx.moveTo(width - 120, 100);
        ctx.lineTo(
          width - 120 + Math.cos(angle) * 130,
          100 + Math.sin(angle) * 130,
        );
        ctx.stroke();
      }

      // Header dengan ombak
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, 140);
      // Ombak bawah header
      for (let i = 0; i < width; i += 60) {
        ctx.quadraticCurveTo(i + 15, 155, i + 30, 140);
        ctx.quadraticCurveTo(i + 45, 125, i + 60, 140);
      }
      ctx.lineTo(0, 140);
      ctx.closePath();
      ctx.fill();

      // Judul dengan gradient dan shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 3;
      const titleGradient = ctx.createLinearGradient(0, 50, 0, 100);
      titleGradient.addColorStop(0, "#1E90FF");
      titleGradient.addColorStop(1, "#00BFFF");
      ctx.fillStyle = titleGradient;
      ctx.font = "bold 60px Arial";
      ctx.textAlign = "center";
      ctx.fillText("⚡ PIKUL RANGERS ⚡", width / 2, 90);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Layout 3 foto dengan bayangan pantai
      const photoWidth = width - 120;
      const photoHeight = 520;
      const startY = 190;
      const gap = 30;

      loadedImages.forEach((img, index) => {
        const y = startY + (photoHeight + gap) * index;

        // Shadow yang lebih dramatis
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;

        // Border putih tebal untuk foto
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(50, y - 15, photoWidth + 30, photoHeight + 30);

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Gambar foto dengan aspect ratio yang benar
        drawImageCover(ctx, img, 60, y, photoWidth, photoHeight);

        // Label foto dengan background rounded - posisi di dalam foto
        const labelX = 80;
        const labelY = y + photoHeight - 50;
      });

      // Bintang laut besar tersebar di area foto
      const drawBigStarfish = (
        x: number,
        y: number,
        size: number,
        color: string,
        rotation: number = 0,
      ) => {
        ctx.fillStyle = color;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.lineWidth = 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          const innerAngle = angle + Math.PI / 5;
          const innerX = Math.cos(innerAngle) * (size * 0.4);
          const innerY = Math.sin(innerAngle) * (size * 0.4);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      };

      // Bintang laut di berbagai posisi
      drawBigStarfish(width - 80, 250, 35, "#FF6B6B", Math.PI / 6);
      drawBigStarfish(50, 850, 40, "#FFA07A", -Math.PI / 4);
      drawBigStarfish(width - 90, 1400, 38, "#FF7F7F", Math.PI / 3);
      drawBigStarfish(60, 1650, 42, "#FFB6C1", Math.PI / 8);

      // Kerang besar tersebar
      const drawBigShell = (
        x: number,
        y: number,
        size: number,
        color1: string,
        color2: string,
        rotation: number = 0,
      ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Shell body
        ctx.fillStyle = color1;
        ctx.strokeStyle = color2;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, size, size * 0.85, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Shell lines
        ctx.strokeStyle = color2;
        ctx.lineWidth = 2;
        for (let i = -4; i <= 4; i++) {
          ctx.beginPath();
          ctx.moveTo(i * (size / 5), -size * 0.85);
          ctx.lineTo(i * (size / 8), size * 0.85);
          ctx.stroke();
        }
        ctx.restore();
      };

      drawBigShell(width - 70, 650, 32, "#FFE4E1", "#FF69B4", -Math.PI / 6);
      drawBigShell(65, 450, 36, "#FFC0CB", "#FF1493", Math.PI / 5);
      drawBigShell(width - 85, 1150, 34, "#FADADD", "#FF69B4", Math.PI / 4);
      drawBigShell(55, 1250, 38, "#FFB6C1", "#DB7093", -Math.PI / 8);

      // Footer dengan ombak dan pasir
      const footerY = height - 140;

      // Pasir (warna krem)
      ctx.fillStyle = "#F4E4C1";
      ctx.fillRect(0, footerY + 40, width, 100);

      // Ombak di atas pasir
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.moveTo(0, footerY);
      for (let i = 0; i < width; i += 80) {
        ctx.quadraticCurveTo(i + 20, footerY - 15, i + 40, footerY);
        ctx.quadraticCurveTo(i + 60, footerY + 15, i + 80, footerY);
      }
      ctx.lineTo(width, footerY + 40);
      ctx.lineTo(0, footerY + 40);
      ctx.closePath();
      ctx.fill();

      // Bintang laut besar di pasir
      drawBigStarfish(200, footerY + 80, 35, "#FF6B6B", Math.PI / 7);
      drawBigStarfish(width - 180, footerY + 85, 38, "#FFA07A", -Math.PI / 5);
      drawBigStarfish(
        width / 2 + 100,
        footerY + 75,
        32,
        "#FFB6C1",
        Math.PI / 4,
      );

      // Kerang besar di pasir
      drawBigShell(350, footerY + 80, 30, "#FFE4E1", "#FF69B4", Math.PI / 6);
      drawBigShell(
        width - 350,
        footerY + 85,
        32,
        "#FFC0CB",
        "#FF1493",
        -Math.PI / 4,
      );
      drawBigShell(
        width / 2 - 150,
        footerY + 90,
        28,
        "#FADADD",
        "#DB7093",
        Math.PI / 8,
      );

      // Text footer dengan background agar lebih terbaca
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.roundRect(width / 2 - 450, footerY + 5, 900, 90, 15);
      ctx.fill();

      ctx.fillStyle = "#1E90FF";
      ctx.font = "italic bold 38px Georgia";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 2;
      ctx.fillText("🌊 KKN 2026 🌊", width / 2, footerY + 35);

      ctx.fillStyle = "#00BFFF";
      ctx.font = "bold 30px Arial";
      ctx.fillText(
        "📍 Piasa Kulon - " + new Date().toLocaleDateString("id-ID"),
        width / 2,
        footerY + 75,
      );
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    },
  },
  {
    id: "polaroid",
    name: "Polaroid Style",
    thumbnail: "/templates/polaroid.png",
    overlay: (ctx, width, height, images, loadedImages) => {
      // Jika tidak ada loadedImages, return early
      if (!loadedImages || loadedImages.length === 0) return;

      // Background dengan pattern
      ctx.fillStyle = "#F5F5F5";
      ctx.fillRect(0, 0, width, height);

      // Dots pattern
      ctx.fillStyle = "#E0E0E0";
      for (let x = 0; x < width; x += 30) {
        for (let y = 0; y < height; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Judul di atas
      ctx.fillStyle = "#333333";
      ctx.font = "bold 52px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("📸 MOMENT KKN 📸", width / 2, 90);

      // Style Polaroid untuk 3 foto - adjusted untuk Instagram Story
      const polaroidWidth = width - 150;
      const polaroidPhotoHeight = 480;
      const polaroidBottomSpace = 100;
      const totalPolaroidHeight = polaroidPhotoHeight + polaroidBottomSpace;
      const startY = 160;
      const gap = 35;

      loadedImages.forEach((img, index) => {
        const y = startY + (totalPolaroidHeight + gap) * index;

        // Shadow polaroid
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 10;

        // Background putih polaroid
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(75, y, polaroidWidth, totalPolaroidHeight);

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Foto dengan aspect ratio yang benar
        drawImageCover(
          ctx,
          img,
          90,
          y + 15,
          polaroidWidth - 30,
          polaroidPhotoHeight,
        );

        // Teks di bagian bawah polaroid
        ctx.fillStyle = "#555555";
        ctx.font = "italic 32px Georgia";
        ctx.textAlign = "center";
        ctx.fillText(
          `Memory ${index + 1}`,
          width / 2,
          y + polaroidPhotoHeight + 60,
        );
      });
    },
  },
  {
    id: "gradient",
    name: "Gradient Dream",
    thumbnail: "/templates/gradient.png",
    overlay: (ctx, width, height, images, loadedImages) => {
      // Jika tidak ada loadedImages, return early
      if (!loadedImages || loadedImages.length === 0) return;

      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#667eea");
      bgGradient.addColorStop(0.5, "#764ba2");
      bgGradient.addColorStop(1, "#f093fb");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Overlay pattern
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Judul
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 56px Arial";
      ctx.textAlign = "center";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 4;
      ctx.strokeText("✨ KKN MEMORIES ✨", width / 2, 100);
      ctx.fillText("✨ KKN MEMORIES ✨", width / 2, 100);

      // Layout 3 foto dengan rounded corners - adjusted untuk Instagram Story
      const photoWidth = width - 140;
      const photoHeight = 500;
      const startY = 180;
      const gap = 40;

      loadedImages.forEach((img, index) => {
        const y = startY + (photoHeight + gap) * index;

        // Shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 12;

        // Border putih dengan rounded corners
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        const radius = 25;
        ctx.roundRect(65, y - 8, photoWidth + 16, photoHeight + 16, radius);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;

        // Clip untuk rounded corners foto
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(70, y, photoWidth, photoHeight, radius - 5);
        ctx.clip();

        // Gambar foto dengan aspect ratio yang benar
        drawImageCover(ctx, img, 70, y, photoWidth, photoHeight);

        ctx.restore();

        // Badge nomor
        const badgeX = width - 110;
        const badgeY = y + 40;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#667eea";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${index + 1}`, badgeX, badgeY + 10);
      });
    },
  },
];
