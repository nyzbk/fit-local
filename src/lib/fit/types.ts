export type Mode = "fill" | "fit" | "stretch";
export type OutputChoice = "keep" | "image/jpeg" | "image/png" | "image/webp";
export type OutputType = "image/jpeg" | "image/png" | "image/webp";
export type PadColor = "#000000" | "#ffffff";

export type Preset = {
  id: string;
  label: string;
  width: number;
  height: number;
};

export type AspectShortcut = {
  id: string;
  label: string;
  ratio: [number, number] | "original";
};

export type FitItem = {
  id: string;
  file: File;
  preview: string;
  origW?: number;
  origH?: number;
  error?: string;
  warn?: string;
  progress: number;
  result?: FitResult;
};

export type FitResult = {
  blob: Blob;
  url: string;
  filename: string;
  width: number;
  height: number;
  originalSize: number;
  newSize: number;
  origW: number;
  origH: number;
  upscaled: boolean;
};

export type ResizeOptions = {
  width: number;
  height: number;
  mode: Mode;
  pad: PadColor;
  output: OutputChoice;
  quality: number;
};
