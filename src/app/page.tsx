'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabaseClient'
import CategoryGrid from '@/components/CategoryGrid'
import BrandMarquee from '@/components/BrandMarquee'


interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  features?: string[]
  tags?: string[]
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) console.error('Error fetching:', error)
      else setProducts(data)
    }

    fetchProducts()
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Optional Lightning background effect */}
      

      {/* Fixed Background Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image only for desktop */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0 hidden sm:block"
          style={{
            backgroundImage: "url('/images/hexamridi.png')",
            backgroundSize: 'cover',
          }}
        />
        <div className="relative z-10 w-full px-4">
          <div className="max-w-6xl mx-auto text-center py-20">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative z-10 px-4 py-12 max-w-6xl mx-auto">
      <h2 className="text-center text-2xl sm:text-3xl font-mono font-bold text-lime-400 px-4 py-2 border border-lime-500 rounded shadow-lg hover:invert hover:scale-105 transition-all duration-300 tracking-wider mb-6 bg-black/80">
       FEATURED GADGETS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
      <ProductCard key={product.id} product={product} />
      ))}
      </div>
      </section>

      {/* Brand Marquee */}
      <section className="relative z-10">
        <BrandMarquee />
      </section>
    </div>
  )
}
