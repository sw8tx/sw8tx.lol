"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
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

function SceneContents({
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
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight castShadow intensity={1.2} position={[4, 5, 5]} />
      <pointLight color="#88d7ff" intensity={14} position={[-3, -1, 3]} />
      <pointLight color="#102e68" intensity={8} position={[2, 2, -4]} />

      <Float
        floatIntensity={reducedMotion ? 0 : mobile ? 0.25 : 0.48}
        rotationIntensity={reducedMotion ? 0 : 0.12}
        speed={mobile ? 1 : 1.4}
      >
        <IceCubeObject hasModel={hasModel} mobile={mobile} progress={progress} reducedMotion={reducedMotion} />
      </Float>

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial color="#13264b" opacity={0.28} transparent />
      </mesh>

      <Environment resolution={128}>
        <Lightformer color="#9bd8ff" form="ring" intensity={1.4} position={[0, 1, 4]} scale={4} />
        <Lightformer color="#0b1d44" form="rect" intensity={1.3} position={[0, 0, -4]} scale={[10, 10, 1]} />
        <Lightformer color="#7be3d8" form="rect" intensity={0.8} position={[4, 2, 2]} scale={[4, 2, 1]} />
      </Environment>
    </>
  );
}

export function IceCubeScene({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const [mobile, setMobile] = useState(false);
  const [hasModel, setHasModel] = useState(false);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const update = () => setMobile(mediaQuery.matches);
    let cancelled = false;

    update();
    mediaQuery.addEventListener("change", update);

    fetch("/models/icecube.glb", { method: "HEAD" })
      .then((response) => {
        if (!cancelled) setHasModel(response.ok);
      })
      .catch(() => {
        if (!cancelled) setHasModel(false);
      });

    const unsubscribe = progress.on("change", (value) => {
      setSceneProgress(value);
    });

    return () => {
      cancelled = true;
      mediaQuery.removeEventListener("change", update);
      unsubscribe();
    };
  }, [progress]);

  return (
    <div className="ice-scene-shell" aria-label="3D frozen core scene">
      <Canvas camera={{ position: [0, 0, 6], fov: mobile ? 32 : 28 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <SceneAssetBoundary
            fallback={<SceneContents hasModel={false} mobile={mobile} progress={sceneProgress} reducedMotion={Boolean(reducedMotion)} />}
          >
            <SceneContents hasModel={hasModel} mobile={mobile} progress={sceneProgress} reducedMotion={Boolean(reducedMotion)} />
          </SceneAssetBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
