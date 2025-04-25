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

  // Mapping slug back to category name
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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">🧠 {categoryName}</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
