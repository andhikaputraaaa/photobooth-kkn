export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  overlay: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export interface PhotoData {
  image: string | null;
  template: Template | null;
}