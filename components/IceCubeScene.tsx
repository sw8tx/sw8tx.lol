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
  const popWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.58) / 0.12));
  const chargeWindow = Math.max(0, 1 - Math.min(1, Math.abs(progress - 0.44) / 0.18));

  return (
    <>
      <ambientLight intensity={0.72 + chargeWindow * 0.12} />
      <directionalLight castShadow intensity={1.65 + popWindow * 0.45} position={[4.8, 5.6, 5.2]} />
      <pointLight color="#ddf8ff" intensity={12 + popWindow * 10} position={[-1.8, 2.8, 3.8]} />
      <pointLight color="#88d7ff" intensity={15 + chargeWindow * 6} position={[-3.4, -1.4, 3.4]} />
      <pointLight color="#45b8ff" intensity={10 + popWindow * 8} position={[2.8, -0.4, 3]} />
      <pointLight color="#0d2e70" intensity={8 + chargeWindow * 4} position={[2.2, 2.2, -4.4]} />
      <pointLight color="#7af0e1" intensity={4 + popWindow * 6} position={[0, -2.2, 2]} />

      <Float
        floatIntensity={reducedMotion ? 0 : mobile ? 0.35 : 0.62}
        rotationIntensity={reducedMotion ? 0 : 0.18 + popWindow * 0.08}
        speed={mobile ? 1.1 : 1.7}
      >
        <IceCubeObject hasModel={hasModel} mobile={mobile} progress={progress} reducedMotion={reducedMotion} />
      </Float>

      <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.9, 64]} />
        <meshBasicMaterial color="#7fd8ff" opacity={0.12 + popWindow * 0.08} transparent />
      </mesh>

      <Environment resolution={128}>
        <Lightformer color="#f4fcff" form="ring" intensity={2 + popWindow * 1.4} position={[0, 1.2, 4]} scale={4.8} />
        <Lightformer color="#0b1d44" form="rect" intensity={1.5} position={[0, 0, -4]} scale={[10, 10, 1]} />
        <Lightformer color="#7be3d8" form="rect" intensity={1 + chargeWindow * 0.6} position={[4.2, 2.2, 2]} scale={[4.8, 2.4, 1]} />
        <Lightformer color="#63c8ff" form="rect" intensity={1.1 + popWindow * 0.8} position={[-4.4, 0.8, 2.6]} scale={[4.4, 2.2, 1]} />
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
      <Canvas camera={{ position: [0, 0, 6], fov: mobile ? 31 : 27 }} dpr={[1, 1.5]}>
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
