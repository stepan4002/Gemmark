'use client';

import { useRef, useState } from 'react';
import { Html, Edges, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { services } from '@/data/services';
import { WALL_A_Z, DIVIDER_X, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';
import { useGalleryStore } from '@/store/useGalleryStore';
import type { PanelData } from '@/store/useGalleryStore';

// "Naše Služby" — on the FRONT face of Wall A.
// 9 package tiers: top row = 5, bottom row = 4.

const T = 0.35;
const FACE_Z = WALL_A_Z + T / 2 + 0.05;
const WALL_ROT: [number, number, number] = [0, 0, 0];

// Frame dimensions — wider square to fit package names
const FRAME_W = 2.0;
const FRAME_H = 2.0;
const BORDER = 0.08;

// Top row: 5 frames — spread across the wall
const TOP_COUNT = 5;
const TOP_SPACING = 2.6;
const TOP_TOTAL_SPAN = (TOP_COUNT - 1) * TOP_SPACING;
const TOP_START_X = DIVIDER_X - TOP_TOTAL_SPAN / 2;

// Bottom row: 4 frames — wider spacing
const BOT_COUNT = 4;
const BOT_SPACING = 3.0;
const BOT_TOTAL_SPAN = (BOT_COUNT - 1) * BOT_SPACING;
const BOT_START_X = DIVIDER_X - BOT_TOTAL_SPAN / 2;

const ROW_Y_TOP = WALL_HEIGHT * 0.68;
const ROW_Y_BOTTOM = WALL_HEIGHT * 0.30;

// Accent colour per tier (cycles through brand palette)
const TIER_COLORS = [
  '#ff6600', // ŠTART
  '#ff8800', // ŠTART PLUS
  '#e05500', // ŠTANDARD
  '#cc4400', // ŠTANDARD PLUS
  '#aa3300', // PROMO
  '#882200', // PROMO PLUS
  '#661100', // PREMIUM
  '#440000', // KOMPLET
  '#1a1a1a', // Individuálne
];

interface PackageFrameProps {
  position: [number, number, number];
  name: string;
  price: string;
  accentColor: string;
  panelData: PanelData;
}

function PackageFrame({ position, name, price, accentColor, panelData }: PackageFrameProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const openPanel = useGalleryStore((s) => s.openPanel);
  const setHoveredFrame = useGalleryStore((s) => s.setHoveredFrame);

  const fw = FRAME_W + BORDER * 2;
  const fh = FRAME_H + BORDER * 2;

  useFrame(() => {
    if (!groupRef.current) return;
    const targetY = hovered ? position[1] + 0.15 : position[1];
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.1
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={WALL_ROT}
    >
      {/* Frame border */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[fw, fh, 0.05]} />
        <meshStandardMaterial color={hovered ? accentColor : '#ffffff'} />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>

      {/* Coloured accent bar at top of frame */}
      <mesh position={[0, fh / 2 - 0.12, 0.10]}>
        <boxGeometry args={[fw, 0.18, 0.02]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>

      {/* Package name — always visible, in front of click plane */}
      <Text
        position={[0, 0.25, 0.22]}
        fontSize={name.length > 12 ? 0.22 : name.length > 7 ? 0.26 : 0.32}
        color={hovered ? '#ffffff' : '#1a1a1a'}
        anchorX="center"
        anchorY="middle"
        maxWidth={fw * 0.9}
        textAlign="center"
        fontWeight={900}
        letterSpacing={0.04}
        raycast={() => null}
      >
        {name.toUpperCase()}
      </Text>
      {/* Price — always visible, in front of click plane */}
      <Text
        position={[0, -0.35, 0.22]}
        fontSize={0.22}
        color={hovered ? 'rgba(255,255,255,0.9)' : accentColor}
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        letterSpacing={0.02}
        raycast={() => null}
      >
        {price}
      </Text>

      {/* Invisible click catcher — OUTERMOST mesh, catches all clicks/hovers over the frame */}
      <mesh
        position={[0, 0, 0.16]}
        onClick={(e) => { e.stopPropagation(); openPanel(panelData); }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          setHoveredFrame(name);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setHovered(false);
          setHoveredFrame(null);
          document.body.style.cursor = 'grab';
        }}
      >
        <planeGeometry args={[fw, fh]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {/* No hover tooltip needed — name is always visible on the frame */}
    </group>
  );
}

export default function WallServices() {
  const { t, language } = useTranslation();

  const topRow = services.slice(0, TOP_COUNT);
  const bottomRow = services.slice(TOP_COUNT, TOP_COUNT + BOT_COUNT);

  return (
    <group>
      {/* Section label */}
      <Html
        position={[DIVIDER_X, WALL_HEIGHT * 0.88, FACE_Z]}
        rotation={WALL_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#222',
          fontSize: '18px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          {t.sections['nase-sluzby']}
        </span>
      </Html>

      {/* Top row — 5 packages */}
      {topRow.map((service, i) => {
        const displayName = language === 'hu' ? service.nameHu : service.name;
        const displayPrice = language === 'hu' ? service.priceHu : service.price;
        const posX = TOP_START_X + i * TOP_SPACING;
        return (
          <PackageFrame
            key={service.id}
            position={[posX, ROW_Y_TOP, FACE_Z + 0.05]}
            name={displayName}
            price={displayPrice}
            accentColor={TIER_COLORS[i] ?? '#ff6600'}
            panelData={{
              type: 'service',
              id: service.id,
              title: displayName,
              description: service.description,
              image: service.image,
            }}
          />
        );
      })}

      {/* Bottom row — 4 packages */}
      {bottomRow.map((service, i) => {
        const displayName = language === 'hu' ? service.nameHu : service.name;
        const displayPrice = language === 'hu' ? service.priceHu : service.price;
        const posX = BOT_START_X + i * BOT_SPACING;
        return (
          <PackageFrame
            key={service.id}
            position={[posX, ROW_Y_BOTTOM, FACE_Z + 0.05]}
            name={displayName}
            price={displayPrice}
            accentColor={TIER_COLORS[TOP_COUNT + i] ?? '#1a1a1a'}
            panelData={{
              type: 'service',
              id: service.id,
              title: displayName,
              description: service.description,
              image: service.image,
            }}
          />
        );
      })}
    </group>
  );
}
