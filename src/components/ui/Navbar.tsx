'use client';

import { useGalleryStore } from '@/store/useGalleryStore';
import GemmarkIcon from '../icons/GemmarkIcon';

export default function Navbar() {
  const toggleDirectory = useGalleryStore((s) => s.toggleDirectory);
  const isDirectoryOpen = useGalleryStore((s) => s.isDirectoryOpen);
  const resetCamera = useGalleryStore((s) => s.resetCamera);
  const language = useGalleryStore((s) => s.language);
  const setLanguage = useGalleryStore((s) => s.setLanguage);

  return (
    <nav
      style={{
        position: 'fixed',
        top: '18px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(20, 20, 20, 0.88)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '6px',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Menu toggle: GemMARK 4-color icon normally, X when open */}
      <button
        onClick={toggleDirectory}
        aria-label={isDirectoryOpen ? 'Close menu' : 'Open menu'}
        style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDirectoryOpen ? 'rgba(255,255,255,0.12)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background 0.18s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isDirectoryOpen
            ? 'rgba(255,255,255,0.12)'
            : 'transparent';
        }}
      >
        {isDirectoryOpen ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <GemmarkIcon size={22} />
        )}
      </button>

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Brand label — clickable to reset camera */}
      <button
        onClick={resetCamera}
        aria-label="Go to home view"
        style={{
          padding: '0 12px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background 0.18s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '2px',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          GemMARK
        </span>
      </button>

      {/* Divider */}
      <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Language switcher */}
      <button
        onClick={() => setLanguage(language === 'sk' ? 'hu' : language === 'hu' ? 'en' : 'sk')}
        aria-label={`Switch to ${language === 'sk' ? 'Hungarian' : language === 'hu' ? 'English' : 'Slovak'}`}
        style={{
          padding: '0 12px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '8px',
          transition: 'background 0.18s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{
          fontSize: '11px',
          fontWeight: '600',
          color: 'rgba(255,255,255,0.7)',
          letterSpacing: '1px',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          {language.toUpperCase()}
        </span>
      </button>
    </nav>
  );
}
