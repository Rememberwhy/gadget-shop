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
    <div className="max-w-5xl mx-auto px-4 py-6 text-white font-mono">
      <div className="bg-black border border-lime-400 rounded-md p-6 shadow-md group">

        {/* 🔍 Selected Image (Zoomable) */}
        {selectedImage && (
          <div className="w-full h-[500px] flex justify-center items-center bg-black rounded-md mb-6 overflow-hidden relative">
          <Zoom key={selectedImage}>
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain cursor-zoom-in transition duration-300 ease-in-out"
            />
          </Zoom>
            <div className="absolute top-0 right-0 m-2 px-2 py-1 text-xs bg-black text-white rounded bg-opacity-60">
              Click to zoom
            </div>
          </div>
        )}

        {/* 🖼️ Image Gallery */}
        {Array.isArray(product.imageUrls) && product.imageUrls.length > 1 && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
            {product.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                onClick={() => setSelectedImage(url)}
                alt={`thumb-${index}`}
                className={`h-24 w-full object-cover border rounded cursor-pointer transition ${
                  selectedImage === url ? 'border-lime-400' : 'border-gray-600'
                }`}
              />
            ))}
          </div>
        )}

        {/* 🛠️ Product Info */}
        <h1 className="text-3xl font-bold text-lime-300 mb-2">{product.name}</h1>
        <p className="text-sm text-gray-400 mb-4">₾{(product.price / 100).toFixed(2)}</p>
        <p className="text-base text-gray-300 mb-6">{product.description}</p>

        {/* 🧩 Features */}
        {Array.isArray(product.features) && product.features.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lime-400 font-semibold">🧩 Features</h2>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 🏷️ Tags */}
        {Array.isArray(product.tags) && product.tags.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lime-400 font-semibold">🏷️ Tags</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-800 border border-lime-400 text-lime-300 text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 🛒 Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-6 bg-lime-500 hover:bg-lime-400 text-black font-bold py-2 rounded transition"
        >
          ➕ Add to Cart
        </button>
      </div>
    </div>
  )
}
