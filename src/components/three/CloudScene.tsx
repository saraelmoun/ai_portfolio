"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CubeData {
  scattered: THREE.Vector3;
  assembled: THREE.Vector3;
  size: [number, number, number];
  color: string;
}

function CloudCube({
  data,
  active,
}: {
  data: CubeData;
  active: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const target = active ? data.assembled : data.scattered;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, target.x, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, target.y, 0.04);
    ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, target.z, 0.04);
  });

  const edges = useMemo(
    () =>
      new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(...data.size)),
        new THREE.LineBasicMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.5,
        })
      ),
    [data.size, data.color]
  );

  return (
    <group ref={ref} position={data.scattered.toArray() as [number, number, number]}>
      <mesh>
        <boxGeometry args={data.size} />
        <meshStandardMaterial
          color={data.color}
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      <primitive object={edges} />
    </group>
  );
}

function Orbiter() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * 0.8;
      ref.current.position.set(Math.cos(t) * 1.5, Math.sin(t) * 0.8, Math.sin(t * 0.7) * 0.5);
      (ref.current.material as THREE.MeshBasicMaterial).opacity =
        0.5 + Math.sin(t * 2) * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} />
    </mesh>
  );
}

function Scene({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  const cubes: CubeData[] = useMemo(
    () => [
      { scattered: new THREE.Vector3(-2.5, 1.8, -1), assembled: new THREE.Vector3(-0.6, 0.5, 0), size: [0.5, 0.5, 0.5], color: "#8b5cf6" },
      { scattered: new THREE.Vector3(2.2, -1.5, 0.5), assembled: new THREE.Vector3(0.6, 0.5, 0), size: [0.5, 0.5, 0.5], color: "#a855f7" },
      { scattered: new THREE.Vector3(-1.8, -2, 1), assembled: new THREE.Vector3(-0.6, -0.5, 0), size: [0.5, 0.5, 0.5], color: "#c084fc" },
      { scattered: new THREE.Vector3(2.8, 1.2, -0.5), assembled: new THREE.Vector3(0.6, -0.5, 0), size: [0.5, 0.5, 0.5], color: "#06b6d4" },
      { scattered: new THREE.Vector3(-0.5, 2.5, 0.8), assembled: new THREE.Vector3(0, 0, 0.5), size: [0.4, 0.4, 0.4], color: "#22d3ee" },
      { scattered: new THREE.Vector3(1.5, -2.5, -0.8), assembled: new THREE.Vector3(0, 0, -0.5), size: [0.4, 0.4, 0.4], color: "#7c3aed" },
      { scattered: new THREE.Vector3(-3, 0, 1.2), assembled: new THREE.Vector3(-0.3, 0, 0), size: [0.35, 0.8, 0.35], color: "#6366f1" },
      { scattered: new THREE.Vector3(3, 0.5, -1.2), assembled: new THREE.Vector3(0.3, 0, 0), size: [0.35, 0.8, 0.35], color: "#818cf8" },
    ],
    []
  );

  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.12) * 0.15 + pointer.x * 0.12;
      group.current.rotation.x = 0.1 + pointer.y * 0.06;
    }
  });

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <CloudCube key={i} data={c} active={active} />
      ))}
      <Orbiter />
    </group>
  );
}

export default function CloudScene({ active = false }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={1}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
      frameloop="always"
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.4} />
      <Scene active={active} />
    </Canvas>
  );
}
