'use client'

import { useParams, notFound } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useCart } from '@/context/CartContext'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface Product {
  id: string
  name: string
  price: number
  image: string
  imageUrls?: string[]
  description: string
  category: string
  features?: string[]
  tags?: string[]
}

export default function ProductDetailPage() {
  const { id } = useParams() as { id: string }
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', decodeURIComponent(id))
        .single()

      if (error || !data) {
        console.error('Product not found:', { id, error })
        setProduct(null)
      } else {
        setProduct(data)
        setSelectedIndex(0)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const images = useMemo(() => {
    if (!product) return []
    // Build gallery: main image first, then others, unique
    const list = [product.image, ...(product.imageUrls ?? [])].filter(Boolean)
    return Array.from(new Set(list))
  }, [product])

  if (loading) return <div className="text-center mt-10 text-white">Loading...</div>
  if (!product) return notFound()

  const selectedImage = images[selectedIndex] ?? product.image

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-white font-mono">
      <div className="bg-black border border-lime-400 rounded-md p-4 md:p-6 shadow-md">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* IMAGE + GALLERY */}
          <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
            {/* Aspect-ratio wrapper prevents cropping while keeping layout stable */}
            <div className="relative w-full bg-black border border-gray-700 rounded-md overflow-hidden">
              {/* Choose a gentle aspect ratio that works for most product shots */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
                {selectedImage ? (
                  <Zoom key={selectedImage}>
                    <img
                      src={selectedImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-contain cursor-zoom-in"
                      loading="eager"
                    />
                  </Zoom>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                    No image
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2 text-center">
              Click image to zoom
            </p>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedIndex(i)}
                    className={`flex-shrink-0 rounded-md border-2 p-0.5 ${
                      selectedIndex === i ? 'border-lime-400' : 'border-gray-600'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={url}
                      alt={`thumbnail-${i}`}
                      className="h-20 w-20 object-contain bg-zinc-900 rounded"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-lime-300 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-cyan-400 mb-4">
              £{(product.price / 100).toFixed(2)}
            </p>
            <p className="text-base text-gray-300 mb-6">{product.description}</p>

            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lime-400 font-semibold mb-2">🧩 Features</h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lime-400 font-semibold mb-2">🏷️ Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 border border-lime-400 text-lime-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-lime-500 hover:bg-lime-400 text-black font-bold py-2 rounded transition"
            >
              ➕ Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


// TODO: verifying latest version restored on 2025-09-02