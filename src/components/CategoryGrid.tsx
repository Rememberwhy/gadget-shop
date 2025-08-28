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

const scripts = [
  { name: 'Wi-Fi Scanner', icon: '/script-icons/deauther.png', slug: 'wifi-deauther' },
  { name: 'NFC Shield – Maximum Protection Against Unauthorised Access', icon: '/script-icons/nfc.png', slug: 'nfc-clone' },
  { name: 'Credential Leak Detector', icon: '/script-icons/creds.png', slug: 'cred-dumper' },
  { name: 'Virus/malware Cleaning and Monitoring', icon: '/script-icons/bluetooth.png', slug: 'bt-sniffer' },
]

export default function CategoryGrid() {
  return (
    <div className="space-y-12">
      {/* CATEGORY GRID */}
      <div>
        
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
                width={70}
                height={70}
                className="object-contain mb-3"
              />
              <h2 className="text-white text-sm sm:text-base md:text-base font-medium leading-tight text-center line-clamp-2 max-w-[95%]">
                {cat.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>

      {/* SCRIPTS GRID */}
      <div>
        <h2 className="group text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-6 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide transition duration-300 ease-in-out hover:bg-[#fefefe] hover:text-purple-800 hover:shadow-[0_0_20px_#6B21A8]">SCRIPTS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {scripts.map((script) => (
            <Link
              key={script.slug}
              href={`/scripts/${encodeURIComponent(script.slug)}`}
              className="bg-black text-white h-48 w-full rounded-xl border border-gray-800 
                hover:bg-emerald-500 hover:text-black hover:border-yellow-300 
                shadow-md transition duration-300 ease-in-out 
                hover:shadow-[0_0_15px_#00ffee99] hover:scale-[1.03] 
                flex flex-col items-center justify-center text-center p-4"
            >
              <Image
                src="/script-icons/code.png"
                alt={script.name}
                width={70}
                height={70}
                className="object-contain mb-3"
              />
              <h2 className="text-white text-sm sm:text-base md:text-base font-medium leading-tight text-center line-clamp-2 max-w-[95%]">
                {script.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
