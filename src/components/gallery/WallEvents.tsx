'use client';

import { Html } from '@react-three/drei';
import WideFrame from './WideFrame';
import { CONNECT_WALL_A_X, CONNECT_WALL_A_Z_START, CONNECT_WALL_A_LENGTH, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';

// "Čo, kedy a kde sa u nás deje?" — on the CONNECTING WALL
// The connecting wall runs along Z from WALL_A_Z (12) FORWARD to Z=20.
// It's at X = CONNECT_WALL_A_X = -4.
// Content on the +X face (facing the open room / camera).

const T = 0.35;
// +X face of the connecting wall
const FACE_X = CONNECT_WALL_A_X + T / 2 + 0.05;
// Center Z of the connecting wall
const CENTER_Z = CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH / 2; // = 12 + 4 = 16

// Rotation for +X face content
const FACE_ROT: [number, number, number] = [0, Math.PI / 2, 0];

export default function WallEvents() {
  const { t } = useTranslation();

  return (
    <group>
      {/* Section label */}
      <Html
        position={[FACE_X, WALL_HEIGHT * 0.9, CENTER_Z]}
        rotation={FACE_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <div style={{
          color: '#1a1a1a',
          fontSize: '28px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.3,
          maxWidth: '400px',
        }}>
          {t.sections['co-kedy-kde']}
        </div>
      </Html>

      {/* WideFrame on +X face */}
      <WideFrame
        position={[FACE_X + 0.06, WALL_HEIGHT * 0.52, CENTER_Z]}
        rotation={FACE_ROT}
        size={[5.5, 4.0]}
        image="/images/branding/conference.jpg"
        label={t.sections['co-kedy-kde']}
        panelData={{
          type: 'info',
          id: 'co-kedy-kde',
          title: t.sections['co-kedy-kde'],
          description: t.coKedyAKdeDesc,
          image: '/images/branding/conference.jpg',
        }}
      />
    </group>
  );
}
