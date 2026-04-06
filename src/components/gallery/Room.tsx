'use client';

import { Edges } from '@react-three/drei';
import * as THREE from 'three';

// ─── Design tokens ────────────────────────────────────────────────────────────
const WALL_COLOR = '#ffffff';
const EDGE_COLOR = '#1a1a1a';
const FLOOR_COLOR = '#f2f2f0';
const T = 0.35; // wall thickness — chunky, visible depth

// ─── Room dimensions ──────────────────────────────────────────────────────────
// Width (X) × depth (Z). Origin is at floor centre.
// Positive Z → front/entrance. Negative Z → back wall.
// Room is ~3× as long (deep) as it is wide — museum gallery proportion.
export const ROOM_W = 20;   // width  (left wall X = -10, right wall X = +10)
export const ROOM_D = 60;   // depth  (back wall Z = -30, front opening Z = +30)
export const WALL_H = 7.5;

// ─── Divider walls ────────────────────────────────────────────────────────────
// Wall A runs parallel to X-axis (left→right), perpendicular to the room's depth.
// Wall A connects to the RIGHT wall and leaves a gap on the LEFT side.
// Shortened to 8 units (from 14) since only 2 service frames are needed.
export const WALL_A_Z = 16;          // Z position — moved FORWARD for more space
export const WALL_B_Z = -10;         // Z position — close to frame 10, forward enough to not obstruct floor mission at Z=-22
export const DIVIDER_WIDTH = 12;     // wider to fit services properly
export const DIVIDER_GAP = ROOM_W - DIVIDER_WIDTH; // = 8 — gap on left side
// X centre: right edge at X=10, extends DIVIDER_WIDTH units left → left edge at X=-2, centre X=4
export const DIVIDER_X = ROOM_W / 2 - DIVIDER_WIDTH / 2; // = 10 - 6 = 4

// ─── Staircase ────────────────────────────────────────────────────────────────
export const STAIR_X = 2;            // center-right
export const STAIR_Z = ROOM_D / 2;  // right at the front edge

// ─── Re-exports for wall components (legacy-compatible names) ─────────────────
export const ROOM_WIDTH = ROOM_W;
export const ROOM_DEPTH = ROOM_D;
export const WALL_HEIGHT = WALL_H;
// Wall A aliases
export const MID_WALL_Z = WALL_A_Z;
export const MID_WALL_WIDTH = DIVIDER_WIDTH;
export const MID_WALL_X_OFFSET = DIVIDER_X;
// Wall C — freestanding, rotated 90 degrees, runs ALONG Z axis (front-to-back)
export const WALL_C_Z = 3;           // centre Z position
export const WALL_C_LENGTH = 9;      // length along Z axis (depth)
export const WALL_C_X = 0;           // centered in room

// Wall B aliases
export const WALL_B_Z_POS = WALL_B_Z;

// ─── HOW_WALL constants — kept for legacy exports only ───────────────────────
// HOW_WALL left segment is REMOVED from geometry (WallMission moved to floor).
export const HOW_WALL_LENGTH = 8;
export const HOW_WALL_X = -ROOM_W / 2 + HOW_WALL_LENGTH / 2;
export const HOW_WALL_Z = -16;
export const HOW_WALL_LEFT_X = -7;
export const HOW_WALL_RIGHT_X = -1;
export const HOW_WALL_SEGMENT_W = 7;

// ─── Wall B split into two segments ──────────────────────────────────────────
// Wall B LEFT: "Ako to funguje?" — on the LEFT side of the room, behind frame 10
export const WALL_B_LEFT_X = -6;   // left side of room
export const WALL_B_LEFT_W = 6;    // wider
// Wall B RIGHT: "Ako sa s nami spojíš?" — on the RIGHT side, moved FORWARD to not cover floor mission
export const WALL_B_RIGHT_X = 4;   // right-center
export const WALL_B_RIGHT_W = 8;   // wide
export const WALL_B_RIGHT_Z = -6;  // its own Z, forward of WALL_B_Z to clear floor mission

