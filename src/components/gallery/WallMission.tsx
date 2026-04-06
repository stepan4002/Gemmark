'use client';

import { useRef, useState } from 'react';
import { Html, Edges } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

// "Aká je naša misia?" — now placed FLAT ON THE FLOOR in the back room.
// Centred at approximately X=0, Z=-22 (behind Wall B, in the back section).
// The frame and text lie flat (rotation=[-Math.PI/2, 0, 0]).
// A floating/bobbing animation makes it eye-catching from above.

const FLOOR_X = 0;
const FLOOR_Z = -22;
const FRAME_W = 10;
const FRAME_H = 6;
const BORDER = 0.2;
const BASE_Y = 0.05; // slightly above floor

export default function WallMission() {
  const { t } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const timer = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timer.current += delta * 1.2;
    // Gentle floating bob: ±0.08 units above floor
    const bob = Math.sin(timer.current) * 0.08;
    const targetY = BASE_Y + bob;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.06,
    );
  });

  const missionWords = t.tvorimeObrazGemera.replace('.', '').split(' ');
  const lastWord = missionWords[missionWords.length - 1];
  const firstWords = missionWords.slice(0, -1);

  const fw = FRAME_W + BORDER * 2;
  const fh = FRAME_H + BORDER * 2;

  return (
    <group>
      {/* Animated floating group — lies flat on the floor */}
      <group
        ref={groupRef}
        position={[FLOOR_X, BASE_Y, FLOOR_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {/* Frame border — flat on floor */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[fw, fh, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
          <Edges color="#1a1a1a" threshold={1} />
        </mesh>

        {/* Inner panel */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[FRAME_W, FRAME_H]} />
          <meshStandardMaterial
            color={hovered ? '#f5f5f5' : '#ffffff'}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Invisible click plane */}
        <mesh
          position={[0, 0, 0.02]}
          onPointerEnter={(e) => {
            e.stopPropagation();
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
              image: '/images/branding/gemmark-logo-new.png',
            });
          }}
        >
          <planeGeometry args={[fw, fh]} />
          <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>

        {/* Section label */}
        <Html
          center
          position={[0, 2.0, 0.04]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: '#aaaaaa',
            fontSize: '22px',
            fontWeight: '900',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textAlign: 'center',
            maxWidth: '500px',
          }}>
            {t.sections['nasa-misia']}
          </div>
        </Html>

        {/* Large display text — centred on floor frame */}
        <Html
          center
          position={[0, 0, 0.04]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: '#1a1a1a',
            lineHeight: 1.2,
            textAlign: 'center',
          }}>
            {firstWords.map((word, i) => (
              <div key={i} style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '-1px' }}>
                {word}
              </div>
            ))}
            <div style={{ fontSize: '36px', fontWeight: '700', letterSpacing: '-1px' }}>
              {lastWord}.
            </div>
          </div>
        </Html>

        {/* Click hint */}
        <Html
          center
          position={[0, -2.2, 0.04]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            color: '#999',
            fontSize: '10px',
            letterSpacing: '1px',
            textAlign: 'center',
          }}>
            {t.klikniPreViac}
          </div>
        </Html>
      </group>
    </group>
  );
}
