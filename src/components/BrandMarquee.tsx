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
        <h2 className="text-lg md:text-xl font-semibold text-grey mb-4 tracking-wide">
          Trusted by hackers & tinkerers worldwide →
        </h2>
  
        <div className="overflow-hidden border border-cyan-500 rounded-lg shadow-xl bg-white/100 backdrop-blur-md">
          <div className="flex animate-scroll space-x-10 px-6 py-4">
            {[...logos, ...logos].map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt="Brand Logo"
                width={60}
                height={60}
                className="opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-linear"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }