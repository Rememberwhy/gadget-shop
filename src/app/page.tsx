'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const [openGate, setOpenGate] = useState(false)

  // Prefetch the destination to avoid a blank flash after the animation
  useEffect(() => {
    router.prefetch('/home')
  }, [router])

  const handleEnter = () => {
    setOpenGate(true)
    setTimeout(() => router.push('/home'), 2000) // match your animation duration
  }

  return (
    <div
      className={`relative w-screen min-h-[100svh] bg-black text-lime-400 font-mono flex flex-col items-center justify-center overflow-hidden ${
        openGate ? 'gate-open' : ''
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 animate-pulse-glow bg-[radial-gradient(circle_at_30%_30%,rgba(0,255,136,0.2),transparent_70%)]" />

      {/* Gate doors */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-lime-800 to-black z-20 transition-transform duration-[2000ms] ease-in-out gate-left will-change-transform" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-lime-800 to-black z-20 transition-transform duration-[2000ms] ease-in-out gate-right will-change-transform" />

      {/* Title */}
      <h1 className="z-30 text-3xl sm:text-4xl md:text-5xl text-center mb-10 animate-pulse-glow">
        WELCOME TO HEX AMRIDI REALM
      </h1>

      {/* Enter Button */}
      <button
        onClick={handleEnter}
        className="z-30 px-6 py-3 border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition duration-300 rounded-xl shadow-[0_0_20px_lime]"
      >
        Enter the Realm
      </button>

      {/* Terminal Footer */}
      <p className="absolute bottom-6 text-sm text-lime-500 z-30 animate-typing whitespace-nowrap overflow-hidden">
        &gt; root@hexamridi:~$ access granted
      </p>
    </div>
  )
}
