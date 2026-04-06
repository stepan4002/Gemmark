import { create } from 'zustand';

export type PanelType = 'portfolio' | 'service' | 'info' | null;

export interface PanelData {
  type: PanelType;
  id: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  deliverables?: string[];
  location?: string;
}

export interface FullPageOverlayData {
  id: string;
  title: string;
  content: string;
}

interface CameraTarget {
  x: number;
  y: number;
}

interface GalleryState {
  // Loading
  isLoaded: boolean;
  setLoaded: () => void;

  // Panel
  activePanel: PanelData | null;
  openPanel: (data: PanelData) => void;
  closePanel: () => void;

  // Full-page overlay
  fullPageOverlay: FullPageOverlayData | null;
  openFullPageOverlay: (data: FullPageOverlayData) => void;
  closeFullPageOverlay: () => void;

  // Directory
  isDirectoryOpen: boolean;
  toggleDirectory: () => void;
  closeDirectory: () => void;

  // Camera
  cameraTarget: CameraTarget | null;
  setCameraTarget: (target: CameraTarget) => void;
  clearCameraTarget: () => void;

  // Camera reset
  shouldResetCamera: boolean;
  resetCamera: () => void;
  clearResetCamera: () => void;

  // Hover label
  hoveredFrame: string | null;
  setHoveredFrame: (id: string | null) => void;

  // Language
  language: 'sk' | 'hu';
  setLanguage: (lang: 'sk' | 'hu') => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),

  activePanel: null,
  openPanel: (data) => set({ activePanel: data }),
  closePanel: () => set({ activePanel: null }),

  fullPageOverlay: null,
  openFullPageOverlay: (data) => set({ fullPageOverlay: data }),
  closeFullPageOverlay: () => set({ fullPageOverlay: null }),

  isDirectoryOpen: false,
  toggleDirectory: () => set((s) => ({ isDirectoryOpen: !s.isDirectoryOpen })),
  closeDirectory: () => set({ isDirectoryOpen: false }),

  cameraTarget: null,
  setCameraTarget: (target) => set({ cameraTarget: target, isDirectoryOpen: false }),
  clearCameraTarget: () => set({ cameraTarget: null }),

  shouldResetCamera: false,
  resetCamera: () => set({ shouldResetCamera: true, activePanel: null, isDirectoryOpen: false }),
  clearResetCamera: () => set({ shouldResetCamera: false }),

  hoveredFrame: null,
  setHoveredFrame: (id) => set({ hoveredFrame: id }),

  language: (typeof window !== 'undefined' && (localStorage.getItem('gemmark-lang') as 'sk' | 'hu')) || 'sk',
  setLanguage: (lang) => {
    if (typeof window !== 'undefined') localStorage.setItem('gemmark-lang', lang);
    set({ language: lang });
  },
}));
