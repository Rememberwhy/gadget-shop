'use client'

import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import type { Engine } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim' // ✅ smaller bundle, still supports lines + glow

export default function LightningBG() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="lightning"
      particlesInit={particlesInit} // ✅ corrected to 'particlesInit'
      options={{
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        style: {
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '0',
        },
        particles: {
          number: { value: 40 },
          color: { value: '#00ffff' },
          shape: { type: 'line' },
          opacity: {
            value: { min: 0.3, max: 0.6 },
          },
          size: {
            value: { min: 0.5, max: 1.5 },
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: 'none',
            straight: false,
          },
        },
        detectRetina: true,
      }}
    />
  )
}
