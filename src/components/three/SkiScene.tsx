"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SNOW_COUNT = 60;

function Snow() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(SNOW_COUNT * 3);
    for (let i = 0; i < SNOW_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < SNOW_COUNT; i++) {
      let y = pos.getY(i) - delta * (0.6 + Math.sin(i) * 0.3);
      const x = pos.getX(i) + Math.sin(i + y) * delta * 0.15;
      if (y < -3) y = 3;
      pos.setY(i, y);
      pos.setX(i, x);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={SNOW_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function IoTNode({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(
        0.8 + Math.sin(clock.elapsedTime * 2 + delay) * 0.25
      );
    }
  });

  return (
    <Float speed={1.5} floatIntensity={0.2}>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

const IOT_NODES: [number, number, number][] = [
  [-1.2, 0.5, 0],
  [1.2, 0.3, 0],
  [0, -0.8, 0],
];

function IoTConnections() {
  const lines = useMemo(() => {
    const pairs = [
      [0, 1],
      [1, 2],
      [2, 0],
    ];
    return pairs.map(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...IOT_NODES[a]),
        new THREE.Vector3(...IOT_NODES[b]),
      ]);
      return new THREE.Line(
        g,
        new THREE.LineBasicMaterial({
          color: "#10b981",
          transparent: true,
          opacity: 0.15,
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
        Math.sin(clock.elapsedTime * 0.15) * 0.12 + pointer.x * 0.1;
      group.current.rotation.x = 0.08 + pointer.y * 0.05;
    }
  });

  return (
    <group ref={group}>
      <Snow />
      <IoTNode position={[-1.2, 0.5, 0]} delay={0} />
      <IoTNode position={[1.2, 0.3, 0]} delay={1.2} />
      <IoTNode position={[0, -0.8, 0]} delay={2.4} />
      <IoTConnections />
    </group>
  );
}

export default function SkiScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
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
