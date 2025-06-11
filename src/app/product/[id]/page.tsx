'use client'

import { useParams, notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
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
        setSelectedImage(data.image || null)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [id])

  if (loading) return <div className="text-center mt-10 text-white">Loading...</div>
  if (!product) return notFound()

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
      <div className="bg-black border border-lime-400 rounded-md p-4 md:p-6 shadow-md group">
        
        {/* Flex layout for image/info */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Image + Zoom */}
          {selectedImage && (
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <div className="relative w-full h-72 sm:h-96 bg-black border border-gray-700 rounded-md overflow-hidden">
                <Zoom key={selectedImage}>
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="object-contain w-full h-full cursor-zoom-in"
                  />
                </Zoom>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">Click to zoom</p>

              {/* Responsive Gallery */}
              {Array.isArray(product.imageUrls) && product.imageUrls.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {product.imageUrls.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`thumb-${i}`}
                      onClick={() => setSelectedImage(url)}
                      className={`h-20 w-20 flex-shrink-0 object-cover rounded-md border-2 cursor-pointer ${
                        selectedImage === url ? 'border-lime-400' : 'border-gray-600'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Info block */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-lime-300 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-cyan-400 mb-4">
              ₾{(product.price / 100).toFixed(2)}
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
