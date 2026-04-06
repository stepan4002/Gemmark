'use client';

import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';
import { sections } from '@/data/sections';
import GemmarkIcon from '../icons/GemmarkIcon';

export default function DirectoryMenu() {
  const isOpen = useGalleryStore((s) => s.isDirectoryOpen);
  const closeDirectory = useGalleryStore((s) => s.closeDirectory);
  const setCameraTarget = useGalleryStore((s) => s.setCameraTarget);
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleSection = (target: { x: number; y: number }) => {
    setCameraTarget(target);
    closeDirectory();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(10, 10, 10, 0.94)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 48px 48px',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '22px',
        left: '22px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <GemmarkIcon size={24} />
        <span style={{
          fontSize: '11px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}>
          GemMARK
        </span>
      </div>

      {/* Close button */}
      <button
        onClick={closeDirectory}
        aria-label="Close directory"
        style={{
          position: 'absolute',
          top: '22px',
          right: '22px',
          width: '40px',
          height: '40px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Label */}
      <p style={{
        fontSize: '10px',
        color: 'rgba(255,255,255,0.3)',
        marginBottom: '28px',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        letterSpacing: '3px',
        textTransform: 'uppercase',
      }}>
        {t.navLabel}
      </p>

      {/* Section list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sections.map((section, i) => {
          // Use translated section label when available, fall back to menuLabel
          const label = t.sections[section.id as keyof typeof t.sections] ?? section.menuLabel;

          return (
            <button
              key={section.id}
              onClick={() => handleSection(section.cameraTarget)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: 'clamp(22px, 3.5vw, 46px)',
                fontWeight: '300',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                padding: '3px 0',
                transition: 'opacity 0.15s, transform 0.15s',
                lineHeight: 1.2,
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.transform = 'translateX(6px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span style={{
                fontSize: 'clamp(9px, 1vw, 12px)',
                color: 'rgba(255,255,255,0.3)',
                fontWeight: '400',
                letterSpacing: '1px',
                alignSelf: 'center',
                minWidth: '24px',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {label}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '32px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.2)',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        letterSpacing: '2px',
      }}>
        {t.footerLabel}
      </div>
    </div>
  );
}
