'use client';

import { Html } from '@react-three/drei';
import WideFrame from './WideFrame';
import { WALL_HEIGHT, ROOM_W } from './Room';
import { useTranslation } from '@/hooks/useTranslation';

// Back wall (Z = -ROOM_DEPTH/2 = -30) — the "Prečo GemMARK?" frame has been
// removed to avoid duplication with the left wall "Prečo názov GemMARK?" section.
//
// Only the LEFT WALL "Prečo názov GemMARK?" wide frame remains here,
// facing +X into the room, positioned in the back-left area.

const FRAME_Y = WALL_HEIGHT * 0.52;

// Left wall frame — "Prečo názov GemMARK?" on the left wall surface facing +X
// Left wall: X = -ROOM_W/2 = -10. The face pointing into the room is +X.
const LEFT_WALL_X = -ROOM_W / 2 + 0.22; // just inside the left wall surface
const LEFT_WALL_FRAME_Z = -24;           // back-left area, between back wall and HOW_WALL
const LEFT_WALL_ROT: [number, number, number] = [0, Math.PI / 2, 0]; // face +X

export default function WallBack() {
  const { t } = useTranslation();

  return (
    <group>
      {/* ── LEFT WALL: "Prečo názov GemMARK?" with circular badge logo ───── */}
      {/* Positioned on the left wall surface (+X face), in the back-left area */}
      <Html
        position={[LEFT_WALL_X + 0.12, WALL_HEIGHT * 0.9, LEFT_WALL_FRAME_Z + 2.0]}
        rotation={LEFT_WALL_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#1a1a1a',
          fontSize: '22px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {t.sections['preco-nazov-gemmark']}
        </span>
      </Html>

      <WideFrame
        position={[LEFT_WALL_X + 0.06, FRAME_Y, LEFT_WALL_FRAME_Z]}
        rotation={LEFT_WALL_ROT}
        size={[6.0, 4.5]}
        image="/images/branding/gemmark-badge-new.png"
        label={t.sections['preco-nazov-gemmark']}
        panelData={{
          type: 'info',
          id: 'preco-nazov-gemmark',
          title: t.sections['preco-nazov-gemmark'],
          description: t.precoGemmarkDesc,
          image: '/images/branding/gemmark-badge-new.png',
        }}
      />
    </group>
  );
}
