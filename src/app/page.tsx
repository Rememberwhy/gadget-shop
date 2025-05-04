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
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-0 hidden sm:block"
          style={{ backgroundSize: 'cover' }}
        />
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="group text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-6 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide transition duration-300 ease-in-out hover:bg-[#fefefe] hover:text-purple-800 hover:shadow-[0_0_20px_#6B21A8]">
        SHOP FOR THOSE WHO DECODE THE WORLD 
            </h1>
          <div className="max-w-6xl lg:max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] mx-auto text-center py-10">
            
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative z-10 py-12">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="group text-2xl sm:text-3xl font-mono text-lime-400 text-center mb-6 px-4 py-2 border border-lime-400 rounded shadow-[0_0_12px_#00ff88] tracking-wide transition duration-300 ease-in-out hover:bg-[#fefefe] hover:text-purple-800 hover:shadow-[0_0_20px_#6B21A8]">
            FEATURED GADGETS
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="relative z-10 py-12">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[90rem] 2xl:max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BrandMarquee />
        </div>
      </section>
    </div>
  )
}
