'use client'

import Link from 'next/link'


const categories = [
  { name: 'Flipper & Tools', icon: '🛠️', slug: 'flipper-tools' },
  { name: 'Raspberry Pi & Kits', icon: '🍓', slug: 'raspberry-pi-kits' },
  { name: 'Wi-Fi & Networking', icon: '📡', slug: 'wifi-networking' },
  { name: 'Radio & SDR', icon: '📻', slug: 'radio-sdr' },
  { name: 'Smart Cards & NFC', icon: '💳', slug: 'nfc-smart-cards' },
  { name: 'Keyloggers & HID', icon: '⌨️', slug: 'keyloggers-hid' },
  { name: 'Debugging Tools', icon: '🐞', slug: 'debugging-tools' },
  { name: 'Storage & USBs', icon: '💾', slug: 'storage-usbs' },
  { name: 'Wearables & Spy Gear', icon: '🕶️', slug: 'spy-gear' },
  { name: 'Accessories', icon: '🔌', slug: 'accessories' },
]

export default function ShopPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-black mb-6"> Explore Hacker Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${encodeURIComponent(cat.slug)}`}
            className="bg-gray-900 text-white p-6 rounded-xl border border-gray-700 hover:border-neon-pink shadow-md transition duration-300 ease-in-out hover:shadow-[0_0_15px_#ff00ff99] hover:scale-[1.03]"

          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <h2 className="text-lg font-semibold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
