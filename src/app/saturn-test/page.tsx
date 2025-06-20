'use client'

import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

// 🪐 Saturn 3D Model
function SaturnModel() {
  const { scene } = useGLTF('/saturn.glb') // Make sure this path is correct!
  return <primitive
    object={scene}
     scale={[5, 5, 5]}  />
    
  
}

export default function SaturnTestPage() {
  return (
    <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 50], fov: 40 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <SaturnModel />
        </Suspense>
        <OrbitControls enableZoom={true} minDistance={350} maxDistance={360} />
      </Canvas>
    </div>
  )
}
