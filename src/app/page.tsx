'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './globals.css'

import { Suspense } from 'react'


function SaturnModel() {
  const { scene } = useGLTF('public/images/saturn.glb')
  return <primitive object={scene} scale={2.5} />
}

export default function GatePage() {
  const router = useRouter()
  const [openGate, setOpenGate] = useState(false)

  const handleEnter = () => {
    setOpenGate(true)
    setTimeout(() => router.push('/home'), 2000)
  }

  return (
    <div
      className={`relative w-screen h-screen bg-black text-lime-400 font-mono flex flex-col items-center justify-center overflow-hidden ${
        openGate ? 'gate-open' : ''
      }`}
    >
      {/* 🌌 Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 animate-pulse-glow bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.2),transparent_70%)]" />

      {/* 🪐 Saturn GLB Canvas */}
      {!openGate && (
        <div className="absolute w-[400px] h-[400px] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
         <Canvas camera={{ position: [0, 0, 5] }}>
           <ambientLight intensity={1} />
           <pointLight position={[10, 10, 10]} />
           <Suspense fallback={null}>
           <SaturnModel />
           </Suspense>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

      {/* Gate doors */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-lime-800 to-black z-20 transition-transform duration-[2000ms] ease-in-out gate-left" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-lime-800 to-black z-20 transition-transform duration-[2000ms] ease-in-out gate-right" />

      {/* Title */}
      <h1 className="z-30 text-3xl sm:text-4xl md:text-5xl text-center mb-10 animate-pulse-glow">
        WELCOME TO HEX AMRIDI REALM
      </h1>

      {/* Button */}
      <button
        onClick={handleEnter}
        className="z-30 px-6 py-3 border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition duration-300 rounded-xl shadow-[0_0_20px_lime]"
      >
        Enter the Realm
      </button>

      {/* Terminal Footer */}
      <p className="absolute bottom-6 text-sm text-lime-500 z-30 animate-typing">
        &gt; root@hexamridi:~$ access granted
      </p>
    </div>
  )
}
