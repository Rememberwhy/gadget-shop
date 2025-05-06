'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [showFull, setShowFull] = useState(false)
  const toggleDescription = () => setShowFull(!showFull)
  const shortDescription = product.description.slice(0, 100) + '...'

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="border border-gray-700 bg-zinc-900 text-white rounded-xl p-4 shadow-md hover:shadow-[0_0_12px_#00ff88] transition duration-300 flex flex-col h-full cursor-pointer">
        {/* Image */}
        <div className="relative w-full h-48 bg-white rounded-md overflow-hidden mb-3">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name & Price */}
        <h2 className="text-lg sm:text-xl font-semibold text-lime-400">{product.name}</h2>
        <p className="text-cyan-400 font-mono mt-1">₾{(product.price / 100).toFixed(2)}</p>

        {/* Description (Expandable) */}
        <p className="text-sm text-gray-300 mt-2">
          {showFull ? product.description : shortDescription}
          {product.description.length > 100 && (
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleDescription()
              }}
              className="ml-2 text-cyan-500 hover:underline text-xs"
            >
              {showFull ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>

        {/* Optional bottom CTA (hidden on hoverable cards) */}
        <span className="mt-4 text-sm text-purple-400 group-hover:underline hidden sm:inline-block">
          View Product →
        </span>
      </div>
    </Link>
  )
}
