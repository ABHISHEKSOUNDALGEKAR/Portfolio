import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader so each star twinkles independently (plain PointMaterial can't
// vary brightness per-point) — cheap: one draw call for the whole field.
const starVertexShader = `
  attribute float aSize;
  attribute float aPhase;
  varying float vTwinkle;
  uniform float uTime;
  void main() {
    vTwinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aPhase * 0.4) + aPhase * 6.2831);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying float vTwinkle;
  uniform vec3 uColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

function Starfield({ count = 1600 }) {
  const points = useRef(null);
  const group = useRef(null);
  const { mouse } = useThree();

  const [positions, sizes, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      pos[i * 3 + 2] = r * Math.cos(phi) - 6;
      size[i] = Math.random() * 1.6 + 0.4;
      phase[i] = Math.random();
    }
    return [pos, size, phase];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#c7d2fe") },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (group.current) {
      // Gentle parallax toward the cursor + slow ambient drift.
      group.current.rotation.y += delta * 0.012;
      group.current.rotation.x += (mouse.y * -0.08 - group.current.rotation.x) * 0.02;
      group.current.rotation.y += (mouse.x * 0.08 * delta) || 0;
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
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
    <mesh ref={ref} visible={true}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color="#e0e7ff" transparent opacity={0} />
    </mesh>
  );
}

function Scene() {
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
  return (
    <>
      <Starfield count={isSmallScreen ? 700 : 1600} />
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
