'use client'

import Image from 'next/image'
import './BrandMarquee.css'

const logos = [
  
  '/logos/console.png',
  '/logos/google.png',
  '/logos/kali.png',
  '/logos/msi.png',
  '/logos/raspberry.png',
  '/logos/sql.png',
  '/logos/suse.png',
  '/logos/tech.png',
  '/logos/ubuntu.png',
]

export default function BrandMarquee() {
  return (
    <div className="relative mx-auto my-16 w-full max-w-5xl text-center">
      <h1 className="text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-6 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide">
        TRUSTED BY HACKERS & THINKERS WORLDWIDE
      </h1>

      <div className="marquee-container rounded-lg shadow-xl overflow-hidden">
        {/* Top row - scroll left */}
        <div className="marquee">
          <div className="marquee-content scroll-left">
            {[...logos, ...logos].map((src, idx) => (
              <Image
                key={`top-${idx}`}
                src={src}
                alt="Brand Logo"
                width={60}
                height={60}
                className="brand-logo"
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
