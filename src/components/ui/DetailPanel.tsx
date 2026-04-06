'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

export default function DetailPanel() {
  const activePanel = useGalleryStore((s) => s.activePanel);
  const closePanel = useGalleryStore((s) => s.closePanel);
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animate in when panel opens, animate out before unmounting
  useEffect(() => {
    if (activePanel) {
      setMounted(true);
      // Small delay so CSS transition fires
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 340);
      return () => clearTimeout(timer);
    }
  }, [activePanel]);

  if (!mounted) return null;

  const isPortfolio = activePanel?.type === 'portfolio';

  return (
    <>
      {/* Dark backdrop */}
      <div
        onClick={closePanel}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 65,
          background: 'rgba(0,0,0,0.3)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.32s ease',
          cursor: 'default',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'clamp(320px, 40vw, 520px)',
          zIndex: 70,
          background: '#fff',
          color: '#1a1a1a',
          overflowY: 'auto',
          boxShadow: '-6px 0 40px rgba(0,0,0,0.25)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Gradient fade at top — content fades in as panel appears */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            background: 'linear-gradient(to bottom, #ffffff 40%, transparent)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Close button — sits above gradient */}
        <button
          onClick={closePanel}
          aria-label="Close panel"
          style={{
            position: 'fixed',
            top: '16px',
            right: 'clamp(336px, calc(40vw + 16px), 536px)',
            zIndex: 75,
            width: '32px',
            height: '32px',
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
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div style={{ padding: '20px 24px 60px', marginTop: '-48px' }}>
          {/* Type badge */}
          {activePanel && (
            <div style={{ marginBottom: '8px' }}>
              <span style={{
                display: 'inline-block',
                fontSize: '9px',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#888',
                borderBottom: '1px solid #ddd',
                paddingBottom: '2px',
              }}>
                {activePanel.type === 'portfolio' ? t.portfolio :
                  activePanel.type === 'service' ? t.naseSluzby : 'Info'}
              </span>
            </div>
          )}

          {/* Location metadata */}
          {activePanel?.type === 'portfolio' && activePanel.location && (
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px' }}>
              {activePanel.location}
            </p>
          )}

          {/* Title */}
          <h2 style={{
            fontSize: '32px',
            fontWeight: '300',
            color: '#1a1a1a',
            marginBottom: '6px',
            letterSpacing: '-0.5px',
            lineHeight: 1.15,
            paddingRight: '40px',
          }}>
            {activePanel?.title}
          </h2>

          {/* Deliverables (float right) */}
          {activePanel?.deliverables && activePanel.deliverables.length > 0 && (
            <div style={{
              float: 'right',
              textAlign: 'right',
              marginLeft: '16px',
              marginBottom: '8px',
            }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#1a1a1a', marginBottom: '3px' }}>
                {t.vystupy}
              </p>
              {activePanel.deliverables.map((d, i) => (
                <p key={i} style={{ fontSize: '11px', color: '#666', lineHeight: 1.55 }}>{d}</p>
              ))}
            </div>
          )}

          {/* Link — internal Link for portfolio, external <a> for others */}
          {activePanel?.link && activePanel.link !== '#' && (
            isPortfolio ? (
              <Link
                href={activePanel.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  marginBottom: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0f0f0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                {t.navstivitProjekt}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : (
              <a
                href={activePanel.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  textDecoration: 'none',
                  marginBottom: '16px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0f0f0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                {t.viacInformacii}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )
          )}

          {/* Separator between deliverables/link and image */}
          {(activePanel?.deliverables?.length || activePanel?.link) && (
            <div style={{ clear: 'both', borderTop: '1px solid #eee', marginBottom: '20px' }} />
          )}

          {!activePanel?.deliverables?.length && !activePanel?.link && (
            <div style={{ clear: 'both' }} />
          )}

          {/* Image — contain for people/logos, cover for everything else */}
          {activePanel?.image && (
            <div style={{
              marginBottom: '24px',
              marginTop: '4px',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: '320px',
            }}>
              <img
                src={activePanel.image}
                alt={activePanel.title}
                style={{
                  width: '100%',
                  maxHeight: '320px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {/* Description */}
          {activePanel?.description && (
            <p style={{
              fontSize: '14px',
              lineHeight: 1.85,
              color: '#444',
              whiteSpace: 'pre-line',
            }}>
              {activePanel.description}
            </p>
          )}

          {/* Footer divider */}
          <div style={{
            borderTop: '1px solid #eee',
            marginTop: '32px',
            paddingTop: '16px',
            paddingBottom: '16px',
            fontSize: '10px',
            color: '#aaa',
            letterSpacing: '1px',
          }}>
            GEMMARK · STUDENT MEDIA LAB · GEMER, SK
          </div>
        </div>
      </div>
    </>
  );
}
