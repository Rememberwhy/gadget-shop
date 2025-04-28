'use client'

import Image from 'next/image'
import './BrandMarquee.css'

const logos = [
  '/logos/cisco.svg',
  '/logos/console.png',
  '/logos/google.png',
  '/logos/kali.svg',
  '/logos/msi.png',
  '/logos/raspberry.svg',
  '/logos/sql.png',
  '/logos/suse.png',
  '/logos/tech.png',
  '/logos/ubuntu.png',
]

export default function BrandMarquee() {
  return (
    <div className="relative mx-auto my-16 w-full max-w-5xl text-center">
      <h2 className="text-2xl sm:text-3xl font-mono font-bold text-lime-400 px-4 py-1 border border-lime-500 rounded shadow-lg hover:invert hover:scale-105 transition-all duration-300 tracking-wider mb-6">
        TRUSTED BY HACKERS & THINKERS WORLDWIDE
      </h2>

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

        {/* Bottom row - scroll right */}
        <div className="marquee">
          <div className="marquee-content scroll-right">
            {[...logos, ...logos].map((src, idx) => (
              <Image
                key={`bottom-${idx}`}
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
