'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import DirectoryMenu from '@/components/ui/DirectoryMenu';
import DetailPanel from '@/components/ui/DetailPanel';
import FullPageOverlay from '@/components/ui/FullPageOverlay';

const Scene = dynamic(() => import('@/components/gallery/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#2d2d2d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      Načítavam...
    </div>
  ),
});

// Fix R3F canvas resize issue - poll until canvas is found and resize it
function useCanvasResizeFix() {
  useEffect(() => {
    let rafId: number | undefined;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const fixCanvas = () => {
      const canvas = document.querySelector('canvas');
      if (canvas && canvas.width < window.innerWidth / 2) {
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        // Trigger window resize to let R3F pick it up
        window.dispatchEvent(new Event('resize'));
      }
    };

    // Poll for canvas every 100ms for the first 5 seconds
    const interval = setInterval(fixCanvas, 100);
    resizeTimeout = setTimeout(() => clearInterval(interval), 5000);

    // Also fix on window resize
    const onResize = () => fixCanvas();
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(interval);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, []);
}

export default function Home() {
  useCanvasResizeFix();

  return (
    <>
      <Scene />
      <Navbar />
      <DirectoryMenu />
      <DetailPanel />
      <FullPageOverlay />
      <LoadingScreen />
    </>
  );
}
