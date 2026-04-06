'use client';

import { useRef, useState } from 'react';
import { Html, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';
import { HOW_WALL_LEFT_X, HOW_WALL_Z, WALL_HEIGHT } from './Room';

// "Aká je naša misia?" — now mounted on the HOW_WALL left segment (where Ako to funguje was).
// HOW_WALL_Z = -16. Front face at Z ≈ HOW_WALL_Z + T/2 + 0.01.
// Left segment centre X = HOW_WALL_LEFT_X = -7.

const T = 0.35;
// Front face of HOW_WALL — the side facing toward the entrance (positive Z)
const FACE_Z = HOW_WALL_Z + T / 2 + 0.01;
const WALL_ROT: [number, number, number] = [0, 0, 0]; // faces +Z, no rotation needed

export default function WallMission() {
  const { t } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const baseY = WALL_HEIGHT * 0.5;
    const targetY = hovered ? baseY + 0.15 : baseY;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1,
    );
  });

  const missionWords = t.tvorimeObrazGemera.replace('.', '').split(' ');
  const lastWord = missionWords[missionWords.length - 1];
  const firstWords = missionWords.slice(0, -1);

  // Frame is ~4 units wide centred on HOW_WALL_LEFT_X
  const frameW = 4.2;
  const frameH = 4.4;
  const textOffX = -frameW / 2 + 0.4;

  return (
    <group>
      {/* Section label — fixed on wall, does NOT move with hover */}
      <Html
        position={[HOW_WALL_LEFT_X, WALL_HEIGHT * 0.88, FACE_Z + 0.12]}
        rotation={WALL_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#1a1a1a',
          fontSize: '18px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {t.sections['nasa-misia']}
        </span>
      </Html>

      {/* Animated group — frame + content moves on hover */}
      <group
        ref={groupRef}
        position={[HOW_WALL_LEFT_X, WALL_HEIGHT * 0.5, FACE_Z + 0.1]}
      >
        {/* Visible frame border */}
        <mesh>
          <boxGeometry args={[frameW, frameH, 0.06]} />
          <meshStandardMaterial color="#ffffff" />
          <Edges color="#1a1a1a" threshold={1} />
        </mesh>

        {/* Invisible clickable plane */}
        <mesh
          onPointerEnter={() => {
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={() => {
            setHovered(false);
            document.body.style.cursor = 'grab';
          }}
          onClick={(e) => {
            e.stopPropagation();
            openPanel({
              type: 'info',
              id: 'nasa-misia',
              title: t.sections['nasa-misia'],
              description: t.nasaMisiaDesc,
              image: '/images/branding/gemmark-logo.jpg',
            });
          }}
        >
          <planeGeometry args={[frameW, frameH]} />
          <meshStandardMaterial
            color={hovered ? '#f5f5f5' : '#ffffff'}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Large display text — centered inside frame */}
        <Html
          center
          position={[0, 0.6, 0.02]}
          rotation={WALL_ROT}
          transform
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: '#1a1a1a',
            lineHeight: 1.15,
            textAlign: 'center',
          }}>
            {firstWords.map((word, i) => (
              <div key={i} style={{ fontSize: '16px', fontWeight: '300', letterSpacing: '-0.5px' }}>
                {word}
              </div>
            ))}
            <div style={{ fontSize: '16px', fontWeight: '700', letterSpacing: '-0.5px' }}>
              {lastWord}.
            </div>
          </div>
        </Html>

        {/* Short tagline — centered inside frame */}
        <Html
          center
          position={[0, -1.4, 0.02]}
          rotation={WALL_ROT}
          transform
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: '#666',
            fontSize: '7px',
            lineHeight: 1.7,
            textAlign: 'center',
          }}>
            {t.klikniPreViac}
          </div>
        </Html>
      </group>
    </group>
  );
}
