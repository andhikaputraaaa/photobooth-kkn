import { Template } from '@/types';

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic KKN',
    thumbnail: '/templates/classic.png',
    overlay: (ctx, width, height) => {
      // Border putih
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 20;
      ctx.strokeRect(0, 0, width, height);
      
      // Header biru pastel
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#A8D8EA');
      gradient.addColorStop(1, '#7FC7DB');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, 80);
      
      // Teks
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('KKN 2024', width / 2, 50);
      
      // Footer
      ctx.fillStyle = '#A8D8EA';
      ctx.fillRect(0, height - 60, width, 60);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '24px Arial';
      ctx.fillText('Kenangan Terindah', width / 2, height - 25);
    },
  },
  {
    id: 'polaroid',
    name: 'Polaroid Style',
    thumbnail: '/templates/polaroid.png',
    overlay: (ctx, width, height) => {
      // Frame polaroid putih
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, height - 120, width, 120);
      
      // Shadow effect
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 5;
      
      // Teks di bagian bawah
      ctx.fillStyle = '#333333';
      ctx.font = 'italic 28px Georgia';
      ctx.textAlign = 'center';
      ctx.fillText('Moment KKN', width / 2, height - 70);
      ctx.font = '20px Arial';
      ctx.fillText(new Date().toLocaleDateString('id-ID'), width / 2, height - 35);
    },
  },
  {
    id: 'gradient',
    name: 'Gradient Dream',
    thumbnail: '/templates/gradient.png',
    overlay: (ctx, width, height) => {
      // Gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(168, 216, 234, 0.3)');
      gradient.addColorStop(1, 'rgba(127, 199, 219, 0.5)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Border rounded
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.roundRect(10, 10, width - 20, height - 20, 30);
      ctx.stroke();
      
      // Badge
      ctx.fillStyle = '#A8D8EA';
      ctx.beginPath();
      ctx.arc(width - 80, 80, 50, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('KKN', width - 80, 90);
    },
  },
];