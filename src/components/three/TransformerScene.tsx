"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Block({
  position,
  color,
  width = 2,
  height = 0.35,
}: {
  position: [number, number, number];
  color: string;
  width?: number;
  height?: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width, height, 0.5]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.18}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>
      <primitive
        object={
          new THREE.LineSegments(
            new THREE.EdgesGeometry(new THREE.BoxGeometry(width, height, 0.5)),
            new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })
          )
        }
      />
    </group>
  );
}

function QKV({ position }: { position: [number, number, number] }) {
  const colors = ["#c084fc", "#22d3ee", "#fb923c"];
  const labels = ["Q", "K", "V"];
  return (
    <group position={position}>
      {labels.map((_, i) => (
        <Float key={i} speed={1.5} floatIntensity={0.1}>
          <mesh position={[(i - 1) * 0.5, 0, 0]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial
              color={colors[i]}
              transparent
              opacity={0.25}
              metalness={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function FlowLine({ y1, y2 }: { y1: number; y2: number }) {
  const obj = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, y1, 0),
      new THREE.Vector3(0, y2, 0),
    ]);
    return new THREE.Line(
      g,
      new THREE.LineBasicMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.2 })
    );
  }, [y1, y2]);
  return <primitive object={obj} />;
}

function Pulse({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = ((clock.elapsedTime * 0.4 + delay) % 3) / 3;
      ref.current.position.y = THREE.MathUtils.lerp(-2, 2.4, t);
      const s = Math.sin(t * Math.PI);
      ref.current.scale.setScalar(s);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = s * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#a855f7" transparent opacity={0} />
    </mesh>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock, pointer }) => {
    if (group.current) {
      group.current.rotation.y =
        Math.sin(clock.elapsedTime * 0.2) * 0.15 + pointer.x * 0.12;
      group.current.rotation.x = pointer.y * 0.06;
    }
  });

  return (
    <group ref={group} position={[0, 0.2, 0]}>
      <Block position={[0, -2, 0]} color="#10b981" width={1.8} height={0.3} />
      <FlowLine y1={-1.83} y2={-1.55} />
      <Block position={[0, -1.4, 0]} color="#8b5cf6" width={1.8} height={0.25} />
      <FlowLine y1={-1.25} y2={-0.85} />
      <Block position={[0, -0.6, 0]} color="#a855f7" />
      <QKV position={[0, -0.1, 0.4]} />
      <FlowLine y1={-0.4} y2={0.05} />
      <Block position={[0, 0.3, 0]} color="#06b6d4" />
      <FlowLine y1={0.5} y2={0.8} />
      <Block position={[0, 1.05, 0]} color="#ec4899" />
      <FlowLine y1={1.25} y2={1.5} />
      <Block position={[0, 1.7, 0]} color="#f97316" />
      <FlowLine y1={1.9} y2={2.1} />
      <Block position={[0, 2.35, 0]} color="#10b981" width={1.8} height={0.3} />

      <Pulse delay={0} />
      <Pulse delay={1} />
      <Pulse delay={2} />
    </group>
  );
}

export default function TransformerScene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.4} />
        <Scene />
      </Canvas>
    </div>
  );
}
