'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const scripts = [
  {
    name: 'Wi-Fi Scanner',
    slug: 'wifi-deauther',
    icon: '/script-icons/deauth.png',
    price: 45.0,
    content:
      'This script checks and tests your Wi-Fi security, helping you discover how secure your internet connection and data really are. Comes with full installation and setup instructions. A next-generation defence tool by Hexamridi!',
    features: [
      'Monitor nearby networks',
      'Analyse signal strength and channels',
      'Ideal for testing, pentesting, and security analysis',
    ],
  },
  {
    name: 'NFC Shield – Maximum Protection Against Unauthorised Access',
    slug: 'nfc-clone',
    icon: '/script-icons/nfcscript.png',
    price: 39.99,
    content:
      'The NFC Shield is a security script designed to protect your device or NFC card from unauthorised access and malicious attacks. It scans surrounding signals, detects suspicious connections, and automatically blocks unwanted actions.',
    features: [
      'Protects personal data',
      'Enhances NFC security',
      'Useful for both personal and professional security',
    ],
  },
  {
    name: 'Virus Cleaner & Monitoring',
    slug: 'bt-sniffer',
    icon: '/script-icons/blue.png',
    price: 35.0,
    content:
      'This script scans your system for malicious files and suspicious processes. It automatically removes viruses and continuously monitors the system to improve overall security.',
    features: [
      'Fast analysis',
      'Malware removal',
      'Continuous monitoring and alerts',
    ],
  },
  {
    name: 'Credential Leak Detector',
    slug: 'cred-dumper',
    icon: '/script-icons/credential.png',
    price: 25.99,
    content:
      'This script monitors your system and detects potential leaks of sensitive data. It automatically alerts you if suspicious activity is detected, helping safeguard your information.',
    features: [
      'Real-time monitoring',
      'Detection of sensitive data transfers',
      'Alerts and automatic prevention',
      'Improves data security',
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
      price: Math.round(script.price * 100), // convert GEL → tetri once
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
          <h1 className="text-2xl font-bold text-lime-400 mb-3">{script.name}</h1>
          <p className="text-gray-300 mb-6 text-2lg">{script.content}</p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {script.features.map((feature, i) => (
                <li key={i} className="text-lg text-gray-200">
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-2xl font-semibold text-lime-300">
              £{script.price.toFixed(2)}
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
