'use client'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'


export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-contain mr-4" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>₾{(item.price / 100).toFixed(2)} × {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right font-bold mt-4">
            Total: ₾{(total / 100).toFixed(2)}
          </div>
          <Link
            href="/checkout"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded mt-4 hover:bg-green-700 transition"
                >
             Proceed to Checkout →
          </Link>


          <button
            onClick={clearCart}
            className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  )
}
