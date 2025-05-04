// src/app/shop/[category]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  features?: string[]
  tags?: string[]
}

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const categorySlug = decodeURIComponent(params.category as string)

  const slugToCategory = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()) // Title Case
  }

  const categoryName = slugToCategory(categorySlug)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('categorySlug', categorySlug)

      if (error) {
        console.error('Error fetching category products:', error)
      } else {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [categorySlug])

  return (
    <section className="relative z-10 px-4 py-12 max-w-6xl mx-auto">
      <h1 className="uppercase group text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-8 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide transition duration-300 ease-in-out hover:bg-[#fefefe] hover:text-purple-800 hover:shadow-[0_0_20px_#6B21A8]">
        {categoryName}
      </h1>

      {loading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
