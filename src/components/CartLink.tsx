'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartLink() {
  const { cart } = useCart()
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart" className="relative text-lime-400 hover:text-cyan-400 transition active:text-lime-400 border-b-2 border-transparent hover:border-cyan-400">
      Cart
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
          {totalQuantity}
        </span>
      )}
    </Link>
  )
}
