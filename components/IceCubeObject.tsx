"use client";

import { useTexture, RoundedBox, Line, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ProceduralIceCube({
  progress,
  mobile,
  reducedMotion,
}: {
  progress: number;
  mobile: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const logo = useTexture("/logo-transparent.png");
  const bubbles = useMemo(() => {
    const count = mobile ? 10 : 18;
    return Array.from({ length: count }, (_, index) => ({
      key: `bubble-${index}`,
      position: [
        Math.sin(index * 1.7) * 0.65,
        Math.cos(index * 1.2) * 0.7,
        ((index % 6) - 3) * 0.16,
      ] as [number, number, number],
      scale: 0.028 + (index % 4) * 0.012,
    }));
  }, [mobile]);

  const crackPaths = useMemo(
    () => [
      [
        [-0.42, 0.18, 0.2],
        [-0.14, 0.04, 0.12],
        [0.06, -0.12, 0.04],
        [0.24, -0.3, -0.02],
      ],
      [
        [0.26, 0.36, -0.08],
        [0.06, 0.12, -0.02],
        [-0.08, -0.08, 0.08],
        [-0.22, -0.3, 0.16],
      ],
    ] as [number, number, number][][],
    [],
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetY = progress * Math.PI * 1.2 + state.pointer.x * 0.22;
    const targetX = -0.18 + progress * 0.5 + state.pointer.y * 0.18;
    const targetScale = 1 + progress * (mobile ? 0.1 : 0.18);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.35) * 0.06, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.08, 4, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[2.1, 2.1, 2.1]} castShadow receiveShadow radius={0.26} smoothness={5}>
        <MeshTransmissionMaterial
          chromaticAberration={0.02}
          color="#c9ebff"
          distortion={0.12}
          ior={1.31}
          roughness={0.18}
          temporalDistortion={0.04}
          thickness={1}
          transmission={1}
        />
      </RoundedBox>

      <RoundedBox args={[2.14, 2.14, 2.14]} radius={0.28} smoothness={3}>
        <meshPhysicalMaterial color="#9ccfff" opacity={0.14} roughness={0.62} transparent />
      </RoundedBox>

      {crackPaths.map((points, index) => (
        <Line color={index === 0 ? "#dff6ff" : "#b5deff"} key={`crack-${index}`} lineWidth={1.2} points={points} transparent opacity={0.45} />
      ))}

      {bubbles.map((bubble) => (
        <mesh key={bubble.key} position={bubble.position} scale={bubble.scale}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" opacity={0.28} roughness={0.1} transparent />
        </mesh>
      ))}

      <mesh position={[0, 0, 1.05]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial alphaMap={logo} color="#f8fbff" opacity={0.7} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

export function IceCubeObject({
  hasModel,
  progress,
  mobile,
  reducedMotion,
}: {
  hasModel: boolean;
  progress: number;
  mobile: boolean;
  reducedMotion: boolean;
}) {
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
  const { scene } = useGLTF("/models/icecube.glb");
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetY = progress * Math.PI * 1.2 + state.pointer.x * 0.18;
    const targetX = -0.16 + progress * 0.44 + state.pointer.y * 0.16;
    const targetScale = mobile ? 1.02 : 1.12;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.05, 4, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
  });

  return <primitive object={clonedScene} ref={groupRef} />;
}
