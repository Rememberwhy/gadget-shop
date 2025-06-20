'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const scripts = [
  {
    name: 'WI-FI SCANNER',
    slug: 'wifi-deauther',
    icon: '/script-icons/deauth.png',
    price: 120.0,
    content:
      'This script deauthenticates Wi-Fi clients by sending disassociation packets using ESP8266. Great for testing network resilience.',
    features: [
      'Written in Python + ESP8266',
      'Customizable SSID target list',
      'Includes setup guide and firmware',
    ],
  },
  {
    name: 'NFC TOOL',
    slug: 'nfc-clone',
    icon: '/script-icons/nfcscript.png',
    price: 150.0,
    content: 'Clone NFC tags with UID manipulation tools and card emulation.',
    features: [
      'Supports MIFARE Classic',
      'Android + PN532 compatible',
      'Script & GUI included',
    ],
  },
  {
    name: 'BLUETOOTH CHECKER',
    slug: 'bt-sniffer',
    icon: '/script-icons/blue.png',
    price: 110.0,
    content: 'Analyze Bluetooth packets and perform passive sniffing for BLE devices.',
    features: ['Python-based CLI', 'Supports BLE 4.0+', 'Documentation included'],
  },

    {
        name: 'CREDENTIAL CHECKER',
        slug: 'cred-dumper',
        icon: '/script-icons/credential.png',
        price: 100.0,
        content: 'Extract credentials from various sources including browsers and applications.',
        features: [
        'Supports Chrome, Firefox, Edge',
        'Python script with GUI',
        'Includes decryption tools',
        ],
    },
]

export default function ScriptPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = use(props.params)
  const script = scripts.find(s => s.slug === slug)
  const { addToCart } = useCart()
  const router = useRouter()

  if (!script) return notFound()

  const handleBuy = () => {
    addToCart({
      id: script.slug,
      name: script.name,
      price: script.price, // price in GEL, will be stored in tetri
      image: script.icon,
      quantity: 1,
    })
    router.push('/checkout')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <Image
          src={script.icon}
          alt={script.name}
          width={150}
          height={150}
          className="rounded-xl border border-gray-700 shadow-lg"
        />

        <div className="flex-1 text-white">
          <h1 className="text-4xl font-bold text-lime-400 mb-3">{script.name}</h1>
          <p className="text-gray-300 mb-6 text-lg">{script.content}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {script.features.map((feature, i) => (
                <li key={i} className="text-sm text-gray-200">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-semibold text-lime-300">
              ₾{script.price.toFixed(2)}
            </span>
            <button
              onClick={handleBuy}
              className="bg-lime-500 hover:bg-lime-600 text-black font-bold py-2 px-6 rounded shadow hover:shadow-lg transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
