"use client";

import { Detailed, Line, Sparkles, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type IceCubeObjectProps = {
  hasModel: boolean;
  hovered: boolean;
};

type ProceduralIcebergProps = Omit<IceCubeObjectProps, "hasModel">;

function createIcebergGeometry(detail: number) {
  const geometry = new THREE.IcosahedronGeometry(1.14, detail);
  const position = geometry.attributes.position;
  const vector = new THREE.Vector3();
  const normal = new THREE.Vector3();

  for (let index = 0; index < position.count; index += 1) {
    vector.fromBufferAttribute(position, index);
    normal.copy(vector).normalize();

    const ridgeA = Math.sin(normal.x * 5.2 + normal.y * 2.1) * 0.08;
    const ridgeB = Math.cos(normal.y * 7.8 - normal.z * 3.4) * 0.07;
    const facet = Math.abs(Math.sin(normal.x * 11.4 - normal.z * 8.2)) * 0.08;
    const verticalBias = normal.y > 0 ? normal.y * 0.18 : normal.y * 0.08;
    const sideCut = normal.x > 0.22 && normal.y > -0.08 ? 0.9 : 1;
    const rearCut = normal.z < -0.18 ? 0.92 : 1;
    const peakLift = normal.y > 0.45 ? 1 + normal.y * 0.12 : 1;
    const radius = (0.88 + ridgeA + ridgeB + facet + verticalBias) * sideCut * rearCut;

    vector.set(
      normal.x * radius * 1.06,
      normal.y * radius * 1.18 * peakLift,
      normal.z * radius * 0.86,
    );

    if (vector.y < -0.28) {
      vector.y *= 0.8;
      vector.x *= 1.16;
      vector.z *= 1.12;
    }

    if (vector.x < -0.32 && vector.y > 0) {
      vector.x *= 0.9;
      vector.y *= 1.04;
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

  context.fillStyle = "#89d7ff";
  context.fillRect(0, 0, size, size);

  for (let index = 0; index < 22; index += 1) {
    const startX = ((index * 31) % size) + (index % 2) * 12;
    const startY = (index * 13) % size;
    context.strokeStyle = `rgba(255,255,255,${0.03 + (index % 5) * 0.02})`;
    context.lineWidth = 0.8 + (index % 3) * 0.65;
    context.beginPath();
    context.moveTo(startX, startY);
    context.bezierCurveTo(
      (startX + 24 + index * 3) % size,
      (startY + 36) % size,
      (startX + 92) % size,
      (startY + 104) % size,
      (startX + 120) % size,
      (startY + 148) % size,
    );
    context.stroke();
  }

  for (let index = 0; index < 280; index += 1) {
    const x = (Math.sin(index * 4.8) * 0.5 + 0.5) * size;
    const y = (Math.cos(index * 6.3) * 0.5 + 0.5) * size;
    const radius = 0.8 + (index % 3) * 0.7;
    context.fillStyle = `rgba(255,255,255,${0.018 + (index % 4) * 0.012})`;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.4, 1.4);
  texture.needsUpdate = true;
  return texture;
}

function createDustPositions(count: number) {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const angle = index * 2.13;
    const radius = 0.28 + ((index * 17) % 100) / 100 * 0.62;
    positions[stride] = Math.cos(angle) * radius * 0.92;
    positions[stride + 1] = Math.sin(angle * 1.37) * radius * 0.88;
    positions[stride + 2] = Math.cos(angle * 0.83) * radius * 0.74;
  }

  return positions;
}

function createShardTransforms(count: number) {
  const dummy = new THREE.Object3D();

  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    dummy.position.set(
      Math.cos(angle) * (0.86 + (index % 3) * 0.09),
      Math.sin(angle * 1.6) * (0.72 + (index % 2) * 0.08),
      Math.sin(angle) * 0.34,
    );
    dummy.rotation.set(angle * 0.56, angle * 1.12, angle * 0.34 + (index % 2) * 0.2);
    const scale = 0.05 + (index % 4) * 0.018;
    dummy.scale.set(scale, scale * (2.4 + (index % 2) * 0.5), scale * 0.82);
    dummy.updateMatrix();
    return dummy.matrix.clone();
  });
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
  const shardRef = useRef<THREE.InstancedMesh>(null);
  const logo = useTexture("/logo-transparent.png");
  const frostMap = useMemo(() => createFrostTexture(), []);
  const shardMatrices = useMemo(() => createShardTransforms(mobile ? 10 : 16), [mobile]);
  const dustPositions = useMemo(() => createDustPositions(mobile ? 26 : 44), [mobile]);
  const geometries = useMemo(
    () => ({
      high: createIcebergGeometry(mobile ? 3 : 4),
      medium: createIcebergGeometry(3),
      low: createIcebergGeometry(2),
      shard: new THREE.TetrahedronGeometry(1, 0),
    }),
    [mobile],
  );
  const crackPaths = useMemo(
    () =>
      [
        [
          [-0.46, 0.48, 0.26],
          [-0.22, 0.24, 0.19],
          [0.04, 0.05, 0.1],
          [0.22, -0.12, 0.02],
          [0.36, -0.28, -0.04],
        ],
        [
          [0.48, 0.36, 0.02],
          [0.18, 0.18, 0.04],
          [-0.06, 0.06, 0.06],
          [-0.2, -0.14, 0.12],
          [-0.32, -0.34, 0.18],
        ],
        [
          [-0.16, 0.66, 0.12],
          [-0.1, 0.32, 0.1],
          [0.02, 0.04, 0.03],
          [0.12, -0.2, -0.02],
          [0.16, -0.46, -0.08],
        ],
      ] as [number, number, number][][],
    [],
  );

  useEffect(() => {
    shardMatrices.forEach((matrix, index) => {
      shardRef.current?.setMatrixAt(index, matrix);
    });

    if (shardRef.current) {
      shardRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [shardMatrices]);

  useEffect(() => {
    return () => {
      frostMap.dispose();
      geometries.high.dispose();
      geometries.medium.dispose();
      geometries.low.dispose();
      geometries.shard.dispose();
    };
  }, [frostMap, geometries]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progressNow = progress.get();
    const pop = Math.max(0, 1 - Math.min(1, Math.abs(progressNow - 0.58) / 0.12));
    const pointerX = state.pointer.x * (mobile ? 0.18 : 0.28);
    const pointerY = state.pointer.y * (mobile ? 0.14 : 0.22);
    const hoverAmount = hovered || selected ? 1 : 0;
    const targetY = progressNow * Math.PI * 1.04 + pointerX + hoverAmount * 0.18 + pop * 0.16;
    const targetX = -0.18 + progressNow * 0.16 + pointerY + hoverAmount * 0.06;
    const targetZ = Math.sin(state.clock.elapsedTime * 0.24) * 0.035;
    const targetScale = 1.02 + progressNow * (mobile ? 0.06 : 0.12) + hoverAmount * 0.05 + pop * 0.06;
    const floatY = Math.sin(state.clock.elapsedTime * 0.68) * (mobile ? 0.042 : 0.072);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4.1, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, reducedMotion ? 0 : targetZ, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, reducedMotion ? 0 : floatY, 4.1, delta);
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4.1, delta));

    if (auraRef.current) {
      auraRef.current.scale.setScalar(
        THREE.MathUtils.damp(auraRef.current.scale.x, 1.06 + hoverAmount * 0.22 + pop * 0.08, 3.1, delta),
      );
    }

    if (hudRef.current) {
      hudRef.current.rotation.z += delta * (hoverAmount ? 0.07 : 0.025);
    }

    if (detailRef.current) {
      detailRef.current.rotation.y += delta * (reducedMotion ? 0.014 : 0.03 + hoverAmount * 0.03);
    }

    if (shardRef.current && !reducedMotion) {
      shardRef.current.rotation.y += delta * (0.04 + hoverAmount * 0.05);
    }
  });

  const hoverBoost = hovered || selected ? 1 : 0;

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
      <mesh ref={auraRef} position={[0, -0.02, -0.18]} frustumCulled={false}>
        <sphereGeometry args={[1.62, 18, 18]} />
        <meshBasicMaterial color="#7cd9ff" opacity={0.07 + hoverBoost * 0.06} transparent />
      </mesh>

      <Detailed distances={mobile ? [0, 7, 10.5] : [0, 8.5, 13.5]}>
        {[geometries.high, geometries.medium, geometries.low].map((geometry, index) => (
          <group key={`lod-${index}`}>
            <mesh frustumCulled geometry={geometry}>
              <meshPhysicalMaterial
                bumpMap={frostMap}
                bumpScale={0.035}
                clearcoat={1}
                clearcoatRoughness={0.08}
                color="#d8f4ff"
                envMapIntensity={1.2}
                ior={1.31}
                opacity={0.98}
                reflectivity={0.5}
                roughness={0.16}
                thickness={1.55}
                transparent
                transmission={0.96}
              />
            </mesh>

            <mesh frustumCulled geometry={geometry} scale={[0.92, 0.92, 0.92]}>
              <meshPhysicalMaterial
                color="#e9fbff"
                envMapIntensity={1}
                opacity={0.22 + hoverBoost * 0.04}
                roughness={0.22}
                thickness={1.1}
                transparent
                transmission={0.72}
              />
            </mesh>

            <mesh frustumCulled geometry={geometry} position={[0, -0.08, -0.02]} scale={[0.78, 0.7, 0.76]}>
              <meshPhysicalMaterial
                color="#66cfff"
                envMapIntensity={0.82}
                opacity={0.14 + hoverBoost * 0.04}
                roughness={0.34}
                thickness={0.9}
                transparent
                transmission={0.52}
              />
            </mesh>

            <mesh frustumCulled geometry={geometry} scale={[1.02, 1.02, 1.02]}>
              <meshPhysicalMaterial
                alphaMap={frostMap}
                color="#f7fdff"
                opacity={0.08 + hoverBoost * 0.04}
                roughness={0.76}
                transparent
              />
            </mesh>
          </group>
        ))}
      </Detailed>

      <mesh position={[0, -0.54, -0.08]} rotation={[0.16, 0, 0]} scale={[0.9, 0.38, 0.86]} frustumCulled={false}>
        <sphereGeometry args={[1.18, 18, 18]} />
        <meshBasicMaterial color="#63c8ff" opacity={0.08 + hoverBoost * 0.04} transparent />
      </mesh>

      <group ref={detailRef}>
        {crackPaths.map((points, index) => (
          <Line
            color={index % 2 === 0 ? "#effcff" : "#9bdcff"}
            key={`crack-${index}`}
            lineWidth={1.1 + hoverBoost * 0.22}
            opacity={0.2 + hoverBoost * 0.15}
            points={points}
            transparent
          />
        ))}
      </group>

      <instancedMesh ref={shardRef} args={[geometries.shard, undefined, shardMatrices.length]} frustumCulled>
        <meshPhysicalMaterial
          color="#eefcff"
          envMapIntensity={1}
          opacity={0.18 + hoverBoost * 0.06}
          roughness={0.24}
          thickness={0.5}
          transparent
          transmission={0.78}
        />
      </instancedMesh>

      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
            count={dustPositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#effcff" opacity={0.2 + hoverBoost * 0.06} size={0.026} sizeAttenuation transparent />
      </points>

      <group ref={hudRef}>
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} frustumCulled={false}>
          <torusGeometry args={[1.44, 0.006, 10, 84]} />
          <meshBasicMaterial color="#effcff" opacity={0.1 + hoverBoost * 0.12} transparent />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]} frustumCulled={false}>
          <torusGeometry args={[1.12, 0.005, 10, 72]} />
          <meshBasicMaterial color="#effcff" opacity={0.08 + hoverBoost * 0.1} transparent />
        </mesh>
      </group>

      <Sparkles
        color="#d7f6ff"
        count={mobile ? 10 : 14}
        noise={0.8}
        opacity={0.14 + hoverBoost * 0.06}
        scale={[3.05, 3.05, 3.05]}
        size={2.8 + hoverBoost * 1.2}
        speed={reducedMotion ? 0.06 : 0.16 + hoverBoost * 0.18}
      />

      <mesh position={[0.03, 0.02, 0.88]} rotation={[0.04, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[0.7, 0.7]} />
        <meshBasicMaterial alphaMap={logo} color="#fbfeff" opacity={0.14 + hoverBoost * 0.05} toneMapped={false} transparent />
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
      child.frustumCulled = true;
      child.material = new THREE.MeshPhysicalMaterial({
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        color: new THREE.Color("#d6f0ff"),
        envMapIntensity: 1.12,
        ior: 1.31,
        roughness: 0.15,
        thickness: 1.45,
        transparent: true,
        transmission: 0.94,
      });
    });
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const progressNow = progress.get();
    const hoverAmount = hovered || selected ? 1 : 0;
    const pointerX = state.pointer.x * (mobile ? 0.18 : 0.28);
    const pointerY = state.pointer.y * (mobile ? 0.14 : 0.22);
    const targetY = progressNow * Math.PI * 1.02 + pointerX + hoverAmount * 0.18;
    const targetX = -0.18 + progressNow * 0.16 + pointerY;
    const targetScale = 1.02 + progressNow * 0.1 + hoverAmount * 0.05;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, reducedMotion ? 0 : targetY, 4.3, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, reducedMotion ? 0 : targetX, 4, delta);
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.22) * 0.032,
      4,
      delta,
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.58) * 0.06,
      4,
      delta,
    );
    groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));
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
        count={mobile ? 8 : 12}
        noise={0.8}
        opacity={0.14 + (hovered || selected ? 0.06 : 0)}
        scale={[3, 3, 3]}
        size={2.6 + (hovered || selected ? 1 : 0)}
        speed={reducedMotion ? 0.08 : 0.16}
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