// ─── Connecting wall from Wall A left end, going FORWARD (toward entrance) ───
// This wall carries "Čo, kedy a kde sa u nás deje?" content.
// Left end of Wall A: DIVIDER_X - DIVIDER_WIDTH/2 = 6 - 4 = 2
export const CONNECT_WALL_A_X = DIVIDER_X - DIVIDER_WIDTH / 2; // X = 2
export const CONNECT_WALL_A_Z_START = WALL_A_Z;                 // Z = 12
export const CONNECT_WALL_A_LENGTH = 8;                          // extends 8 units FORWARD

// ─── Helpers ──────────────────────────────────────────────────────────────────
function WhiteBox({
  pos,
  size,
  rot,
}: {
  pos: [number, number, number];
  size: [number, number, number];
  rot?: [number, number, number];
}) {
  return (
    <mesh position={pos} rotation={rot ?? [0, 0, 0]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={WALL_COLOR} />
      <Edges color={EDGE_COLOR} threshold={1} />
    </mesh>
  );
}

// ─── Staircase component ──────────────────────────────────────────────────────
function Staircase() {
  const stepCount = 5;
  const stepH = 0.3;
  const stepD = 0.6;
  const stairWidth = 4.0;

  return (
    <group position={[STAIR_X, 0, STAIR_Z]}>
      {Array.from({ length: stepCount }).map((_, i) => (
        <mesh
          key={`step-${i}`}
          position={[0, -(i * stepH + stepH / 2), i * stepD + stepD / 2]}
        >
          <boxGeometry args={[stairWidth, stepH, stepD]} />
          <meshStandardMaterial color={WALL_COLOR} />
          <Edges color={EDGE_COLOR} threshold={1} />
        </mesh>
      ))}

      <mesh position={[-stairWidth / 2 - 0.04, 0.5, 0]}>
        <boxGeometry args={[0.06, 1.0 + stepCount * stepH, 0.06]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>
      <mesh position={[stairWidth / 2 + 0.04, 0.5, 0]}>
        <boxGeometry args={[0.06, 1.0 + stepCount * stepH, 0.06]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>
      <mesh position={[-stairWidth / 2 - 0.04, -(stepCount * stepH) + 0.5, stepCount * stepD]}>
        <boxGeometry args={[0.06, 1.0, 0.06]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>
      <mesh position={[stairWidth / 2 + 0.04, -(stepCount * stepH) + 0.5, stepCount * stepD]}>
        <boxGeometry args={[0.06, 1.0, 0.06]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>
      {Array.from({ length: stepCount * 2 }).map((_, i) => (
        <mesh
          key={`spindle-l-${i}`}
          position={[
            -stairWidth / 2 - 0.04,
            0.2 - i * (stepH / 2) * 0.5,
            i * (stepD / 2),
          ]}
        >
          <boxGeometry args={[0.03, 0.8, 0.03]} />
          <meshStandardMaterial color={WALL_COLOR} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Floor entry marker ───────────────────────────────────────────────────────
function FloorMarker({ x, z }: { x: number; z: number }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, z]}>
      <mesh>
        <ringGeometry args={[0.32, 0.42, 32]} />
        <meshStandardMaterial color={EDGE_COLOR} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color={EDGE_COLOR} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ─── Main Room ────────────────────────────────────────────────────────────────
export default function Room() {
  const halfW = ROOM_W / 2;  // 10
  const halfD = ROOM_D / 2;  // 30

  return (
    <group>
      {/* ── FLOOR ─────────────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color={FLOOR_COLOR} side={THREE.DoubleSide} />
      </mesh>

      {/* Floor edge outline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color={FLOOR_COLOR} side={THREE.DoubleSide} wireframe={false} />
        <Edges color="#cccccc" threshold={1} />
      </mesh>

      {/* ── BACK WALL (full width, Z = -30) ───────────────────────────────── */}
      <WhiteBox
        pos={[0, WALL_H / 2, -halfD]}
        size={[ROOM_W + T, WALL_H, T]}
      />

      {/* ── LEFT WALL (full depth, X = -10) ───────────────────────────────── */}
      <WhiteBox
        pos={[-halfW, WALL_H / 2, 0]}
        size={[T, WALL_H, ROOM_D]}
      />

      {/* ── NO RIGHT WALL — removed for open view into the room ─────────── */}

      {/* ── NO FRONT WALL — open entrance ────────────────────────────────── */}

      {/* ── WALL A — 1st divider, shortened to 8 units, connects to RIGHT wall ── */}
      {/* Centre X = DIVIDER_X = 6, right edge at X=10 touching right boundary */}
      <WhiteBox
        pos={[DIVIDER_X, WALL_H / 2, WALL_A_Z]}
        size={[DIVIDER_WIDTH, WALL_H, T]}
      />

      {/* ── WALL C — freestanding, ROTATED 90°, runs along Z axis ────────── */}
      <WhiteBox
        pos={[WALL_C_X, WALL_H / 2, WALL_C_Z]}
        size={[T, WALL_H, WALL_C_LENGTH]}
      />

      {/* ── WALL B — split into two half-segments at Z = WALL_B_Z ─────── */}
      {/* LEFT half: "Ako to funguje?" */}
      <WhiteBox
        pos={[WALL_B_LEFT_X, WALL_H / 2, WALL_B_Z]}
        size={[WALL_B_LEFT_W, WALL_H, T]}
      />
      {/* RIGHT half: "Ako sa s nami spojíš?" — uses its own Z, forward of LEFT */}
      <WhiteBox
        pos={[WALL_B_RIGHT_X, WALL_H / 2, WALL_B_RIGHT_Z]}
        size={[WALL_B_RIGHT_W, WALL_H, T]}
      />

      {/* ── HOW_WALL left segment REMOVED — WallMission moved to floor ────── */}

      {/* ── CONNECTING WALL from Wall A left end, running FORWARD toward entrance ── */}
      <WhiteBox
        pos={[CONNECT_WALL_A_X, WALL_H / 2, CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH / 2]}
        size={[T, WALL_H, CONNECT_WALL_A_LENGTH]}
      />

      {/* ── CEILING STRIPS (visual closure at top of each wall) ──────────── */}
      {/* Back wall */}
      <mesh position={[0, WALL_H, -halfD]}>
        <boxGeometry args={[ROOM_W + T, T, T]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-halfW, WALL_H, 0]}>
        <boxGeometry args={[T, T, ROOM_D]} />
        <meshStandardMaterial color={WALL_COLOR} />
        <Edges color={EDGE_COLOR} threshold={1} />
      </mesh>

      {/* ── FLOOR EDGE LINES ─────────────────────────────────────────────── */}
      {/* Left wall base */}
      <mesh position={[-halfW + T / 2 + 0.02, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.04, ROOM_D]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back wall base */}
      <mesh position={[0, 0.02, -halfD + T / 2 + 0.02]}>
        <boxGeometry args={[ROOM_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall A base — both sides */}
      <mesh position={[DIVIDER_X, 0.02, WALL_A_Z + T / 2 + 0.02]}>
        <boxGeometry args={[DIVIDER_WIDTH, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[DIVIDER_X, 0.02, WALL_A_Z - T / 2 - 0.02]}>
        <boxGeometry args={[DIVIDER_WIDTH, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B LEFT half base — both sides */}
      <mesh position={[WALL_B_LEFT_X, 0.02, WALL_B_Z + T / 2 + 0.02]}>
        <boxGeometry args={[WALL_B_LEFT_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_B_LEFT_X, 0.02, WALL_B_Z - T / 2 - 0.02]}>
        <boxGeometry args={[WALL_B_LEFT_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B RIGHT half base — uses WALL_B_RIGHT_Z */}
      <mesh position={[WALL_B_RIGHT_X, 0.02, WALL_B_RIGHT_Z + T / 2 + 0.02]}>
        <boxGeometry args={[WALL_B_RIGHT_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_B_RIGHT_X, 0.02, WALL_B_RIGHT_Z - T / 2 - 0.02]}>
        <boxGeometry args={[WALL_B_RIGHT_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall C base — both sides (along X since Wall C runs along Z) */}
      <mesh position={[WALL_C_X + T / 2 + 0.02, 0.02, WALL_C_Z]}>
        <boxGeometry args={[0.03, 0.04, WALL_C_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_C_X - T / 2 - 0.02, 0.02, WALL_C_Z]}>
        <boxGeometry args={[0.03, 0.04, WALL_C_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* HOW_WALL left segment base — REMOVED (WallMission on floor now) */}
      {/* Connecting wall base — both sides */}
      <mesh position={[CONNECT_WALL_A_X + T / 2 + 0.02, 0.02, CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH / 2]}>
        <boxGeometry args={[0.03, 0.04, CONNECT_WALL_A_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[CONNECT_WALL_A_X - T / 2 - 0.02, 0.02, CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH / 2]}>
        <boxGeometry args={[0.03, 0.04, CONNECT_WALL_A_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Floor right edge (open side) */}
      <mesh position={[halfW, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.04, ROOM_D]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Floor front edge (open entrance) */}
      <mesh position={[0, 0.02, halfD]}>
        <boxGeometry args={[ROOM_W, 0.04, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* ── CEILING EDGE LINES ────────────────────────────────────────────── */}
      {/* Left wall top */}
      <mesh position={[-halfW, WALL_H, 0]}>
        <boxGeometry args={[0.03, 0.03, ROOM_D]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back wall top */}
      <mesh position={[0, WALL_H, -halfD]}>
        <boxGeometry args={[ROOM_W, 0.03, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall A top */}
      <mesh position={[DIVIDER_X, WALL_H, WALL_A_Z]}>
        <boxGeometry args={[DIVIDER_WIDTH, 0.03, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B LEFT half top */}
      <mesh position={[WALL_B_LEFT_X, WALL_H, WALL_B_Z]}>
        <boxGeometry args={[WALL_B_LEFT_W, 0.03, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B RIGHT half top — uses WALL_B_RIGHT_Z */}
      <mesh position={[WALL_B_RIGHT_X, WALL_H, WALL_B_RIGHT_Z]}>
        <boxGeometry args={[WALL_B_RIGHT_W, 0.03, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* HOW_WALL left segment top — REMOVED */}
      {/* Connecting wall top (goes FORWARD) */}
      <mesh position={[CONNECT_WALL_A_X, WALL_H, CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH / 2]}>
        <boxGeometry args={[0.03, 0.03, CONNECT_WALL_A_LENGTH]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* ── VERTICAL CORNER LINES ─────────────────────────────────────────── */}
      {/* Back wall + left wall corner — THICK (user-specified) */}
      <mesh position={[-halfW, WALL_H / 2, -halfD]}>
        <boxGeometry args={[T + 0.1, WALL_H + 0.1, T + 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Back wall + right boundary corner — thin */}
      <mesh position={[halfW, WALL_H / 2, -halfD]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall A left end — thin */}
      <mesh position={[DIVIDER_X - DIVIDER_WIDTH / 2, WALL_H / 2, WALL_A_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall A right end — thin */}
      <mesh position={[DIVIDER_X + DIVIDER_WIDTH / 2, WALL_H / 2, WALL_A_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall A + connecting wall INTERSECTION — THICK (user-specified) */}
      <mesh position={[CONNECT_WALL_A_X, WALL_H / 2, WALL_A_Z]}>
        <boxGeometry args={[T + 0.1, WALL_H + 0.1, T + 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B LEFT half ends — thin */}
      <mesh position={[WALL_B_LEFT_X - WALL_B_LEFT_W / 2, WALL_H / 2, WALL_B_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_B_LEFT_X + WALL_B_LEFT_W / 2, WALL_H / 2, WALL_B_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall B RIGHT half ends — thin */}
      <mesh position={[WALL_B_RIGHT_X - WALL_B_RIGHT_W / 2, WALL_H / 2, WALL_B_RIGHT_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_B_RIGHT_X + WALL_B_RIGHT_W / 2, WALL_H / 2, WALL_B_RIGHT_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wall C ends — thin */}
      <mesh position={[WALL_C_X, WALL_H / 2, WALL_C_Z - WALL_C_LENGTH / 2]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[WALL_C_X, WALL_H / 2, WALL_C_Z + WALL_C_LENGTH / 2]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Connecting wall far end — thin */}
      <mesh position={[CONNECT_WALL_A_X, WALL_H / 2, CONNECT_WALL_A_Z_START + CONNECT_WALL_A_LENGTH]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Front-left corner — thin */}
      <mesh position={[-halfW, WALL_H / 2, halfD]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Left wall at Wall A junction — thin */}
      <mesh position={[-halfW, WALL_H / 2, WALL_A_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Left wall at Wall B LEFT junction — thin */}
      <mesh position={[-halfW, WALL_H / 2, WALL_B_Z]}>
        <boxGeometry args={[0.04, WALL_H, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
