'use client';

import { Html } from '@react-three/drei';
import Frame from './Frame';
import { portfolioProjects } from '@/data/portfolio';
import { ROOM_WIDTH, ROOM_DEPTH, WALL_HEIGHT } from './Room';
import { useTranslation } from '@/hooks/useTranslation';

// Portfolio frames — single row on the LEFT wall, spanning the full usable depth.
// Left wall: X = -ROOM_WIDTH/2 = -10, rotated [0, π/2, 0] so it faces +X into the room.

const WALL_X = -ROOM_WIDTH / 2 + 0.22; // just inside the left wall surface
const WALL_ROT: [number, number, number] = [0, Math.PI / 2, 0];

// Spread all frames near the front of the left wall.
const Z_NEAR = ROOM_DEPTH / 2 - 3.0;   // ≈ +27 — near front
const SPACING_Z = 4.0;                  // spacing between frames

const START_Z = Z_NEAR;

const ROW_Y = WALL_HEIGHT * 0.58;   // single row, slightly above mid-height

// All frames are square 2.0 × 2.0
const FRAME_SIZE: [number, number] = [2.0, 2.0];

export default function WallPortfolio() {
  const { t, language } = useTranslation();

  return (
    <group>
      {/* Section label — single line, near the front of the left wall */}
      <Html
        position={[WALL_X + 0.12, WALL_HEIGHT * 0.92, START_Z - 1.5]}
        rotation={WALL_ROT}
        transform
        style={{ pointerEvents: 'none' }}
      >
        <span style={{
          color: '#222',
          fontSize: '22px',
          fontWeight: '900',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          maxWidth: '400px',
        }}>
          {t.sections['portfolio']}
        </span>
      </Html>

      {portfolioProjects.map((project, i) => {
        const pos: [number, number, number] = [WALL_X + 0.09, ROW_Y, START_Z - i * SPACING_Z];

        // In-progress entries — square frame, hover shows project name, NOT clickable
        if (project.isPlaceholder && project.inProgress) {
          return (
            <Frame
              key={project.id}
              position={pos}
              rotation={WALL_ROT}
              size={FRAME_SIZE}
              image="/images/branding/gemmark-icon.jpg"
              label={project.name}
              isPlaceholder={true}
              inProgress={true}
              placeholderNumber={undefined}
              panelData={{
                type: 'portfolio',
                id: project.id,
                title: project.name,
                description: project.description,
                image: project.logo,
                deliverables: project.deliverables,
              }}
            />
          );
        }

        // Regular placeholder entries — square frame with number overlay
        if (project.isPlaceholder) {
          return (
            <Frame
              key={project.id}
              position={pos}
              rotation={WALL_ROT}
              size={FRAME_SIZE}
              image="/images/branding/gemmark-icon.jpg"
              label={project.name}
              isPlaceholder={true}
              placeholderNumber={project.name}
              panelData={{
                type: 'portfolio',
                id: project.id,
                title: project.name,
                description: project.description,
                image: project.logo,
                deliverables: project.deliverables,
              }}
            />
          );
        }

        // Real project entries — also square 2.0 × 2.0
        const desc = language === 'hu' && project.descriptionHu ? project.descriptionHu : project.description;
        const dels = language === 'hu' && project.deliverablesHu ? project.deliverablesHu : project.deliverables;
        const loc = language === 'hu' && project.locationHu ? project.locationHu : project.location;
        return (
          <Frame
            key={project.id}
            position={pos}
            rotation={WALL_ROT}
            size={FRAME_SIZE}
            image={project.logo}
            label={project.name}
            isPlaceholder={false}
            panelData={{
              type: 'portfolio',
              id: project.id,
              title: project.name,
              description: desc,
              image: project.logo,
              link: project.link,
              deliverables: dels,
              location: loc,
            }}
          />
        );
      })}
    </group>
  );
}
