'use client';

import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { WALL_C_Z, WALL_C_X, WALL_HEIGHT } from './Room';
import WideFrame from './WideFrame';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

// "O projekte / Čo je GemMARK" — on the freestanding Wall C.
// Wall C runs along the Z axis at X = WALL_C_X = 0.
// It is a thin wall: size [T, WALL_H, WALL_C_LENGTH].
// The right face (+X side) faces the open room.
//
// For Html on the right face (+X facing normal):
//   rotation = [0, -Math.PI/2, 0]  → text reads correctly, not mirrored.
//
// The WideFrame is placed as a standalone group that faces +X independently.
// Its own rotation [0, -Math.PI/2, 0] makes it face the right side of the room.
// We do NOT nest the WideFrame inside a rotated parent — that would double-rotate it.

const T = 0.35;
// Right face of Wall C — faces +X (open side of room)
const FACE_X = WALL_C_X + T / 2 + 0.05;

// Rotation for HTML text on the right face (normal = +X)
const ROT_RIGHT: [number, number, number] = [0, Math.PI / 2, 0];

// The WideFrame faces +X independently — same rotation
const FRAME_ROT: [number, number, number] = [0, Math.PI / 2, 0];

// Bobbing clickable icon — orange circle below the WideFrame
function BobbingIcon() {
  const groupRef = useRef<import('three').Group>(null);
  const [hovered, setHovered] = useState(false);
  const openPanel = useGalleryStore((s) => s.openPanel);
  const { t } = useTranslation();
  const timer = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timer.current += delta * 1.8;
    // Bob up and down ~0.12 units
    groupRef.current.position.y = WALL_HEIGHT * 0.15 + Math.sin(timer.current) * 0.12;
  });

  // Icon sits below the frame, on the right face of Wall C
  // Position along Z matches the WideFrame centre (WALL_C_Z)
  // The icon group is rotated to face +X so its local Z points outward
  return (
    <group
      ref={groupRef}
      position={[FACE_X + 0.04, WALL_HEIGHT * 0.15, WALL_C_Z]}
      rotation={ROT_RIGHT}
      onClick={(e) => {
        e.stopPropagation();
        openPanel({
          type: 'info',
          id: 'o-projekte',
          title: t.sections['o-projekte'],
          description: t.coJeGemmarkDesc,
          image: '/images/branding/gemmark-logo-new.png',
        });
      }}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'grab'; }}
    >
      {/* Outer ring */}
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.28, 0.38, 32]} />
        <meshStandardMaterial color={hovered ? '#ff8800' : '#ff6600'} />
      </mesh>
      {/* Filled circle */}
      <mesh position={[0, 0, 0.005]}>
        <circleGeometry args={[0.26, 32]} />
        <meshStandardMaterial color={hovered ? '#ff8800' : '#ff6600'} />
      </mesh>
      {/* "i" label */}
      <Html center position={[0, 0, 0.04]} style={{ pointerEvents: 'none' }}>
        <span style={{
          color: '#fff',
          fontSize: '14px',
          fontWeight: '700',
          fontFamily: 'Arial, sans-serif',
          userSelect: 'none',
        }}>
          i
        </span>
      </Html>
    </group>
  );
}

export default function WallOProjekte() {
  const { t } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);

  return (
    <group>
      {/* ── RIGHT FACE (+X): "O Projekte" section label ─────────────────── */}
      <Html
        position={[FACE_X, WALL_HEIGHT * 0.9, WALL_C_Z - 1.5]}
        rotation={ROT_RIGHT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          color: '#1a1a1a',
          fontSize: '18px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textAlign: 'center',
          maxWidth: '180px',
          lineHeight: 1.3,
        }}>
          {t.sections['o-projekte']}
        </div>
      </Html>

      {/* Main WideFrame — faces +X independently (no wrapping rotated parent) */}
      <WideFrame
        position={[FACE_X + 0.06, WALL_HEIGHT * 0.52, WALL_C_Z]}
        rotation={FRAME_ROT}
        size={[7, 4.5]}
        image="/images/branding/gemmark-logo-new.png"
        label={t.sections['o-projekte']}
        onClickOverride={() =>
          openPanel({
            type: 'info',
            id: 'o-projekte',
            title: t.sections['o-projekte'],
            description: t.coJeGemmarkDesc,
            image: '/images/branding/gemmark-logo-new.png',
          })
        }
      />

      {/* Bobbing orange icon below the frame — opens the same panel */}
      <BobbingIcon />
    </group>
  );
}
