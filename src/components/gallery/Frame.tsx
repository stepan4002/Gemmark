'use client';

import { useRef, useState } from 'react';
import { useTexture, Edges, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import type { PanelData } from '@/store/useGalleryStore';
import { useTranslation } from '@/hooks/useTranslation';

interface FrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  /** [width, height] of the image area */
  size?: [number, number];
  image?: string;
  label: string;
  panelData: PanelData;
  isPlaceholder?: boolean;
  /** When true, frame is not clickable but shows name on hover */
  inProgress?: boolean;
  /** When isPlaceholder is true (and not inProgress), display this number as a large white overlay */
  placeholderNumber?: string;
}

const BORDER = 0.1;  // frame border width
const DEPTH = 0.05;  // frame depth

export default function Frame({
  position,
  rotation = [0, 0, 0],
  size = [1.4, 1.8],
  image,
  label,
  panelData,
  isPlaceholder = false,
  inProgress = false,
  placeholderNumber,
}: FrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const openPanel = useGalleryStore((s) => s.openPanel);
  const setHoveredFrame = useGalleryStore((s) => s.setHoveredFrame);
  const { t } = useTranslation();

  // Load texture — always call the hook, use icon for placeholders
  const texture = useTexture(image || '/images/branding/gemmark-icon.jpg');

  // Prevent stretching — center the image
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;

  // Smooth lift upward on hover (positive Y) — only for real (non-placeholder) frames
  useFrame(() => {
    if (!meshRef.current) return;
    const targetY = (hovered && !isPlaceholder) ? position[1] + 0.15 : position[1];
    const currentY = meshRef.current.position.y;
    meshRef.current.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    // Plain placeholders and in-progress frames are not clickable
    if (isPlaceholder) return;
    e.stopPropagation();
    openPanel(panelData);
  };

  const handlePointerEnter = (e: { stopPropagation: () => void }) => {
    // Plain placeholders (no name) are not interactive at all
    if (isPlaceholder && !inProgress) return;
    e.stopPropagation();
    setHovered(true);
    if (inProgress) {
      setHoveredFrame(label);
      document.body.style.cursor = 'default';
    } else {
      setHoveredFrame(label);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerLeave = () => {
    if (isPlaceholder && !inProgress) return;
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
      {/* White frame border with black edge — protrudes out from wall */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[fw, fh, DEPTH]} />
        <meshStandardMaterial color="#ffffff" />
        <Edges color="#1a1a1a" threshold={1} />
      </mesh>

      {/* Image plane — icon texture for placeholders, photo texture for real entries */}
      <mesh position={[0, 0, 0.12]}>
        <planeGeometry args={size} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Plain placeholder: large white number overlay */}
      {isPlaceholder && !inProgress && placeholderNumber && (
        <Html
          center
          position={[0, 0, 0.13]}
          transform
          style={{ pointerEvents: 'none' }}
        >
          <span style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '48px',
            fontWeight: '900',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            lineHeight: 1,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            userSelect: 'none',
          }}>
            {placeholderNumber}
          </span>
        </Html>
      )}

      {/* In-progress overlay — shows "Pripravujeme..." badge */}
      {inProgress && (
        <Html
          center
          position={[0, -size[1] / 2 + 0.22, 0.13]}
          transform
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(255, 102, 0, 0.9)',
            color: '#fff',
            padding: '3px 10px',
            borderRadius: '2px',
            fontSize: '8px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            whiteSpace: 'nowrap',
          }}>
            {t.pripravujeme}
          </div>
        </Html>
      )}

      {/* Hover tooltip — below frame for normal, ABOVE badge for in-progress */}
      {hovered && (!isPlaceholder || inProgress) && (
        <Html
          center
          position={[0, inProgress ? 0.15 : -fh / 2 - 0.22, 0.13]}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            background: 'rgba(15,15,15,0.88)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '3px',
            fontSize: '11px',
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
