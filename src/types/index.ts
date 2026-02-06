export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  overlay: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    images: string[],
    loadedImages?: HTMLImageElement[],
  ) => void;
}

export interface PhotoData {
  images: (string | null)[]; // Array of 3 photos
  template: Template | null;
}
