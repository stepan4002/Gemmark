'use client';

import { Edges } from '@react-three/drei';
import {
  WALL_HEIGHT,
  ROOM_W,
  ROOM_D,
} from './Room';

// ─── Bench component ──────────────────────────────────────────────────────────
// Original dimensions × 1.5 scale factor
function Bench({ position, backrestSide = 1 }: { position: [number, number, number]; backrestSide?: -1 | 1 }) {
  const seatThick = 0.09;   // 0.06 × 1.5
  const seatW = 1.5;        // 1.0 × 1.5
  const seatD = 4.5;        // 3.0 × 1.5
  const legH = 0.675;       // 0.45 × 1.5
  const legW = 0.12;        // 0.08 × 1.5
  const seatY = legH;

  const backH = 0.9;        // 0.6 × 1.5
  const backThick = 0.09;   // 0.06 × 1.5
  // Backrest sits on the Z-axis side (benches face each other along X)
  // backrestSide now controls Z position, benches face X
  const backZ = backrestSide * (seatD / 2 + backThick / 2);

  return (
    <group position={position}>
      {/* Seat plank */}
      <mesh position={[0, seatY + seatThick / 2, 0]}>
        <boxGeometry args={[seatW, seatThick, seatD]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
      {/* Four legs */}
      {([-seatD / 2 + 0.3, seatD / 2 - 0.3] as number[]).flatMap((z) =>
        ([-seatW / 2 + 0.105, seatW / 2 - 0.105] as number[]).map((x, j) => (
          <mesh key={`leg-${z}-${j}`} position={[x, legH / 2, z]}>
            <boxGeometry args={[legW, legH, legW]} />
            <meshStandardMaterial color="#f0f0ec" />
            <Edges color="#1a1a1a" threshold={1} />
          </mesh>
        ))
      )}
      {/* Backrest — along Z face */}
      <mesh position={[0, seatY + seatThick + backH / 2, backZ]}>
        <boxGeometry args={[seatW, backH, backThick]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
    </group>
  );
}

// ─── Table component ──────────────────────────────────────────────────────────
// Original dimensions × 1.5 scale factor
function Table({ position }: { position: [number, number, number] }) {
  const topH = 0.975;       // 0.65 × 1.5
  const topW = 2.7;         // 1.8 × 1.5
  const topD = 3.9;         // 2.6 × 1.5
  const legH = 0.975;       // 0.65 × 1.5
  const legW = 0.12;        // 0.08 × 1.5

  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, topH + 0.045, 0]}>
        <boxGeometry args={[topW, 0.09, topD]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
      {/* Four legs */}
      {([-topD / 2 + 0.225, topD / 2 - 0.225] as number[]).flatMap((z) =>
        ([-topW / 2 + 0.15, topW / 2 - 0.15] as number[]).map((x, j) => (
          <mesh key={`tleg-${z}-${j}`} position={[x, legH / 2, z]}>
            <boxGeometry args={[legW, legH, legW]} />
            <meshStandardMaterial color="#f0f0ec" />
            <Edges color="#1a1a1a" threshold={1} />
          </mesh>
        ))
      )}
    </group>
  );
}

// ─── Plant component ──────────────────────────────────────────────────────────
function Plant({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Square pot */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.9, 1.0, 0.9]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
      {/* Soil surface */}
      <mesh position={[0, 1.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.88, 0.88]} />
        <meshStandardMaterial color="#5a4a3a" />
      </mesh>
      {/* Trunk */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 1.4, 6]} />
        <meshStandardMaterial color="#6a7a5a" />
      </mesh>
      {/* Foliage clusters */}
      {([
        [0, 2.8, 0, 0.65],
        [0.3, 2.5, 0.2, 0.45],
        [-0.25, 3.1, -0.15, 0.4],
        [0.15, 3.4, 0.12, 0.35],
        [-0.12, 2.3, 0.18, 0.3],
        [0.2, 3.7, -0.1, 0.28],
      ] as [number, number, number, number][]).map((leaf, i) => (
        <mesh key={`leaf-${i}`} position={[leaf[0], leaf[1], leaf[2]]}>
          <sphereGeometry args={[leaf[3], 8, 6]} />
          <meshStandardMaterial color="#3a6a2a" />
        </mesh>
      ))}
    </group>
  );
}

// ─── Main Furniture ───────────────────────────────────────────────────────────
// Table+benches to the RIGHT of Wall C, at the level of Ako to funguje wall.
// Behind Wall B so frame 10 on the left wall is not blocked.
//
// Plant in the back-left corner.
export default function Furniture() {
  // Furniture to the right of Wall C, level with it
  // Wall C is at X=0, Z=3. Table goes to the right at same Z level.
  const tableX = 6;     // right of Wall C
  const tableZ = 3;     // same Z as Wall C

  // Plant position: back-left corner of the room
  const plantX = -ROOM_W / 2 + 1.5;   // ≈ -8.5
  const plantZ = -ROOM_D / 2 + 1.5;   // ≈ -28.5

  // Benches offset along X (face each other across table along X axis)
  // Backrests face OUTWARD (away from table)
  const benchOffsetX = 3.2;

  return (
    <group>
      {/* ── TABLE level with Wall C, to the right ────────────────────── */}
      <Table position={[tableX, 0, tableZ]} />

      {/* ── BENCH on the -X side (left of table, backrest faces left) ── */}
      <Bench position={[tableX - benchOffsetX, 0, tableZ]} backrestSide={-1} />

      {/* ── BENCH on the +X side (right of table, backrest faces right) ── */}
      <Bench position={[tableX + benchOffsetX, 0, tableZ]} backrestSide={1} />

      {/* ── PLANT in the back-left corner of the room ────────────────── */}
      <Plant position={[plantX, 0, plantZ]} />
    </group>
  );
}
