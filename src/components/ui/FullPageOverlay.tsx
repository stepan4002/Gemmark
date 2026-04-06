'use client';

import { useEffect, useState } from 'react';
import { useGalleryStore } from '@/store/useGalleryStore';

export default function FullPageOverlay() {
  const fullPageOverlay = useGalleryStore((s) => s.fullPageOverlay);
  const closeFullPageOverlay = useGalleryStore((s) => s.closeFullPageOverlay);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (fullPageOverlay) {
      setMounted(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 380);
      return () => clearTimeout(timer);
    }
  }, [fullPageOverlay]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeFullPageOverlay();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeFullPageOverlay]);

  if (!mounted) return null;

  const paragraphs = fullPageOverlay?.content.split('\n\n') ?? [];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#fff',
        overflowY: 'auto',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {/* Close button */}
      <button
        onClick={closeFullPageOverlay}
        aria-label="Close overlay"
        style={{
          position: 'fixed',
          top: '20px',
          right: '24px',
          zIndex: 110,
          width: '40px',
          height: '40px',
          background: '#f0f0f0',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.15s, transform 0.15s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#e0e0e0';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#f0f0f0';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2L12 12M12 2L2 12" stroke="#333" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '64px 40px 80px',
        }}
      >
        {/* GemMARK icon at top */}
        <div style={{ marginBottom: '32px' }}>
          <img
            src="/images/branding/gemmark-icon.jpg"
            alt="GemMARK"
            style={{
              width: '56px',
              height: '56px',
              objectFit: 'cover',
              borderRadius: '4px',
              display: 'block',
            }}
          />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            fontWeight: '300',
            color: '#1a1a1a',
            letterSpacing: '-1px',
            lineHeight: 1.1,
            marginBottom: '48px',
            maxWidth: '800px',
          }}
        >
          {fullPageOverlay?.title}
        </h1>

        {/* Divider */}
        <div
          style={{
            width: '48px',
            height: '2px',
            background: '#ff6600',
            marginBottom: '48px',
          }}
        />

        {/* Multi-column body text */}
        <div
          style={{
            columns: 'clamp(280px, 30vw, 320px)',
            columnGap: '40px',
            columnRule: '1px solid #eee',
          }}
        >
          {paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: '15px',
                lineHeight: 1.9,
                color: '#444',
                marginBottom: '20px',
                breakInside: 'avoid',
                whiteSpace: 'pre-line',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '64px',
            paddingTop: '20px',
            borderTop: '1px solid #eee',
            fontSize: '10px',
            color: '#aaa',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          GEMMARK · STUDENT MEDIA LAB · GEMER, SK
        </div>
      </div>
    </div>
  );
}
