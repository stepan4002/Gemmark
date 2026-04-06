'use client';

import { use, useEffect, useRef, useState, useCallback } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { projectDetails } from '@/data/projectDetails';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

const brandColors = {
  navy: '#1B2432',
  gray: '#9A9A8E',
  orange: '#D95B2B',
  yellow: '#F5A623',
};

export default function ProjektPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectDetails[id];

  const language = useGalleryStore((s) => s.language);
  const setLanguage = useGalleryStore((s) => s.setLanguage);
  const { t } = useTranslation();

  // Hydrate language from localStorage on mount (in case store initialised before
  // localStorage was read, e.g. SSR / hydration mismatch)
  const [mounted, setMounted] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gemmark-lang') as 'sk' | 'hu' | null;
      if (saved && saved !== language) {
        setLanguage(saved);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) {
    notFound();
  }

  const desc = language === 'hu' ? project.descriptionHu : project.description;
  const fullDesc = language === 'hu' ? project.fullDescriptionHu : project.fullDescription;
  const loc = language === 'hu' ? project.locationHu : project.location;
  const clientType = language === 'hu' ? project.clientTypeHu : project.clientType;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        color: '#1a1a1a',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      {/* Hero section */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(320px, 55vh, 600px)',
          background: brandColors.navy,
          overflow: 'hidden',
        }}
      >
        {/* Hero image */}
        <img
          src={project.heroImage}
          alt={project.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.35,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 30%, ${brandColors.navy} 100%)`,
          }}
        />

        {/* Back button */}
        <div style={{ position: 'absolute', top: '24px', left: '24px', zIndex: 10 }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '8px 14px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {mounted ? t.spatDoGalerie : '← Späť do galérie'}
          </Link>
        </div>

        {/* Top-right: GemMARK brand mark + language switcher */}
        <div
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {/* Language switcher */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['sk', 'hu'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: language === lang ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: language === lang ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: '1px solid',
                  borderColor: language === lang ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Brand mark */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            Gem<span style={{ color: brandColors.orange }}>MARK</span>
          </div>
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            right: '40px',
            zIndex: 5,
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: brandColors.orange,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {mounted ? clientType : project.clientType}
          </p>
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 68px)',
              fontWeight: '300',
              color: '#fff',
              letterSpacing: '-1px',
              lineHeight: 1.05,
              marginBottom: '12px',
            }}
          >
            {project.name}
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.5px',
            }}
          >
            {mounted ? loc : project.location}
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        {/* Project info section */}
        <section style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: '1px solid #eee' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'clamp(200px, 60%, 580px) 1fr',
              gap: '48px',
              alignItems: 'start',
            }}
          >
            {/* Left: full description */}
            <div>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: brandColors.gray,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                {mounted ? t.oProjekteLabel : 'O projekte'}
              </p>
              <p
                style={{
                  fontSize: '16px',
                  lineHeight: 1.85,
                  color: '#444',
                  whiteSpace: 'pre-line',
                }}
              >
                {mounted ? fullDesc : project.fullDescription}
              </p>
            </div>

            {/* Right: meta */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#aaa',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {mounted ? t.lokalita : 'Lokalita'}
                </p>
                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{mounted ? loc : project.location}</p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#aaa',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {mounted ? t.typKlienta : 'Typ klienta'}
                </p>
                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{mounted ? clientType : project.clientType}</p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: '#aaa',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {mounted ? t.rok : 'Rok'}
                </p>
                <p style={{ fontSize: '14px', color: '#1a1a1a' }}>{project.year}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables section */}
        <section style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: '1px solid #eee' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: '700',
              color: brandColors.gray,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '32px',
            }}
          >
            {mounted ? t.deliverables : 'Čo sme vytvorili'}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            {project.deliverables.map((d) => (
              <div
                key={d.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8',
                  background: '#fafafa',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#1a1a1a',
                }}
              >
                <span style={{ fontSize: '18px' }}>{d.icon}</span>
                {mounted ? (language === 'hu' ? d.nameHu : d.name) : d.name}
              </div>
            ))}
          </div>
        </section>

        {/* Gallery — categorized sections */}
        {project.gallery.length > 0 && (
          <section style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: '1px solid #eee' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: brandColors.gray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '40px',
              }}
            >
              {mounted ? t.galeria : 'Galéria'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {project.gallery.map((cat) => (
                <div key={cat.category}>
                  <h3
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#1a1a1a',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '16px',
                    }}
                  >
                    {mounted ? (language === 'hu' ? cat.categoryHu : cat.category) : cat.category}
                  </h3>
                  <div style={{ position: 'relative' }}>
                    <div
                      className={`carousel-${cat.category}`}
                      style={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        gap: '16px',
                        paddingBottom: '12px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#ddd transparent',
                        scrollBehavior: 'smooth',
                      }}
                    >
                      {cat.images.map((img) => (
                        <div
                          key={img}
                          onClick={() => { setLightboxImg(img); setLightboxImages(cat.images); }}
                          style={{
                            flexShrink: 0,
                            width: '80%',
                            scrollSnapAlign: 'start',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            aspectRatio: '16 / 9',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.15s',
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.01)'; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; }}
                        >
                          <img
                            src={img}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      ))}
                    </div>
                    {/* Carousel arrows */}
                    {cat.images.length > 1 && (
                      <>
                        <button
                          onClick={() => {
                            const el = document.querySelector(`.carousel-${cat.category.replace(/\s/g, '-')}`) as HTMLElement;
                            if (el) el.scrollBy({ left: -el.clientWidth * 0.82, behavior: 'smooth' });
                          }}
                          style={{
                            position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.9)', border: '1px solid #ddd',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8L10 13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => {
                            const el = document.querySelector(`.carousel-${cat.category.replace(/\s/g, '-')}`) as HTMLElement;
                            if (el) el.scrollBy({ left: el.clientWidth * 0.82, behavior: 'smooth' });
                          }}
                          style={{
                            position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)',
                            width: '40px', height: '40px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.9)', border: '1px solid #ddd',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2,
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M6 3L11 8L6 13" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Links section */}
        {project.links.length > 0 && (
          <section style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: '1px solid #eee' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: brandColors.gray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              {mounted ? t.odkazy : 'Odkazy'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${brandColors.navy}22`,
                    background: '#f8f9fb',
                    textDecoration: 'none',
                    color: brandColors.navy,
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'background 0.18s, border-color 0.18s, transform 0.18s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = brandColors.navy;
                    el.style.color = '#fff';
                    el.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = '#f8f9fb';
                    el.style.color = brandColors.navy;
                    el.style.transform = 'translateX(0)';
                  }}
                >
                  {link.icon && <span style={{ fontSize: '18px' }}>{link.icon}</span>}
                  <span>{mounted ? (language === 'hu' ? link.labelHu : link.label) : link.label}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{ marginLeft: 'auto' }}
                  >
                    <path
                      d="M3 7H11M11 7L7 3M11 7L7 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Technical details */}
        {project.techDetails.length > 0 && (
          <section style={{ paddingTop: '56px', paddingBottom: '56px', borderBottom: '1px solid #eee' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: brandColors.gray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              {mounted ? t.technickeDetaily : 'Technické detaily'}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '1px',
                background: '#eee',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #eee',
              }}
            >
              {project.techDetails.map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    padding: '20px 24px',
                    background: '#fff',
                  }}
                >
                  <p
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      color: '#aaa',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {mounted ? (language === 'hu' ? detail.labelHu : detail.label) : detail.label}
                  </p>
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1a1a1a' }}>
                    {mounted ? (language === 'hu' ? detail.valueHu : detail.value) : detail.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer
          style={{
            paddingTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '18px',
                fontWeight: '300',
                color: brandColors.navy,
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              Gem<span style={{ fontWeight: '700' }}>MARK</span>
            </p>
            <p
              style={{
                fontSize: '10px',
                color: brandColors.gray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              {mounted ? t.brandTagline : 'Student Media Lab · Gemer'}
            </p>
          </div>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '600',
              color: brandColors.navy,
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '10px 18px',
              borderRadius: '6px',
              border: `1px solid ${brandColors.navy}33`,
              transition: 'background 0.18s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = `${brandColors.navy}10`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
            }}
          >
            {mounted ? t.spatDoGalerie : '← Späť do galérie'}
          </Link>
        </footer>
      </div>

      {/* ── LIGHTBOX MODAL ──────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 210,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5L15 15M15 5L5 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Previous arrow */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = lightboxImages.indexOf(lightboxImg);
                const prev = idx > 0 ? idx - 1 : lightboxImages.length - 1;
                setLightboxImg(lightboxImages[prev]);
              }}
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 210,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 4L7 10L13 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Next arrow */}
          {lightboxImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = lightboxImages.indexOf(lightboxImg);
                const next = idx < lightboxImages.length - 1 ? idx + 1 : 0;
                setLightboxImg(lightboxImages[next]);
              }}
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 210,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Full-size image */}
          <img
            src={lightboxImg}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '4px',
              cursor: 'default',
            }}
          />

          {/* Image counter */}
          {lightboxImages.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: 'Arial, sans-serif',
            }}>
              {lightboxImages.indexOf(lightboxImg) + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
