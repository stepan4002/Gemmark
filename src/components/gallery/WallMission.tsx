'use client';

import { useRef, useState } from 'react';
import { Html, Edges, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

// "Aká je naša misia?" — FLAT ON THE FLOOR in the back room.
// No bobbing — stays fixed above floor. On hover, slides slightly backward (−Z).

const FLOOR_X = 0;
const FLOOR_Z = -22;
const FRAME_W = 14;   // wider to fit text
const FRAME_H = 8;    // taller
const BORDER = 0.2;
const STATIC_Y = 0.15; // fixed above floor, never goes below

export default function WallMission() {
  const { t } = useTranslation();
  const openPanel = useGalleryStore((s) => s.openPanel);
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  // On hover: slide slightly backward (−Z direction)
  useFrame(() => {
    if (!groupRef.current) return;
    const targetZ = hovered ? FLOOR_Z - 0.5 : FLOOR_Z;
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.08,
    );
  });

  const missionWords = t.tvorimeObrazGemera.replace('.', '').split(' ');
  const lastWord = missionWords[missionWords.length - 1];
  const firstWords = missionWords.slice(0, -1);

  const fw = FRAME_W + BORDER * 2;
  const fh = FRAME_H + BORDER * 2;

  return (
    <group>
      {/* Group lies flat on the floor — NO bobbing, fixed Y */}
      <group
        ref={groupRef}
        position={[FLOOR_X, STATIC_Y, FLOOR_Z]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {/* Frame border */}
        <mesh position={[0, 0, -0.04]}>
          <boxGeometry args={[fw, fh, 0.08]} />
          <meshStandardMaterial color="#ffffff" />
          <Edges color="#1a1a1a" threshold={1} />
        </mesh>

        {/* Inner panel */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[FRAME_W, FRAME_H]} />
          <meshStandardMaterial
            color={hovered ? '#f0f0f0' : '#ffffff'}
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

        {/* Section label — 3D Text, rotation locked to parent */}
        <Text
          position={[0, 2.8, 0.04]}
          rotation={[0, 0, 0]}
          fontSize={0.9}
          color="#999999"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={0.1}
          textAlign="center"
          maxWidth={12}
          raycast={() => null}
        >
          {t.sections['nasa-misia'].toUpperCase()}
        </Text>

        {/* Large display text — rotation locked to parent so it lies flat */}
        {firstWords.map((word, i) => (
          <Text
            key={i}
            position={[0, 1.2 - i * 1.4, 0.04]}
            rotation={[0, 0, 0]}
            fontSize={1.5}
            color="#1a1a1a"
            anchorX="center"
            anchorY="middle"
            fontWeight={300}
            letterSpacing={-0.02}
            raycast={() => null}
          >
            {word}
          </Text>
        ))}
        <Text
          position={[0, 1.2 - firstWords.length * 1.4, 0.04]}
          rotation={[0, 0, 0]}
          fontSize={1.5}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
          fontWeight={900}
          letterSpacing={-0.02}
          raycast={() => null}
        >
          {lastWord}
        </Text>

        {/* Click hint — rotation locked to parent */}
        <Text
          position={[0, -3.0, 0.04]}
          rotation={[0, 0, 0]}
          fontSize={0.4}
          color="#999999"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
          raycast={() => null}
        >
          {t.klikniPreViac}
        </Text>
      </group>
    </group>
  );
}
