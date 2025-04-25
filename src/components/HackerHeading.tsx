'use client'

import { useEffect, useState } from 'react'

export default function HackerHeading() {
  const text = 'Browse Categories'
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    if (visibleChars < text.length) {
      const interval = setInterval(() => {
        setVisibleChars((prev) => prev + 1)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [visibleChars, text.length])

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="bg-black border border-lime-500 rounded-lg px-8 py-4 shadow-[0_0_10px_#00ff88]">
        <h1 className="text-center text-lime-400 font-mono text-2xl md:text-3xl tracking-widest whitespace-pre">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i < visibleChars ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } ${i < visibleChars ? 'drop-shadow-[0_0_3px_#00ff88]' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  )
}
