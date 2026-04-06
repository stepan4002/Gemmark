'use client';

import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGalleryStore } from '@/store/useGalleryStore';
import Room from './Room';
import Lights from './Lights';
import WallPortfolio from './WallPortfolio';
import WallServices from './WallServices';
import WallMission from './WallMission';
import WallBack from './WallBack';
import WallHowItWorks from './WallHowItWorks';
import WallOProjekte from './WallOProjekte';
import Furniture from './Furniture';
import WallTeam from './WallTeam';
import WallEvents from './WallEvents';

function CameraController() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const pointerDown = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const panX = useRef(0);
  const panZ = useRef(18);
  const zoomLevel = useRef(35);
  const velocity = useRef({ x: 0, z: 0 });
  const cameraTarget = useGalleryStore((s) => s.cameraTarget);
  const clearCameraTarget = useGalleryStore((s) => s.clearCameraTarget);
  const activePanel = useGalleryStore((s) => s.activePanel);
  const shouldResetCamera = useGalleryStore((s) => s.shouldResetCamera);
  const clearResetCamera = useGalleryStore((s) => s.clearResetCamera);
  const animating = useRef(false);
  const initialized = useRef(false);

  const applyCam = () => {
    const cam = camera as THREE.OrthographicCamera;
    const d = 60;
    const ox = d;
    const oy = d * 0.816;
    const oz = d;
    cam.position.set(panX.current + ox, oy, panZ.current + oz);
    cam.lookAt(panX.current, 0, panZ.current);
    cam.zoom = zoomLevel.current;
    cam.updateProjectionMatrix();
  };

  // Target positions — event handlers write here, useFrame interpolates toward them
  const targetPanX = useRef(panX.current);
  const targetPanZ = useRef(panZ.current);

  useFrame(() => {
    if (!initialized.current) {
      initialized.current = true;
      targetPanX.current = panX.current;
      targetPanZ.current = panZ.current;
      applyCam();
      return;
    }

    // Smooth interpolation toward target (makes touch fluid at 60fps)
    const lerpFactor = 0.25; // higher = snappier, lower = smoother
    const dx = targetPanX.current - panX.current;
    const dz = targetPanZ.current - panZ.current;

    if (Math.abs(dx) > 0.001 || Math.abs(dz) > 0.001) {
      panX.current += dx * lerpFactor;
      panZ.current += dz * lerpFactor;
      applyCam();
    }

    // Apply momentum/inertia after drag release
    if (
      !isDragging.current &&
      !animating.current &&
      (Math.abs(velocity.current.x) > 0.001 || Math.abs(velocity.current.z) > 0.001)
    ) {
      targetPanX.current += velocity.current.x;
      targetPanZ.current += velocity.current.z;
      velocity.current.x *= 0.92;
      velocity.current.z *= 0.92;
    }
  });

  useEffect(() => {
    const el = gl.domElement;

    // ─── Detect touch device ────────────────────────────────────────────
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const DRAG_THRESHOLD = isTouchDevice ? 2 : 4;
    // Touch needs higher speed multiplier for fluid movement
    const BASE_SPEED = isTouchDevice ? 0.12 : 0.05;

    // ─── Pinch-to-zoom state ─────────────────────────────────────────────
    const pinchStart = { current: 0 };
    const isPinching = { current: false };

    const onDown = (e: PointerEvent) => {
      if (activePanel) return;
      const target = e.target as HTMLElement;
      if (
        target.closest('[data-ui-overlay]') ||
        target.closest('button') ||
        target.closest('nav') ||
        target.closest('a')
      ) return;
      pointerDown.current = true;
      isDragging.current = false;
      velocity.current = { x: 0, z: 0 };
      lastPointer.current = { x: e.clientX, y: e.clientY };
      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const onMove = (e: PointerEvent) => {
      if (!pointerDown.current || isPinching.current) return;

      if (!isDragging.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
        isDragging.current = true;
        el.style.cursor = 'grabbing';
        document.body.style.cursor = 'grabbing';
      }

      const speed = BASE_SPEED * (35 / zoomLevel.current);
      const dx = (e.clientX - lastPointer.current.x) * speed;
      const dy = (e.clientY - lastPointer.current.y) * speed;

      const vx = -(dx * 0.707 + dy * 0.707);
      const vz = dx * 0.707 - dy * 0.707;

      targetPanX.current += vx;
      targetPanZ.current += vz;

      velocity.current = { x: vx, z: vz };

      lastPointer.current = { x: e.clientX, y: e.clientY };
    };

    const onUp = () => {
      pointerDown.current = false;
      isDragging.current = false;
      el.style.cursor = 'grab';
      document.body.style.cursor = 'grab';
    };

    // ─── Mouse wheel zoom ────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest('[data-ui-overlay]')) return;
      e.preventDefault();
      zoomLevel.current = THREE.MathUtils.clamp(
        zoomLevel.current - e.deltaY * 0.025,
        8,
        80
      );
      applyCam();
    };

    // ─── Touch: pinch-to-zoom ────────────────────────────────────────────
    const getTouchDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isPinching.current = true;
        pinchStart.current = getTouchDistance(e.touches);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching.current) {
        e.preventDefault();
        const dist = getTouchDistance(e.touches);
        const delta = dist - pinchStart.current;
        zoomLevel.current = THREE.MathUtils.clamp(
          zoomLevel.current + delta * 0.08,
          8,
          80
        );
        pinchStart.current = dist;
        applyCam();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching.current = false;
      }
    };

    document.addEventListener('pointerdown', onDown, false);
    document.addEventListener('pointermove', onMove, false);
    document.addEventListener('pointerup', onUp, false);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [gl, activePanel]);

  // Reset camera to initial home position when logo is clicked
  useEffect(() => {
    if (!shouldResetCamera || animating.current) return;
    clearResetCamera();
    animating.current = true;
    velocity.current = { x: 0, z: 0 };

    const sx = panX.current;
    const sz = panZ.current;
    const tx = 0;
    const tz = 18;
    let t = 0;

    const tick = () => {
      t += 0.022;
      if (t >= 1) {
        panX.current = tx;
        panZ.current = tz;
        targetPanX.current = tx;
        targetPanZ.current = tz;
        applyCam();
        animating.current = false;
        return;
      }
      const e = 1 - Math.pow(1 - t, 3);
      panX.current = sx + (tx - sx) * e;
      panZ.current = sz + (tz - sz) * e;
      targetPanX.current = panX.current;
      targetPanZ.current = panZ.current;
      applyCam();
      requestAnimationFrame(tick);
    };
    tick();
  }, [shouldResetCamera, clearResetCamera]);

  // Smooth camera navigation from directory menu
  useEffect(() => {
    if (!cameraTarget || animating.current) return;
    animating.current = true;
    velocity.current = { x: 0, z: 0 };

    const sx = panX.current;
    const sz = panZ.current;
    const tx = cameraTarget.x;
    const tz = cameraTarget.y;
    let t = 0;

    const tick = () => {
      t += 0.022;
      if (t >= 1) {
        panX.current = tx;
        panZ.current = tz;
        targetPanX.current = tx;
        targetPanZ.current = tz;
        applyCam();
        clearCameraTarget();
        animating.current = false;
        return;
      }
      const e = 1 - Math.pow(1 - t, 3);
      panX.current = sx + (tx - sx) * e;
      panZ.current = sz + (tz - sz) * e;
      targetPanX.current = panX.current;
      targetPanZ.current = panZ.current;
      applyCam();
      requestAnimationFrame(tick);
    };
    tick();
  }, [cameraTarget, clearCameraTarget]);

  return null;
}

export default function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        cursor: 'grab',
        background: '#2d2d2d',
      }}
    >
      <Canvas
        orthographic
        camera={{
          zoom: 35,
          position: [62, 49, 62],
          near: -1000,
          far: 2000,
        }}
        gl={{ antialias: true, alpha: false }}
        resize={{ scroll: false, offsetSize: true }}
      >
        <color attach="background" args={['#2d2d2d']} />
        <ResizeHandler />
        <CameraController />
        <Lights />
        <Suspense fallback={null}>
          <Room />
          <WallPortfolio />
          <WallServices />
          <WallMission />
          <WallBack />
          <WallHowItWorks />
          <WallOProjekte />
          <WallTeam />
          <WallEvents />
          <Furniture />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ResizeHandler() {
  const { gl, camera } = useThree();
  const lastW = useRef(0);

  useFrame(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w !== lastW.current) {
      lastW.current = w;
      gl.setSize(w, h);
      const cam = camera as THREE.OrthographicCamera;
      cam.left = -w / 2;
      cam.right = w / 2;
      cam.top = h / 2;
      cam.bottom = -h / 2;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}
