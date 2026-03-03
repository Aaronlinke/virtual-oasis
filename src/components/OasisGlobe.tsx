import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import { OrbitControls, Text, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface SectorNode {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
}

const sectorNodes: SectorNode[] = [
  { id: "arena", name: "Spielarena", position: [2, 1.2, 0], color: "hsl(185, 100%, 50%)" },
  { id: "marketplace", name: "Marktplatz", position: [-1.8, 0.5, 1.5], color: "hsl(300, 100%, 60%)" },
  { id: "social", name: "Sozialer Hub", position: [0.5, -1.5, 1.8], color: "hsl(220, 100%, 60%)" },
  { id: "creative", name: "Kreativzone", position: [-1, 1.8, -1], color: "hsl(150, 100%, 50%)" },
  { id: "quest", name: "Questland", position: [1.5, -0.5, -1.8], color: "hsl(30, 100%, 55%)" },
  { id: "arcade", name: "Arcade", position: [-0.3, -1.8, -1.5], color: "hsl(185, 100%, 50%)" },
];

function Planet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.3, 4]} />
      <MeshDistortMaterial
        color="#0a1628"
        emissive="#00e5ff"
        emissiveIntensity={0.15}
        wireframe
        distort={0.2}
        speed={2}
        roughness={0.4}
      />
    </mesh>
  );
}

function SectorOrb({ node, onClick, isHovered, onHover }: {
  node: SectorNode;
  onClick: (id: string) => void;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const threeColor = useMemo(() => new THREE.Color(node.color), [node.color]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), delta * 8);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={node.position}>
        <mesh
          ref={meshRef}
          onClick={() => onClick(node.id)}
          onPointerEnter={() => onHover(node.id)}
          onPointerLeave={() => onHover(null)}
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color={threeColor}
            emissive={threeColor}
            emissiveIntensity={isHovered ? 1.5 : 0.6}
            toneMapped={false}
          />
        </mesh>
        {/* glow */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color={threeColor} transparent opacity={isHovered ? 0.25 : 0.08} />
        </mesh>
        {isHovered && (
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font={undefined}
          >
            {node.name}
          </Text>
        )}
      </group>
    </Float>
  );
}

function ConnectionLines() {
  const points = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = 0; i < sectorNodes.length; i++) {
      for (let j = i + 1; j < sectorNodes.length; j++) {
        const a = new THREE.Vector3(...sectorNodes[i].position);
        const b = new THREE.Vector3(...sectorNodes[j].position);
        if (a.distanceTo(b) < 4) {
          lines.push([a, b]);
        }
      }
    }
    return lines;
  }, []);

  return (
    <>
      {points.map((pair, i) => {
        const geom = new THREE.BufferGeometry().setFromPoints(pair);
        return (
          <primitive key={i} object={new THREE.Line(geom, new THREE.LineBasicMaterial({ color: "#00e5ff", transparent: true, opacity: 0.12 }))} />
        );
      })}
    </>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00e5ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function OasisGlobe({ onSectorClick }: { onSectorClick: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="h-[350px] w-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#e040fb" />

        <Planet />
        <ConnectionLines />
        <Particles />

        {sectorNodes.map((node) => (
          <SectorOrb
            key={node.id}
            node={node}
            onClick={onSectorClick}
            isHovered={hovered === node.id}
            onHover={setHovered}
          />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>
    </div>
  );
}
