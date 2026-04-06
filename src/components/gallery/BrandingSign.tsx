'use client';

import { Edges, Html } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';

interface BrandingSignProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

// GemMARK branding sign — like the "Lokal Poster Co." sign
// Large panel on the left wall in the back section
export default function BrandingSign({ position, rotation = [0, 0, 0] }: BrandingSignProps) {
  const openPanel = useGalleryStore((s) => s.openPanel);
  const btnRef = useRef<THREE.Group>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  // Gentle bobbing animation for the CTA icon
  useFrame((state) => {
    if (btnRef.current) {
      btnRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
    }
  });

  const SIGN_W = 10;
  const SIGN_H = 5.5;

  return (
    <group position={position} rotation={rotation}>
      {/* Sign backing panel */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[SIGN_W, SIGN_H, 0.08]} />
        <meshStandardMaterial color="#f7f7f5" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>

      {/* ── GEMMARK LOGO ICON (4-color blocks, top-left) ── */}
      <group position={[-3.8, 1.6, 0.02]}>
        {/* 2×2 color grid */}
        {[
          { x: 0,    y: 0.3,  color: '#1B2432' },  // top-left: navy
          { x: 0.55, y: 0.3,  color: '#D95B2B' },  // top-right: orange-red
          { x: 0,    y: -0.3, color: '#9A9A8E' },  // bottom-left: gray
          { x: 0.55, y: -0.3, color: '#F5A623' },  // bottom-right: yellow
        ].map((block, i) => (
          <mesh key={`block-${i}`} position={[block.x, block.y, 0]}>
            <boxGeometry args={[0.48, 0.48, 0.04]} />
            <meshStandardMaterial color={block.color} />
          </mesh>
        ))}
      </group>

      {/* ── BRAND NAME — painted on sign surface ── */}
      <Html
        position={[-2.6, 1.5, 0.05]}
        transform

        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: '#1a1a1a',
          whiteSpace: 'nowrap',
        }}>
          <div style={{ fontSize: '40px', fontWeight: '300', letterSpacing: '-1px', lineHeight: 1 }}>
            Gem<span style={{ fontWeight: '700' }}>MARK</span>
          </div>
          <div style={{
            fontSize: '7px',
            letterSpacing: '4px',
            color: '#888',
            marginTop: '4px',
            textTransform: 'uppercase',
          }}>
            Student Media Lab
          </div>
        </div>
      </Html>

      {/* ── TAGLINE — painted on sign surface ── */}
      <Html
        position={[-3.8, 0.3, 0.05]}
        transform

        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: '#444',
          fontSize: '8px',
          lineHeight: 1.6,
          maxWidth: '280px',
        }}>
          Vitajte v našom showroome. Preskúmajte naše portfólio,<br />
          zoznámte sa s tímom a zistite, ako vám môžeme pomôcť.
        </div>
      </Html>

      {/* ── DIVIDER LINE ── */}
      <mesh position={[0, -0.5, 0.04]}>
        <boxGeometry args={[SIGN_W - 1.0, 0.015, 0.01]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* ── THREE COLUMN TEXT — painted on sign surface ── */}
      <Html
        position={[-4.4, -1.0, 0.05]}
        transform

        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          display: 'flex',
          gap: '16px',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          maxWidth: '360px',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '7px', fontWeight: '700', color: '#1a1a1a', marginBottom: '3px' }}>
              Portfólio
            </div>
            <div style={{ fontSize: '6px', color: '#555', lineHeight: 1.55 }}>
              Pozrite si naše realizované projekty a zistite, pre koho sme už tvorili.
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '7px', fontWeight: '700', color: '#1a1a1a', marginBottom: '3px' }}>
              Naše Služby
            </div>
            <div style={{ fontSize: '6px', color: '#555', lineHeight: 1.55 }}>
              Od grafiky cez foto a video až po sociálne siete a podcasty.
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '7px', fontWeight: '700', color: '#1a1a1a', marginBottom: '3px' }}>
              Kontakt
            </div>
            <div style={{ fontSize: '6px', color: '#555', lineHeight: 1.55 }}>
              Klikni na ikonu a zisti, ako sa s nami spojiť pre tvoj projekt.
            </div>
          </div>
        </div>
      </Html>

      {/* ── CTA ICON BUTTON (bottom-left, bobbing) ── */}
      <group ref={btnRef} position={[-4.2, -2.2, 0.04]}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            openPanel({
              type: 'info',
              id: 'o-projekte',
              title: 'Čo je GemMARK?',
              description: 'GemMARK je miesto, kde sa mladí ľudia učia marketing praxou a zároveň pomáhajú regiónu, aby o ňom bolo viac vidieť a počuť.\n\nGemMARK – Student Media Lab je regionálne, komunitné, kreatívne a vzdelávacie centrum zamerané na prepájanie potrieb regiónu Gemer v oblasti marketingu, médií a prezentácie s prirodzeným záujmom mladých ľudí o kreativitu, digitálnu tvorbu, fotografiu, video, hovorené slovo, sociálne siete a moderné komunikačné nástroje.',
              image: '/images/branding/gemmark-badge.jpg',
            });
          }}
          onPointerEnter={() => { setBtnHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerLeave={() => { setBtnHovered(false); document.body.style.cursor = 'grab'; }}
        >
          <circleGeometry args={[0.38, 32]} />
          <meshStandardMaterial
            color={btnHovered ? '#F5A623' : '#D95B2B'}
            emissive={btnHovered ? '#F5A623' : '#D95B2B'}
            emissiveIntensity={btnHovered ? 0.4 : 0.15}
          />
        </mesh>
        {/* Arrow icon inside button */}
        <Html
          center
          position={[0, 0, 0.02]}
          transform
  
          style={{ pointerEvents: 'none' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 7H11M11 7L7 3M11 7L7 11"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Html>
      </group>

      {/* ── REGION TAG — painted on sign surface ── */}
      <Html
        position={[-1.5, -2.25, 0.05]}
        transform

        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          fontSize: '7px',
          color: '#888',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}>
          Gemer, Slovensko
        </span>
      </Html>
    </group>
  );
}
