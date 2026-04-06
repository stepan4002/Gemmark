'use client';

// High ambient light makes walls appear pure white with meshStandardMaterial.
// A subtle directional light adds just enough shadow to read the 3D depth.
export default function Lights() {
  return (
    <>
      <ambientLight intensity={2.8} />
      <directionalLight
        position={[30, 40, 30]}
        intensity={0.25}
        castShadow={false}
      />
      {/* Fill light from the opposite side so back walls stay bright */}
      <directionalLight position={[-20, 20, -20]} intensity={0.15} />
    </>
  );
}
