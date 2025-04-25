'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartLink() {
  const { cart } = useCart()
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Link href="/cart" className="relative">
      Cart
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2">
          {totalQuantity}
        </span>
      )}
    </Link>
  )
}
