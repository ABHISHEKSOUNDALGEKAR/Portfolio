import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";

// Animated particle field drifting behind the hero copy.
function ParticleField({ count = 900 }) {
  const points = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.03;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
}

function WireframeShape({ position, geometry: Geo, scale = 1, color, speed = 1 }) {
  const mesh = useRef(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.12 * speed;
    mesh.current.rotation.y += delta * 0.18 * speed;
  });
  return (
    <Float speed={1.2 * speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={mesh} position={position} scale={scale}>
        <Geo />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ParticleField />
      <WireframeShape
        position={[3.2, 1, -2]}
        geometry={() => <icosahedronGeometry args={[1.15, 0]} />}
        color="#6366f1"
        speed={0.8}
      />
      <WireframeShape
        position={[-3.4, -1.1, -3]}
        geometry={() => <octahedronGeometry args={[0.9, 0]} />}
        color="#22d3ee"
        speed={1.1}
      />
      <WireframeShape
        position={[2.2, -1.6, -4]}
        geometry={() => <torusGeometry args={[0.55, 0.18, 8, 24]} />}
        color="#a855f7"
        speed={0.6}
      />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
