'use client';

import { useState } from 'react';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';
import GemmarkIcon from '../icons/GemmarkIcon';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const setLoaded = useGalleryStore((s) => s.setLoaded);
  const { t } = useTranslation();

  const handleEnter = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      setLoaded();
    }, 500);
  };

  if (!visible) return null;

  const instructions = [
    { icon: '↔', text: t.instruction1 },
    { icon: '⊙', text: t.instruction2 },
    { icon: '◻', text: t.instruction3 },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(20, 20, 20, 0.92)',
        backdropFilter: 'blur(12px)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '24px' }}>
        <GemmarkIcon size={52} />
      </div>

      {/* Brand name */}
      <h1 style={{
        fontSize: '38px',
        fontWeight: '300',
        color: '#fff',
        marginBottom: '6px',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        letterSpacing: '4px',
        textTransform: 'uppercase',
      }}>
        Gem<span style={{ fontWeight: '700' }}>MARK</span>
      </h1>

      <p style={{
        fontSize: '10px',
        color: 'rgba(255,255,255,0.4)',
        marginBottom: '40px',
        letterSpacing: '4px',
        textTransform: 'uppercase',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}>
        {t.brandTagline}
      </p>

      {/* Instructions */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '40px',
        alignItems: 'center',
      }}>
        {instructions.map(({ icon, text }) => (
          <div
            key={text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.65)',
              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            <span style={{ fontSize: '16px', opacity: 0.7 }}>{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        style={{
          padding: '13px 40px',
          border: '1px solid rgba(255,255,255,0.3)',
          background: 'transparent',
          color: '#fff',
          fontSize: '12px',
          cursor: 'pointer',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '3px',
          textTransform: 'uppercase',
          transition: 'all 0.2s',
          borderRadius: '2px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        }}
      >
        {t.enterButton}
      </button>
    </div>
  );
}
