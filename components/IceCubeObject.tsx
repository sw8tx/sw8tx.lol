"use client";

import {
  Line,
  MeshTransmissionMaterial,
  RoundedBox,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type IceCubeObjectProps = {
  hasModel: boolean;
  progress: number;
  mobile: boolean;
  reducedMotion: boolean;
};

type ProceduralIceCubeProps = {
  progress: number;
  mobile: boolean;
  reducedMotion: boolean;
};

function ProceduralIceCube({ progress, mobile, reducedMotion }: ProceduralIceCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const logo = useTexture("/logo-transparent.png");
  const popWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.58) / 0.12));
  const chargeWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.44) / 0.18));

  const bubbles = useMemo(() => {
    const count = mobile ? 18 : 30;
    return Array.from({ length: count }, (_, index) => ({
      key: `bubble-${index}`,
      position: [
        Math.sin(index * 1.41) * (0.42 + (index % 4) * 0.09),
        Math.cos(index * 1.17) * (0.44 + ((index + 2) % 5) * 0.08),
        Math.sin(index * 0.73) * 0.56,
      ] as [number, number, number],
      scale: 0.018 + (index % 5) * 0.012,
    }));
  }, [mobile]);

  const crackPaths = useMemo(
    () =>
      [
        [
          [-0.54, 0.3, 0.24],
          [-0.28, 0.16, 0.17],
          [-0.04, 0.02, 0.08],
          [0.16, -0.18, -0.02],
          [0.34, -0.4, -0.1],
        ],
        [
          [0.42, 0.5, -0.12],
          [0.2, 0.24, -0.04],
          [-0.02, 0.04, 0.05],
          [-0.18, -0.14, 0.12],
          [-0.34, -0.38, 0.2],
        ],
        [
          [0.02, 0.58, 0.08],
          [0.08, 0.26, 0.11],
          [0.12, -0.06, 0.02],
          [0.08, -0.26, -0.08],
          [-0.02, -0.5, -0.16],
        ],
        [
          [-0.48, -0.06, -0.12],
          [-0.22, -0.02, -0.02],
          [0.02, 0.02, 0.05],
          [0.28, 0.06, 0.12],
          [0.5, 0.18, 0.16],
        ],
      ] as [number, number, number][][],
    [],
  );

  const chipData = useMemo(() => {
    const count = mobile ? 10 : 18;
    return Array.from({ length: count }, (_, index) => ({
      key: `chip-${index}`,
      position: [
        Math.sin(index * 1.23) * 1.15,
        Math.cos(index * 1.31) * 1.08,
        Math.sin(index * 0.97) * 1.02,
      ] as [number, number, number],
      rotation: [index * 0.7, index * 0.5, index * 0.28] as [number, number, number],
      scale: [0.03, 0.08 + (index % 4) * 0.018, 0.02] as [number, number, number],
    }));
  }, [mobile]);

  const shardData = useMemo(() => {
    const count = mobile ? 8 : 14;
    return Array.from({ length: count }, (_, index) => {
      const angle = (index / count) * Math.PI * 2;
      return {
        key: `shard-${index}`,
        position: [
          Math.cos(angle) * (0.9 + (index % 2) * 0.18),
          Math.sin(angle * 1.2) * (0.86 + (index % 3) * 0.08),
          Math.sin(angle) * 0.34,
        ] as [number, number, number],
        rotation: [angle * 0.5, angle, angle * 0.24] as [number, number, number],
        scale: [0.06, 0.38 + (index % 4) * 0.08, 0.03] as [number, number, number],
      };
    });
  }, [mobile]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const pointerX = state.pointer.x * (mobile ? 0.24 : 0.42);
    const pointerY = state.pointer.y * (mobile ? 0.18 : 0.3);
    const heroAngle = -0.32 + popWindow * 0.36;
    const targetY = progress * Math.PI * 1.26 + pointerX + popWindow * 0.4;
    const targetX = heroAngle + progress * 0.4 + pointerY;
    const targetZ = Math.sin(state.clock.elapsedTime * 0.24) * 0.1 + popWindow * 0.08;
    const targetScale = 1.08 + progress * (mobile ? 0.14 : 0.24) + popWindow * (mobile ? 0.12 : 0.2);
    const floatY = Math.sin(state.clock.elapsedTime * 0.85) * (mobile ? 0.06 : 0.11);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.8, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4.4, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, reducedMotion ? 0 : targetZ, 4.1, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : floatY, 4.4, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.3, delta));

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * (reducedMotion ? 0.02 : 0.06 + chargeWindow * 0.08);
      shellRef.current.rotation.x += delta * (reducedMotion ? 0.01 : 0.03);
    }

    if (auraRef.current) {
      auraRef.current.scale.setScalar(THREE.MathUtils.damp(auraRef.current.scale.x, 1.15 + popWindow * 0.45, 3.4, delta));
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={auraRef} position={[0, 0, -0.24]}>
        <sphereGeometry args={[1.72, 48, 48]} />
        <meshBasicMaterial color="#7cd9ff" opacity={0.1 + popWindow * 0.08} transparent />
      </mesh>

      <RoundedBox args={[2.16, 2.34, 2.08]} castShadow receiveShadow radius={0.28} smoothness={6}>
        <MeshTransmissionMaterial
          anisotropy={0.2}
          backside
          backsideThickness={0.28}
          chromaticAberration={0.05 + popWindow * 0.022}
          color="#d8f4ff"
          distortion={0.26}
          distortionScale={0.48}
          ior={1.31}
          roughness={0.1}
          temporalDistortion={0.12}
          thickness={1.24}
          transmission={1}
        />
      </RoundedBox>

      <mesh ref={shellRef}>
        <RoundedBox args={[2.28, 2.44, 2.18]} radius={0.22} smoothness={4}>
          <meshPhysicalMaterial
            color="#ebfaff"
            opacity={0.16 + chargeWindow * 0.06}
            roughness={0.78}
            transparent
          />
        </RoundedBox>
      </mesh>

      <mesh scale={[0.92, 0.98, 0.92]}>
        <RoundedBox args={[2.08, 2.18, 1.98]} radius={0.28} smoothness={4}>
          <meshPhysicalMaterial color="#63c7ff" opacity={0.08} roughness={0.36} transparent />
        </RoundedBox>
      </mesh>

      <mesh scale={[0.8, 0.86, 0.8]}>
        <RoundedBox args={[1.8, 1.94, 1.72]} radius={0.18} smoothness={4}>
          <meshPhysicalMaterial
            color="#f7fdff"
            opacity={0.08 + popWindow * 0.04}
            roughness={0.28}
            transparent
          />
        </RoundedBox>
      </mesh>

      {crackPaths.map((points, index) => (
        <Line
          color={index % 2 === 0 ? "#effcff" : "#9bdcff"}
          key={`crack-${index}`}
          lineWidth={1.35 + popWindow * 0.42}
          opacity={0.32 + chargeWindow * 0.12 + popWindow * 0.16}
          points={points}
          transparent
        />
      ))}

      {shardData.map((shard, index) => (
        <mesh key={shard.key} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color={index % 2 === 0 ? "#f5fcff" : "#bfe9ff"}
            opacity={0.12 + popWindow * 0.06}
            roughness={0.34}
            transparent
          />
        </mesh>
      ))}

      {bubbles.map((bubble, index) => (
        <mesh key={bubble.key} position={bubble.position} scale={bubble.scale * (1 + popWindow * 0.22)}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial
            color={index % 3 === 0 ? "#fafdff" : "#dff4ff"}
            opacity={0.16 + (index % 4) * 0.03}
            roughness={0.06}
            transparent
          />
        </mesh>
      ))}

      {chipData.map((chip) => (
        <mesh key={chip.key} position={chip.position} rotation={chip.rotation} scale={chip.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#f6fdff" opacity={0.1 + chargeWindow * 0.04} transparent />
        </mesh>
      ))}

      <Sparkles
        color="#d7f6ff"
        count={mobile ? 14 : 22}
        noise={0.9}
        opacity={0.3 + chargeWindow * 0.14}
        position={[0, 0, 0]}
        scale={[2.9, 3.1, 2.9]}
        size={4.5 + popWindow * 3.2}
        speed={reducedMotion ? 0.12 : 0.28 + chargeWindow * 0.46}
      />

      <Sparkles
        color="#7adfff"
        count={mobile ? 18 : 30}
        noise={1.2}
        opacity={reducedMotion ? 0.12 : 0.08 + popWindow * 0.28}
        position={[0, 0, 0]}
        scale={[4.4, 4.4, 4.4]}
        size={3.2 + popWindow * 6}
        speed={reducedMotion ? 0.2 : 0.45 + popWindow * 1.2}
      />

      <mesh position={[0, 0, 1.06]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.76, 0.76]} />
        <meshBasicMaterial alphaMap={logo} color="#fbfeff" opacity={0.82} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

export function IceCubeObject({ hasModel, progress, mobile, reducedMotion }: IceCubeObjectProps) {
  if (hasModel) {
    return <GlbIceCube mobile={mobile} progress={progress} reducedMotion={reducedMotion} />;
  }

  return <ProceduralIceCube mobile={mobile} progress={progress} reducedMotion={reducedMotion} />;
}

function GlbIceCube({
  progress,
  mobile,
  reducedMotion,
}: {
  progress: number;
  mobile: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/icecube.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const popWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.58) / 0.12));
  const chargeWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.44) / 0.18));

  useMemo(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d6f0ff"),
        transmission: 1,
        thickness: 1.1,
        roughness: 0.14,
        ior: 1.31,
        transparent: true,
        opacity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
      });
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const pointerX = state.pointer.x * (mobile ? 0.22 : 0.36);
    const pointerY = state.pointer.y * (mobile ? 0.16 : 0.28);
    const targetY = progress * Math.PI * 1.18 + pointerX + popWindow * 0.32;
    const targetX = -0.22 + progress * 0.36 + pointerY + popWindow * 0.18;
    const targetScale = 1.06 + progress * 0.12 + popWindow * 0.14;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.6, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4.2, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.32) * 0.05, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.08, 4, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.2, delta));

    if (shellRef.current) {
      shellRef.current.rotation.y += delta * (0.04 + chargeWindow * 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
      <group ref={shellRef}>
        <Sparkles
          color="#d7f6ff"
          count={mobile ? 16 : 28}
          noise={1}
          opacity={0.18 + popWindow * 0.24}
          scale={[4, 4, 4]}
          size={3.5 + popWindow * 3.4}
          speed={reducedMotion ? 0.16 : 0.36 + chargeWindow * 0.9}
        />
      </group>
    </group>
  );
}
