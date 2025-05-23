'use client'

import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { name: 'Flipper & Tools', icon: '/category-icons/icon1.png', slug: 'flipper-tools' },
  { name: 'Raspberry Pi & Kits', icon: '/category-icons/ocon2.png', slug: 'raspberry-pi-kits' },
  { name: 'Wi-Fi & Networking', icon: '/category-icons/icon3.png', slug: 'wifi-networking' },
  { name: 'Radio & SDR', icon: '/category-icons/icon4.png', slug: 'radio-sdr' },
  { name: 'Smart Cards & NFC', icon: '/category-icons/icon5.png', slug: 'nfc-smart-cards' },
  { name: 'Keyloggers & HID', icon: '/category-icons/icon6.png', slug: 'keyloggers-hid' },
  { name: 'Debugging Tools', icon: '/category-icons/icon7.png', slug: 'debugging-tools' },
  { name: 'Storage & USBs', icon: '/category-icons/icon8.png', slug: 'storage-usbs' },
  { name: 'Wearables & Spy Gear', icon: '/category-icons/icon9.png', slug: 'spy-gear' },
  { name: 'Accessories', icon: '/category-icons/icon10.png', slug: 'accessories' },
]

export default function ShopPage() {
  return (
    <div className="p-6">
    <h1 className="text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-6 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide">
  EXPLORE GADGET CATEGORIES
</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${encodeURIComponent(cat.slug)}`}
            className="bg-gray-900 text-white h-48 w-full rounded-xl border border-gray-700 
              hover:bg-purple-500 hover:text-black hover:border-lime-400 
              shadow-md transition duration-300 ease-in-out 
              hover:shadow-[0_0_15px_#00ff8899] hover:scale-[1.03] 
              flex flex-col items-center justify-center text-center p-4"
          >
            <Image
              src={cat.icon}
              alt={cat.name}
              width={60}
              height={60}
              className="mb-3 object-contain"
            />
            <h2 className="text-sm sm:text-base font-semibold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
