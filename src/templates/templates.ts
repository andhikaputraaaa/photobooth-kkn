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
      bgGradient.addColorStop(0, "#B8D9F0"); // Sky blue light
      bgGradient.addColorStop(0.4, "#91c3e4");
      bgGradient.addColorStop(1, "#6FA8CE"); // Ocean blue darker
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

      // Header dengan gradient pantai
      const headerGradient = ctx.createLinearGradient(0, 0, 0, 140);
      headerGradient.addColorStop(0, "#FFFFFF");
      headerGradient.addColorStop(0.5, "#F0F8FF");
      headerGradient.addColorStop(1, "#E6F3FF");
      ctx.fillStyle = headerGradient;
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

      // Ornamen kerang kecil di header
      const drawSmallShell = (x: number, y: number, size: number) => {
        ctx.fillStyle = "#FFE4E1";
        ctx.strokeStyle = "#FFB6C1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Garis kerang
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(x + (i * size) / 3, y - size);
          ctx.lineTo(x + (i * size) / 4, y + size);
          ctx.stroke();
        }
      };

      // Ornamen bintang laut kecil di header
      const drawSmallStar = (x: number, y: number, size: number) => {
        ctx.fillStyle = "#FFA07A";
        ctx.strokeStyle = "#FF6B6B";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x1 = x + Math.cos(angle) * size;
          const y1 = y + Math.sin(angle) * size;
          if (i === 0) ctx.moveTo(x1, y1);
          else ctx.lineTo(x1, y1);
          const innerAngle = angle + Math.PI / 5;
          const innerX = x + Math.cos(innerAngle) * (size * 0.4);
          const innerY = y + Math.sin(innerAngle) * (size * 0.4);
          ctx.lineTo(innerX, innerY);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      };

      // Tambahkan ornamen di sekitar header
      drawSmallShell(120, 45, 12);
      drawSmallShell(width - 120, 50, 14);
      drawSmallStar(80, 110, 10);
      drawSmallStar(width - 80, 115, 11);
      drawSmallShell(200, 120, 10);
      drawSmallShell(width - 200, 118, 13);

      // Judul dengan gradient dan shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = "#87B2E7";
      ctx.font = "bold 52px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("PIKUL MOMENTS", width / 2, 90);
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
      drawBigStarfish(width - 80, 250, 80, "#FF6B6B", Math.PI / 6);
      drawBigStarfish(50, 850, 60, "#FFA07A", -Math.PI / 4);
      drawBigStarfish(width - 90, 1400, 70, "#FF7F7F", Math.PI / 3);
      drawBigStarfish(60, 1650, 50, "#FFB6C1", Math.PI / 8);

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

      drawBigShell(width - 70, 650, 65, "#FFE4E1", "#FF69B4", -Math.PI / 6);
      drawBigShell(65, 450, 45, "#FFC0CB", "#FF1493", Math.PI / 5);
      drawBigShell(width - 85, 1150, 55, "#FADADD", "#FF69B4", Math.PI / 4);
      drawBigShell(55, 1250, 40, "#FFB6C1", "#DB7093", -Math.PI / 8);

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
      ctx.roundRect(width / 2 - 250, footerY + 5, 500, 90, 15);
      ctx.fill();

      ctx.fillStyle = "#87B2E7";
      ctx.font = "italic bold 38px Georgia";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 2;
      ctx.fillText(" KKN 2026 ", width / 2, footerY + 35);

      ctx.fillStyle = "#6FA8CE";
      ctx.font = "bold 30px Arial";
      ctx.fillText(
        "Piasa Kulon - " + new Date().toLocaleDateString("id-ID"),
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
      ctx.fillText("PIKUL MOMENTS", width / 2, 90);

      // Style Polaroid untuk 3 foto - adjusted untuk Instagram Story
      const polaroidWidth = width - 150;
      const polaroidPhotoHeight = 450;
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
    name: "Halloween Night",
    thumbnail: "/templates/gradient.png",
    overlay: (ctx, width, height, images, loadedImages) => {
      // Jika tidak ada loadedImages, return early
      if (!loadedImages || loadedImages.length === 0) return;

      // Background gradient gelap
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#1a1a2e");
      bgGradient.addColorStop(0.5, "#16213e");
      bgGradient.addColorStop(1, "#0f0f1e");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Bintang-bintang kecil di background
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bulan purnama besar
      const moonGradient = ctx.createRadialGradient(
        width - 100,
        120,
        10,
        width - 100,
        120,
        70,
      );
      moonGradient.addColorStop(0, "#FFF8DC");
      moonGradient.addColorStop(0.7, "#FFE4B5");
      moonGradient.addColorStop(1, "rgba(255, 228, 181, 0.3)");
      ctx.fillStyle = moonGradient;
      ctx.beginPath();
      ctx.arc(width - 100, 120, 70, 0, Math.PI * 2);
      ctx.fill();

      // Tekstur bulan
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.beginPath();
      ctx.arc(width - 85, 110, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(width - 110, 135, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(width - 95, 125, 8, 0, Math.PI * 2);
      ctx.fill();

      // Fungsi menggambar labu
      const drawPumpkin = (x: number, y: number, size: number) => {
        // Body labu
        ctx.fillStyle = "#FF8C00";
        ctx.beginPath();
        ctx.ellipse(x, y, size, size * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();

        // Garis labu
        ctx.strokeStyle = "#D2691E";
        ctx.lineWidth = 2;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(x + (i * size) / 3, y - size * 0.9);
          ctx.lineTo(x + (i * size) / 3, y + size * 0.9);
          ctx.stroke();
        }

        // Tangkai
        ctx.fillStyle = "#8B4513";
        ctx.fillRect(x - size * 0.15, y - size * 1.2, size * 0.3, size * 0.4);

        // Mata
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(x - size * 0.35, y - size * 0.2);
        ctx.lineTo(x - size * 0.15, y - size * 0.3);
        ctx.lineTo(x - size * 0.15, y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + size * 0.35, y - size * 0.2);
        ctx.lineTo(x + size * 0.15, y - size * 0.3);
        ctx.lineTo(x + size * 0.15, y);
        ctx.fill();

        // Mulut
        ctx.beginPath();
        ctx.arc(x, y + size * 0.3, size * 0.4, 0, Math.PI);
        ctx.fill();

        // Gigi
        ctx.fillStyle = "#FF8C00";
        for (let i = -2; i <= 2; i++) {
          ctx.fillRect(
            x + (i * size) / 5 - size * 0.05,
            y + size * 0.3,
            size * 0.08,
            size * 0.15,
          );
        }
      };

      // Fungsi menggambar kelelawar
      const drawBat = (
        x: number,
        y: number,
        size: number,
        rotation: number = 0,
      ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Body
        ctx.fillStyle = "#2C2C2C";
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.3, size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Kepala
        ctx.beginPath();
        ctx.arc(0, -size * 0.35, size * 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Telinga
        ctx.beginPath();
        ctx.moveTo(-size * 0.2, -size * 0.5);
        ctx.lineTo(-size * 0.3, -size * 0.7);
        ctx.lineTo(-size * 0.1, -size * 0.6);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(size * 0.2, -size * 0.5);
        ctx.lineTo(size * 0.3, -size * 0.7);
        ctx.lineTo(size * 0.1, -size * 0.6);
        ctx.fill();

        // Sayap kiri
        ctx.beginPath();
        ctx.moveTo(-size * 0.3, 0);
        ctx.quadraticCurveTo(-size * 0.8, -size * 0.3, -size, 0);
        ctx.quadraticCurveTo(-size * 0.8, size * 0.2, -size * 0.3, 0);
        ctx.fill();

        // Sayap kanan
        ctx.beginPath();
        ctx.moveTo(size * 0.3, 0);
        ctx.quadraticCurveTo(size * 0.8, -size * 0.3, size, 0);
        ctx.quadraticCurveTo(size * 0.8, size * 0.2, size * 0.3, 0);
        ctx.fill();

        ctx.restore();
      };

      // Fungsi menggambar hantu
      const drawGhost = (x: number, y: number, size: number) => {
        // Body hantu
        ctx.fillStyle = "rgba(240, 240, 240, 0.85)";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(x, y + size * 0.8, size, size * 1.2, 0, 0, Math.PI);
        ctx.fill();

        // Gerigi bawah
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.arc(
            x + (i * size) / 2.5,
            y + size * 1.8,
            size * 0.3,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }

        // Mata
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.ellipse(
          x - size * 0.3,
          y - size * 0.1,
          size * 0.15,
          size * 0.25,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(
          x + size * 0.3,
          y - size * 0.1,
          size * 0.15,
          size * 0.25,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Mulut
        ctx.beginPath();
        ctx.arc(x, y + size * 0.4, size * 0.3, 0, Math.PI);
        ctx.fill();
      };

      // Fungsi menggambar sarang laba-laba
      const drawWeb = (x: number, y: number, size: number) => {
        ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
        ctx.lineWidth = 1.5;

        // Garis radial
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
          ctx.stroke();
        }

        // Lingkaran konsentris
        for (let r = size / 4; r <= size; r += size / 4) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Laba-laba
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      };

      // Header area dengan fog effect
      ctx.fillStyle = "rgba(75, 0, 130, 0.3)";
      ctx.fillRect(0, 0, width, 150);

      // Sarang laba-laba di corners
      drawWeb(80, 50, 140);
      drawWeb(width - 80, 50, 80);

      // Judul dengan efek spooky
      ctx.shadowColor = "#FF6600";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "#FF6600";
      ctx.font = "bold 56px Arial";
      ctx.textAlign = "center";
      ctx.fillText("PIKUL MOMENTS", width / 2, 100);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Kelelawar terbang di atas
      drawBat(150, 130, 20, Math.PI / 6);
      drawBat(width - 150, 120, 22, -Math.PI / 6);
      drawBat(width / 2, 140, 18, Math.PI / 12);

      // Layout 3 foto dengan border hitam gothic
      const photoWidth = width - 140;
      const photoHeight = 500;
      const startY = 180;
      const gap = 40;

      loadedImages.forEach((img, index) => {
        const y = startY + (photoHeight + gap) * index;

        // Shadow lebih dramatis
        ctx.shadowColor = "rgba(255, 102, 0, 0.6)";
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 15;

        // Border hitam dengan aksen orange
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        const radius = 25;
        ctx.roundRect(65, y - 8, photoWidth + 16, photoHeight + 16, radius);
        ctx.fill();

        // Border orange inner
        ctx.strokeStyle = "#FF6600";
        ctx.lineWidth = 4;
        ctx.stroke();

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

        // Ornamen di sekitar foto
        if (index === 0) {
          drawPumpkin(90, y + 30, 60);
          drawBat(width - 90, y + 40, 18, Math.PI / 4);
        } else if (index === 1) {
          drawGhost(85, y + photoHeight / 2, 22);
          drawPumpkin(width - 90, y + photoHeight / 2, 45);
        } else {
          drawBat(90, y + photoHeight - 40, 20, -Math.PI / 6);
          drawGhost(width - 85, y + photoHeight - 50, 40);
        }

        // Badge nomor dengan tema Halloween
        const badgeX = width - 110;
        const badgeY = y + 40;
        ctx.fillStyle = "#FF6600";
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, 35, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 32px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${index + 1}`, badgeX, badgeY + 10);
      });

      // Footer area dengan lebih banyak ornamen
      const footerY = height - 100;

      // Background footer
      ctx.fillStyle = "rgba(75, 0, 130, 0.3)";
      ctx.fillRect(0, footerY, width, 100);

      // Labu-labu di footer
      drawPumpkin(150, footerY + 50, 35);
      drawPumpkin(width - 150, footerY + 50, 35);

      // Kelelawar kecil tersebar
      drawBat(250, footerY + 30, 15, Math.PI / 8);
      drawBat(width - 250, footerY + 35, 16, -Math.PI / 8);

      // Text footer
      ctx.fillStyle = "#FF6600";
      ctx.font = "bold 32px Arial";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000000";
      ctx.shadowBlur = 5;
      ctx.fillText("KKN PIASA KULON 2026", width / 2, footerY + 60);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    },
  },
];
