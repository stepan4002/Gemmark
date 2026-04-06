'use client';

import { useRef, useState } from 'react';
import { useTexture, Edges, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import type { PanelData } from '@/store/useGalleryStore';

interface WideFrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  /** [width, height] */
  size?: [number, number];
  image?: string;
  label: string;
  /** If provided, clicking opens a side panel with this data */
  panelData?: PanelData;
  /** If provided, overrides the default click handler entirely */
  onClickOverride?: () => void;
}

const BORDER = 0.12;
const DEPTH = 0.06;

export default function WideFrame({
  position,
  rotation = [0, 0, 0],
  size = [6, 4],
  image,
  label,
  panelData,
  onClickOverride,
}: WideFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const openPanel = useGalleryStore((s) => s.openPanel);
  const setHoveredFrame = useGalleryStore((s) => s.setHoveredFrame);

  const texture = useTexture(image || '/images/branding/gemmark-logo-new.png');

  // Smooth lift upward on hover (positive Y)
  useFrame(() => {
    if (!meshRef.current) return;
    const targetY = hovered ? position[1] + 0.14 : position[1];
    const currentY = meshRef.current.position.y;
    meshRef.current.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.12);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (onClickOverride) {
      onClickOverride();
    } else if (panelData) {
      openPanel(panelData);
    }
  };

  const handlePointerEnter = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredFrame(label);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setHoveredFrame(null);
    document.body.style.cursor = 'grab';
  };

  const [fw, fh] = [size[0] + BORDER * 2, size[1] + BORDER * 2];

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Frame backing — protrudes out from wall surface */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[fw, fh, DEPTH]} />
        <meshStandardMaterial color="#ffffff" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>

      {/* Image plane — sits in front of the frame border */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Hover tooltip */}
      {hovered && (
        <Html
          center
          position={[0, -fh / 2 - 0.26, 0.13]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(15,15,15,0.88)',
            color: '#fff',
            padding: '5px 16px',
            borderRadius: '3px',
            fontSize: '12px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.5px',
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
