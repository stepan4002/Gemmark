'use client';

import { Html } from '@react-three/drei';
import WideFrame from './WideFrame';
import { WALL_B_Z, WALL_B_LEFT_X, WALL_B_RIGHT_X, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';
import { useGalleryStore } from '@/store/useGalleryStore';

// "Ako to funguje?" — Wall B LEFT half (WALL_B_LEFT_X).
// "Ako sa s nami spojíš?" — Wall B RIGHT half (WALL_B_RIGHT_X).
// Both face toward the entrance (+Z direction).

const T = 0.35;

// Wall B front face — faces toward entrance (+Z)
const FACE_Z_B = WALL_B_Z + T / 2 + 0.05;

const WALL_ROT: [number, number, number] = [0, 0, 0]; // both face +Z

export default function WallHowItWorks() {
  const { t } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);

  return (
    <group>
      {/* ── WALL B LEFT: "Ako to funguje?" — process infographic ──────────── */}
      <Html
        position={[WALL_B_LEFT_X, WALL_HEIGHT * 0.92, FACE_Z_B]}
        rotation={WALL_ROT}
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
          {t.sections['ako-to-funguje']}
        </div>
      </Html>

      <WideFrame
        position={[WALL_B_LEFT_X, WALL_HEIGHT * 0.52, FACE_Z_B + 0.1]}
        rotation={WALL_ROT}
        size={[4.5, 3.5]}
        image="/images/services/consultation.jpg"
        label={t.sections['ako-to-funguje']}
        onClickOverride={() =>
          openPanel({
            type: 'info',
            id: 'ako-to-funguje',
            title: t.sections['ako-to-funguje'],
            description: t.akoToFungujeDesc,
            image: '/images/services/consultation.jpg',
          })
        }
      />

      {/* ── WALL B RIGHT: "Ako sa s nami spojíš?" — contact ──────────────── */}
      <Html
        position={[WALL_B_RIGHT_X, WALL_HEIGHT * 0.92, FACE_Z_B]}
        rotation={WALL_ROT}
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
          {t.sections['ako-sa-spojis']}
        </div>
      </Html>

      <WideFrame
        position={[WALL_B_RIGHT_X, WALL_HEIGHT * 0.52, FACE_Z_B + 0.1]}
        rotation={WALL_ROT}
        size={[6.0, 3.5]}
        image="/images/branding/gemmark-icon.jpg"
        label={t.sections['ako-sa-spojis']}
        panelData={{
          type: 'info',
          id: 'ako-sa-spojis',
          title: t.sections['ako-sa-spojis'],
          description: t.akoSaSNamiSpojisDesc,
          image: '/images/branding/gemmark-icon.jpg',
        }}
      />
    </group>
  );
}
