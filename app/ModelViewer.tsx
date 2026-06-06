'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Bounds, Center } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const ref = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/3d-drawing.glb');

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => m.clone());
        } else {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.4;
    }
  });

  return <primitive ref={ref} object={cloned} />;
}

export default function ModelViewer() {
  return (
    <Canvas
      style={{ width: 500, height: 500, background: 'transparent' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.8} />
      <Suspense fallback={null}>
        <Bounds fit clip observe={false} margin={1.3}>
          <Center>
            <Model />
          </Center>
        </Bounds>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
