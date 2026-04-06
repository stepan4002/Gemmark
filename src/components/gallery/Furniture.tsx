'use client';

import { Suspense } from 'react';
import { useTexture, Edges } from '@react-three/drei';
import {
  WALL_HEIGHT,
  WALL_A_Z,
  CONNECT_WALL_A_X,
} from './Room';

// ─── Bench component ──────────────────────────────────────────────────────────
function Bench({ position, backrestSide = 1 }: { position: [number, number, number]; backrestSide?: -1 | 1 }) {
  const seatThick = 0.06;
  const seatW = 1.0;
  const seatD = 3.0;
  const legH = 0.45;
  const legW = 0.08;
  const seatY = legH;

  const backH = 0.6;
  const backThick = 0.06;
  const backX = backrestSide * (seatW / 2 + backThick / 2);

  return (
    <group position={position}>
      {/* Seat plank */}
      <mesh position={[0, seatY + seatThick / 2, 0]}>
        <boxGeometry args={[seatW, seatThick, seatD]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
      {/* Four legs */}
      {([-seatD / 2 + 0.2, seatD / 2 - 0.2] as number[]).flatMap((z) =>
        ([-seatW / 2 + 0.07, seatW / 2 - 0.07] as number[]).map((x, j) => (
          <mesh key={`leg-${z}-${j}`} position={[x, legH / 2, z]}>
            <boxGeometry args={[legW, legH, legW]} />
            <meshStandardMaterial color="#f0f0ec" />
            <Edges color="#1a1a1a" threshold={1} />
          </mesh>
        ))
      )}
      {/* Backrest */}
      <mesh position={[backX, seatY + seatThick + backH / 2, 0]}>
        <boxGeometry args={[backThick, backH, seatD]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
    </group>
  );
}

// ─── Table component ──────────────────────────────────────────────────────────
function Table({ position }: { position: [number, number, number] }) {
  const topH = 0.65;
  const topW = 1.8;
  const topD = 2.6;
  const legH = 0.65;
  const legW = 0.08;

  return (
    <group position={position}>
      {/* Table top */}
      <mesh position={[0, topH + 0.03, 0]}>
        <boxGeometry args={[topW, 0.06, topD]} />
        <meshStandardMaterial color="#f0f0ec" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>
      {/* Four legs */}
      {([-topD / 2 + 0.15, topD / 2 - 0.15] as number[]).flatMap((z) =>
        ([-topW / 2 + 0.1, topW / 2 - 0.1] as number[]).map((x, j) => (
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

// ─── Carpet component (uses texture — isolated Suspense boundary) ─────────────
function Carpet({ position }: { position: [number, number, number] }) {
  const tex = useTexture('/images/team/team-collab.jpg');
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      {/* 50% larger than original [7, 5] → [10.5, 7.5] */}
      <planeGeometry args={[10.5, 7.5]} />
      <meshStandardMaterial map={tex} />
    </mesh>
  );
}

// ─── Main Furniture ───────────────────────────────────────────────────────────
// Section 1: Z = 30 (front) to Z = WALL_A_Z = 12. Centre Z = 21. Centre X = 0.
// Table+benches+carpet centred at approximately X=0, Z=20.
//
// Plant at the corner where the connecting wall meets Wall A:
// CONNECT_WALL_A_X = -4, WALL_A_Z = 12. Offset slightly inward from the corner.
export default function Furniture() {
  const centreX = 0;   // centre of room width
  const centreZ = 20;  // centre of Section 1 (between Z=30 and Z=12)

  // Plant position: at the corner of connecting wall and Wall A, on the camera-facing side
  // Corner is at X=-4, Z=12. Camera sees from +X/+Z direction.
  // So plant goes slightly toward +X (into the room) and +Z (toward entrance) from the corner.
  const plantX = CONNECT_WALL_A_X + 0.8;
  const plantZ = WALL_A_Z + 0.8;

  return (
    <group>
      {/* ── CARPET/RUG with team photo texture (isolated Suspense) ──── */}
      <Suspense fallback={null}>
        <Carpet position={[centreX, 0.012, centreZ]} />
      </Suspense>

      {/* ── SEATING ARRANGEMENT centred in Section 1 ─────────────────── */}
      {/* Left bench: backrest faces away from table (toward -X) */}
      <Bench position={[centreX - 2, 0, centreZ]} backrestSide={-1} />
      <Table position={[centreX, 0, centreZ]} />
      {/* Right bench: backrest faces away from table (toward +X) */}
      <Bench position={[centreX + 2, 0, centreZ]} backrestSide={1} />

      {/* ── PLANT on the left-hand side of Wall A ────────────────────── */}
      <Plant position={[plantX, 0, plantZ]} />
    </group>
  );
}
