"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RING_COLORS = ["#10b981", "#8b5cf6", "#06b6d4", "#ec4899"];
const RING_POSITIONS: [number, number, number][] = [
  [-2.2, 0, 0],
  [-0.7, 0, 0],
  [0.8, 0, 0],
  [2.3, 0, 0],
];

function PipelineRing({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.4 + index * 0.8;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3 + index) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh ref={ref}>
        <torusGeometry args={[0.45, 0.04, 12, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[0.45, 0.08, 12, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function DataParticle({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = ((clock.elapsedTime * 0.25 + delay) % 4) / 4;
    const x = THREE.MathUtils.lerp(-2.5, 2.8, t);
    const y = Math.sin(t * Math.PI * 3) * 0.15;
    const z = Math.cos(t * Math.PI * 2) * 0.1;
    ref.current.position.set(x, y, z);
    const opacity = Math.sin(t * Math.PI) * 0.7;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, opacity);
    ref.current.scale.setScalar(0.6 + Math.sin(t * Math.PI) * 0.5);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0} />
    </mesh>
  );
}

function Connections() {
  const lines = useMemo(() => {
    return RING_POSITIONS.slice(0, -1).map((from, i) => {
      const to = RING_POSITIONS[i + 1];
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...from),
        new THREE.Vector3(...to),
      ]);
      return new THREE.Line(
        g,
        new THREE.LineBasicMaterial({
          color: "#8b5cf6",
          transparent: true,
          opacity: 0.12,
        })
      );
    });
  }, []);

  return (
    <>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.15) * 0.1 + pointer.x * 0.1;
      group.current.rotation.x = 0.1 + pointer.y * 0.05;
    }
  });

  return (
    <group ref={group}>
      {RING_POSITIONS.map((pos, i) => (
        <PipelineRing key={i} position={pos} color={RING_COLORS[i]} index={i} />
      ))}
      <Connections />
      {Array.from({ length: 12 }).map((_, i) => (
        <DataParticle key={i} delay={i * 0.33} />
      ))}
    </group>
  );
}

export default function DataPipelineScene({
  active = true,
}: {
  active?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
      frameloop={active ? "always" : "demand"}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />
      <Scene />
    </Canvas>
  );
}
