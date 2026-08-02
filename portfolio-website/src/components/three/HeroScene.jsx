import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function makeStarPositions(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    arr[i * 3 + 2] = r * Math.cos(phi) - 6;
  }
  return arr;
}

// Two layers with different sizes/phases fading in and out of sync give a
// convincing twinkle without needing a custom per-vertex shader.
function StarLayer({ count, size, color, speed, phase = 0 }) {
  const material = useRef(null);
  const group = useRef(null);
  const positions = useMemo(() => makeStarPositions(count), [count]);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (material.current) {
      material.current.opacity =
        0.45 + 0.4 * Math.sin(state.clock.elapsedTime * speed + phase);
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.012;
      group.current.rotation.x += ((pointer?.y || 0) * -0.08 - group.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={material}
          transparent
          color={color}
          size={size}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// A single streak that periodically shoots across the sky.
function ShootingStar() {
  const ref = useRef(null);
  const state = useRef({ t: 2 + Math.random() * 4, active: false });

  useFrame((_, delta) => {
    const s = state.current;
    s.t -= delta;
    if (!s.active && s.t <= 0) {
      s.active = true;
      s.progress = 0;
      s.start = new THREE.Vector3(-6 + Math.random() * 3, 3 + Math.random() * 2, -5);
      s.end = new THREE.Vector3(s.start.x + 5, s.start.y - 3, -5);
    }
    if (s.active && ref.current) {
      s.progress += delta * 0.9;
      const p = Math.min(1, s.progress);
      ref.current.position.lerpVectors(s.start, s.end, p);
      ref.current.material.opacity = p < 0.15 ? p / 0.15 : 1 - (p - 0.15) / 0.85;
      if (p >= 1) {
        s.active = false;
        s.t = 6 + Math.random() * 8;
      }
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color="#e0e7ff" transparent opacity={0} />
    </mesh>
  );
}

function Scene() {
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
  const base = isSmallScreen ? 500 : 1100;
  return (
    <>
      <StarLayer count={base} size={0.045} color="#c7d2fe" speed={0.5} phase={0} />
      <StarLayer count={Math.round(base * 0.4)} size={0.08} color="#a5b4fc" speed={0.35} phase={2} />
      <ShootingStar />
    </>
  );
}

export default function HeroScene() {
  // Respect reduced-motion preference and skip the 3D scene entirely —
  // the CSS gradient/grid backdrop in Hero.jsx still provides visual interest.
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
