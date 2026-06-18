"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { IceCubeObject } from "./IceCubeObject";

class SceneAssetBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

function CameraRig({
  hovered,
  selected,
  mobile,
  reducedMotion,
}: {
  hovered: boolean;
  selected: boolean;
  mobile: boolean;
  reducedMotion: boolean;
}) {
  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const targetZ = selected ? 4.6 : hovered ? 5 : 5.35;
    const targetY = selected ? 0.08 : 0;
    const targetFov = mobile ? (selected ? 30 : 32) : selected ? 23 : 25;

    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, reducedMotion ? 8 : 4.6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, reducedMotion ? 8 : 4.2, delta);
    camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, reducedMotion ? 8 : 4.8, delta);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    if (selected && !reducedMotion) {
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        state.pointer.x * (mobile ? 0.08 : 0.14),
        3.2,
        delta,
      );
    } else {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, 0, 4.4, delta);
    }
  });

  return null;
}

function SceneContents({
  hasModel,
  progress,
  mobile,
  reducedMotion,
  hovered,
  selected,
  onHoverChange,
  onSelect,
}: {
  hasModel: boolean;
  progress: import("framer-motion").MotionValue<number>;
  mobile: boolean;
  reducedMotion: boolean;
  hovered: boolean;
  selected: boolean;
  onHoverChange: (value: boolean) => void;
  onSelect: (value: boolean) => void;
}) {
  const progressValue = progress.get();
  const popWindow = Math.max(0, 1 - Math.min(1, Math.abs(progressValue - 0.58) / 0.12));
  const chargeWindow = Math.max(0, 1 - Math.min(1, Math.abs(progressValue - 0.44) / 0.18));
  const hoverBoost = hovered || selected ? 1 : 0;

  return (
    <>
      <CameraRig hovered={hovered} selected={selected} mobile={mobile} reducedMotion={reducedMotion} />
      <ambientLight intensity={0.58 + chargeWindow * 0.08 + hoverBoost * 0.04} />
      <directionalLight intensity={1.55 + popWindow * 0.32 + hoverBoost * 0.14} position={[4.8, 5.6, 5.2]} />
      <pointLight color="#effcff" intensity={9 + popWindow * 4 + hoverBoost * 2} position={[-1.4, 2.6, 4]} />
      <pointLight color="#88d7ff" intensity={8 + chargeWindow * 3} position={[-3.2, -1.1, 3.5]} />
      <pointLight color="#45b8ff" intensity={6 + hoverBoost * 2} position={[2.8, -0.1, 3]} />
      <pointLight color="#0d2e70" intensity={5 + chargeWindow * 2} position={[2.4, 2.6, -4.8]} />
      <pointLight color="#7af0e1" intensity={2 + popWindow * 3} position={[0, -2, 2.2]} />

      <Float
        floatIntensity={reducedMotion ? 0 : mobile ? 0.3 : 0.5}
        rotationIntensity={reducedMotion ? 0 : 0.15 + hoverBoost * 0.08}
        speed={mobile ? 1 : 1.45}
      >
        <IceCubeObject
          hasModel={hasModel}
          hovered={hovered}
          mobile={mobile}
          progress={progress}
          reducedMotion={reducedMotion}
          selected={selected}
          onHoverChange={onHoverChange}
          onSelect={onSelect}
        />
      </Float>

      <mesh position={[0, 0, -2.4]} frustumCulled={false}>
        <planeGeometry args={[8.5, 8.5]} />
        <meshBasicMaterial color="#ffffff" opacity={0.06 + chargeWindow * 0.02} transparent />
      </mesh>

      <mesh position={[0, -0.1, 1.5]} frustumCulled={false}>
        <planeGeometry args={[4.6, 4.6]} />
        <meshBasicMaterial color="#dff6ff" opacity={0.05 + popWindow * 0.04 + hoverBoost * 0.03} transparent />
      </mesh>

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
        <circleGeometry args={[3.2, 48]} />
        <meshBasicMaterial color="#7fd8ff" opacity={0.12 + popWindow * 0.06 + hoverBoost * 0.04} transparent />
      </mesh>

      <Environment resolution={64}>
        <Lightformer color="#f4fcff" form="ring" intensity={2 + popWindow * 0.8 + hoverBoost * 0.5} position={[0, 1.2, 4.2]} scale={5.4} />
        <Lightformer color="#0b1d44" form="rect" intensity={1.2} position={[0, 0, -4.4]} scale={[11, 11, 1]} />
        <Lightformer color="#7be3d8" form="rect" intensity={0.9 + chargeWindow * 0.4} position={[4.4, 2.4, 2.2]} scale={[5.2, 2.8, 1]} />
        <Lightformer color="#63c8ff" form="rect" intensity={0.9 + popWindow * 0.5} position={[-4.8, 0.9, 2.9]} scale={[4.8, 2.4, 1]} />
        <Lightformer color="#ffffff" form="circle" intensity={0.9 + hoverBoost * 0.4} position={[0, -2.8, 3.2]} scale={2.6} />
      </Environment>
    </>
  );
}

export function IceCubeScene({
  progress,
  active,
  hovered,
  selected,
  onHoverChange,
  onSelect,
}: {
  progress: import("framer-motion").MotionValue<number>;
  active: boolean;
  hovered: boolean;
  selected: boolean;
  onHoverChange: (value: boolean) => void;
  onSelect: (value: boolean) => void;
}) {
  const reducedMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [hasModel, setHasModel] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const updateMobile = () => setMobile(mediaQuery.matches);
    const updateVisibility = () => setTabVisible(document.visibilityState === "visible");
    let cancelled = false;

    updateMobile();
    updateVisibility();

    mediaQuery.addEventListener("change", updateMobile);
    document.addEventListener("visibilitychange", updateVisibility);

    fetch("/models/iceberg.glb", { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setHasModel(response.ok);
      })
      .catch(() => {
        if (!cancelled) setHasModel(false);
      });

    return () => {
      cancelled = true;
      mediaQuery.removeEventListener("change", updateMobile);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const shouldRender = active && tabVisible;

  return (
    <div className="ice-scene-shell" aria-label="3D frozen core scene">
      <Canvas
        camera={{ position: [0, 0, 5.35], fov: mobile ? 32 : 25 }}
        dpr={[1, 1.5]}
        frameloop={shouldRender ? "always" : "never"}
        gl={{
          alpha: true,
          antialias: false,
          depth: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
        performance={{ min: 0.65 }}
      >
        <Suspense fallback={null}>
          <SceneAssetBoundary
            fallback={
              <SceneContents
                hasModel={false}
                hovered={hovered}
                mobile={mobile}
                progress={progress}
                reducedMotion={Boolean(reducedMotion)}
                selected={selected}
                onHoverChange={onHoverChange}
                onSelect={onSelect}
              />
            }
          >
            <SceneContents
              hasModel={hasModel}
              hovered={hovered}
              mobile={mobile}
              progress={progress}
              reducedMotion={Boolean(reducedMotion)}
              selected={selected}
              onHoverChange={onHoverChange}
              onSelect={onSelect}
            />
          </SceneAssetBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
