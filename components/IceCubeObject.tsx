"use client";

import { Detailed, Line, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type IceCubeObjectProps = {
  hasModel: boolean;
  hovered: boolean;
  progress: import("framer-motion").MotionValue<number>;
  mobile: boolean;
  reducedMotion: boolean;
  selected: boolean;
  onHoverChange: (value: boolean) => void;
  onSelect: (value: boolean) => void;
};

type ProceduralIcebergProps = Omit<IceCubeObjectProps, "hasModel">;

function createIcebergGeometry(detail: number) {
  const geometry = new THREE.IcosahedronGeometry(1.16, detail);
  const position = geometry.attributes.position;
  const vector = new THREE.Vector3();
  const base = new THREE.Vector3();

  for (let index = 0; index < position.count; index += 1) {
    vector.fromBufferAttribute(position, index);
    base.copy(vector).normalize();

    const ridge =
      Math.sin(base.x * 4.7) * 0.08 +
      Math.cos(base.y * 6.1) * 0.06 +
      Math.sin(base.z * 5.4) * 0.08;
    const facet = Math.abs(Math.sin(base.x * 9.2 + base.y * 6.8 - base.z * 4.6)) * 0.06;
    const verticalBias = base.y > 0 ? base.y * 0.16 : base.y * 0.05;
    const radius = 0.9 + ridge + facet + verticalBias;
    const cutA = base.x > 0.18 && base.y > 0.08 ? 0.92 : 1;
    const cutB = base.z < -0.16 && base.y < 0.1 ? 0.94 : 1;

    vector.set(
      base.x * radius * 1.02 * cutA,
      base.y * radius * 1.14 * cutB,
      base.z * radius * 0.88,
    );

    if (vector.y < -0.34) {
      vector.y *= 0.82;
      vector.x *= 1.08;
      vector.z *= 1.05;
    }

    position.setXYZ(index, vector.x, vector.y, vector.z);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function createFrostTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.fillStyle = "#7fd8ff";
  context.fillRect(0, 0, size, size);

  for (let index = 0; index < 18; index += 1) {
    context.strokeStyle = `rgba(255,255,255,${0.05 + (index % 4) * 0.03})`;
    context.lineWidth = 1 + (index % 3);
    context.beginPath();
    context.moveTo((index * 17) % size, 0);
    context.lineTo((index * 37 + 80) % size, size);
    context.stroke();
  }

  for (let index = 0; index < 220; index += 1) {
    const x = (Math.sin(index * 12.3) * 0.5 + 0.5) * size;
    const y = (Math.cos(index * 7.1) * 0.5 + 0.5) * size;
    const radius = 1 + (index % 3);
    context.fillStyle = `rgba(255,255,255,${0.02 + (index % 5) * 0.012})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.35, 1.35);
  texture.needsUpdate = true;
  return texture;
}

function ProceduralIceberg({
  hovered,
  progress,
  mobile,
  reducedMotion,
  selected,
  onHoverChange,
  onSelect,
}: ProceduralIcebergProps) {
  const groupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const hudRef = useRef<THREE.Group>(null);
  const detailRef = useRef<THREE.Group>(null);
  const logo = useTexture("/logo-transparent.png");
  const frostMap = useMemo(() => createFrostTexture(), []);
  const geometries = useMemo(
    () => ({
      high: createIcebergGeometry(mobile ? 3 : 4),
      medium: createIcebergGeometry(3),
      low: createIcebergGeometry(2),
    }),
    [mobile],
  );
  const crackPaths = useMemo(
    () =>
      [
        [
          [-0.42, 0.48, 0.34],
          [-0.2, 0.24, 0.24],
          [0.04, 0.02, 0.13],
          [0.2, -0.16, 0.04],
          [0.28, -0.34, -0.02],
        ],
        [
          [0.5, 0.34, 0.08],
          [0.22, 0.18, 0.04],
          [-0.02, 0.04, 0.04],
          [-0.18, -0.18, 0.08],
          [-0.26, -0.38, 0.14],
        ],
        [
          [-0.18, 0.62, 0.16],
          [-0.08, 0.32, 0.14],
          [0.02, 0.04, 0.05],
          [0.08, -0.18, -0.04],
          [0.1, -0.46, -0.1],
        ],
      ] as [number, number, number][][],
    [],
  );
  const progressValue = progress.get();
  const popWindow = Math.max(0, 1 - Math.min(1, Math.abs(progressValue - 0.58) / 0.12));
  const hoverBoost = hovered || selected ? 1 : 0;

  useEffect(() => {
    return () => {
      frostMap.dispose();
      geometries.high.dispose();
      geometries.medium.dispose();
      geometries.low.dispose();
    };
  }, [frostMap, geometries]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progressNow = progress.get();
    const pop = Math.max(0, 1 - Math.min(1, Math.abs(progressNow - 0.58) / 0.12));
    const pointerX = state.pointer.x * (mobile ? 0.18 : 0.28);
    const pointerY = state.pointer.y * (mobile ? 0.14 : 0.22);
    const hoverAmount = hovered || selected ? 1 : 0;
    const targetY = progressNow * Math.PI * 1.08 + pointerX + hoverAmount * 0.22 + pop * 0.2;
    const targetX = -0.2 + progressNow * 0.18 + pointerY + hoverAmount * 0.08;
    const targetZ = Math.sin(state.clock.elapsedTime * 0.26) * 0.04;
    const targetScale = 1.02 + progressNow * (mobile ? 0.08 : 0.14) + hoverAmount * 0.05 + pop * 0.08;
    const floatY = Math.sin(state.clock.elapsedTime * 0.72) * (mobile ? 0.045 : 0.08);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.6, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4.2, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, reducedMotion ? 0 : targetZ, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : floatY, 4.2, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.2, delta));

    if (auraRef.current) {
      auraRef.current.scale.setScalar(THREE.MathUtils.damp(auraRef.current.scale.x, 1.08 + hoverAmount * 0.24 + pop * 0.12, 3.2, delta));
    }

    if (hudRef.current) {
      hudRef.current.rotation.z += delta * (hoverAmount ? 0.08 : 0.03);
    }

    if (detailRef.current) {
      detailRef.current.rotation.y += delta * (reducedMotion ? 0.02 : 0.04 + hoverAmount * 0.04);
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(!selected);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHoverChange(false);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHoverChange(true);
      }}
    >
      <mesh ref={auraRef} position={[0, 0, -0.18]} frustumCulled={false}>
        <sphereGeometry args={[1.62, 22, 22]} />
        <meshBasicMaterial color="#7cd9ff" opacity={0.08 + hoverBoost * 0.06 + popWindow * 0.04} transparent />
      </mesh>

      <Detailed distances={mobile ? [0, 7.5, 11] : [0, 9, 14]}>
        {[geometries.high, geometries.medium, geometries.low].map((geometry, index) => (
          <group key={`lod-${index}`}>
            <mesh castShadow frustumCulled geometry={geometry} receiveShadow>
              <meshPhysicalMaterial
                bumpMap={frostMap}
                bumpScale={0.03}
                clearcoat={1}
                clearcoatRoughness={0.12}
                color="#d8f4ff"
                envMapIntensity={1.15}
                ior={1.31}
                opacity={0.96}
                roughness={0.18}
                thickness={1.4}
                transparent
                transmission={0.92}
              />
            </mesh>

            <mesh frustumCulled geometry={geometry} scale={[0.94, 0.94, 0.94]}>
              <meshPhysicalMaterial
                color="#f7fdff"
                envMapIntensity={0.92}
                opacity={0.16 + hoverBoost * 0.04}
                roughness={0.3}
                thickness={0.9}
                transparent
                transmission={0.68}
              />
            </mesh>

            <mesh frustumCulled geometry={geometry} scale={[1.02, 1.02, 1.02]}>
              <meshPhysicalMaterial
                alphaMap={frostMap}
                color="#ebfaff"
                opacity={0.1 + hoverBoost * 0.05}
                roughness={0.7}
                transparent
              />
            </mesh>
          </group>
        ))}
      </Detailed>

      <group ref={detailRef}>
        {crackPaths.map((points, index) => (
          <Line
            color={index % 2 === 0 ? "#effcff" : "#9bdcff"}
            key={`crack-${index}`}
            lineWidth={1.2 + hoverBoost * 0.26}
            opacity={0.24 + hoverBoost * 0.16}
            points={points}
            transparent
          />
        ))}
      </group>

      <group ref={hudRef}>
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} frustumCulled={false}>
          <torusGeometry args={[1.44, 0.007, 10, 96]} />
          <meshBasicMaterial color="#effcff" opacity={0.12 + hoverBoost * 0.14} transparent />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]} frustumCulled={false}>
          <torusGeometry args={[1.14, 0.006, 10, 80]} />
          <meshBasicMaterial color="#effcff" opacity={0.08 + hoverBoost * 0.12} transparent />
        </mesh>
      </group>

      <Sparkles
        color="#d7f6ff"
        count={mobile ? 12 : 18}
        noise={0.85}
        opacity={0.16 + hoverBoost * 0.08}
        scale={[3.1, 3.2, 3.1]}
        size={3.2 + hoverBoost * 1.6}
        speed={reducedMotion ? 0.08 : 0.18 + hoverBoost * 0.24}
      />

      <mesh position={[0.04, 0.02, 0.9]} rotation={[0.04, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial alphaMap={logo} color="#fbfeff" opacity={0.18 + hoverBoost * 0.06} toneMapped={false} transparent />
      </mesh>
    </group>
  );
}

function GlbIceberg({
  hovered,
  progress,
  mobile,
  reducedMotion,
  selected,
  onHoverChange,
  onSelect,
}: ProceduralIcebergProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/iceberg.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useMemo(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.castShadow = true;
      child.receiveShadow = true;
      child.frustumCulled = true;
      child.material = new THREE.MeshPhysicalMaterial({
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        color: new THREE.Color("#d6f0ff"),
        envMapIntensity: 1.05,
        ior: 1.31,
        roughness: 0.16,
        thickness: 1.25,
        transparent: true,
        transmission: 0.92,
      });
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progressNow = progress.get();
    const hoverAmount = hovered || selected ? 1 : 0;
    const pointerX = state.pointer.x * (mobile ? 0.18 : 0.28);
    const pointerY = state.pointer.y * (mobile ? 0.14 : 0.22);
    const targetY = progressNow * Math.PI * 1.02 + pointerX + hoverAmount * 0.2;
    const targetX = -0.2 + progressNow * 0.18 + pointerY;
    const targetScale = 1.02 + progressNow * 0.12 + hoverAmount * 0.06;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4.1, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.24) * 0.04,
      4,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.62) * 0.08,
      4,
      delta,
    );
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.1, delta));
  });

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(!selected);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHoverChange(false);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHoverChange(true);
      }}
    >
      <primitive object={clonedScene} />
      <Sparkles
        color="#d7f6ff"
        count={mobile ? 10 : 16}
        noise={0.8}
        opacity={0.16 + (hovered || selected ? 0.08 : 0)}
        scale={[3.2, 3.2, 3.2]}
        size={3 + (hovered || selected ? 1.6 : 0)}
        speed={reducedMotion ? 0.1 : 0.2}
      />
    </group>
  );
}

export function IceCubeObject(props: IceCubeObjectProps) {
  if (props.hasModel) {
    return <GlbIceberg {...props} />;
  }

  return <ProceduralIceberg {...props} />;
}
