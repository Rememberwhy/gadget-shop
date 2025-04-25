'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { supabase } from '@/lib/supabaseClient'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

declare global {
  interface Window {
    paypal: any
  }
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const GELtoUSD = 0.37
  const totalGEL = `${(total / 100).toFixed(2)}`
  const totalUSD = `${((total / 100) * GELtoUSD).toFixed(2)}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('orders').insert([
      {
        name: form.name,
        email: form.email,
        address: form.address,
        items: cart,
        total,
        currency: 'GEL',
      },
    ])

    setLoading(false)

    if (error) {
      setError('Failed to place order. Please try again.')
      console.error('Order error:', error)
    } else {
      clearCart()
      router.push('/thank-you')
    }
  }

  const handleStripeCheckout = async () => {
    const stripe = await stripePromise

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })

    const { url } = await res.json()
    if (url) {
      window.location.href = url
    } else {
      setError('Stripe checkout failed.')
    }
  }

  const loadPayPalScript = (clientId: string) => {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`
    script.async = true
    document.body.appendChild(script)
  }

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    if (!window.paypal && clientId && total > 0) {
      loadPayPalScript(clientId)

      const interval = setInterval(() => {
        if (window.paypal) {
          clearInterval(interval)

          window.paypal.Buttons({
            createOrder: (_data: any, actions: any) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalUSD,
                    },
                  },
                ],
              })
            },
            onApprove: async (_data: any, actions: any) => {
              const details = await actions.order.capture()

              await supabase.from('orders').insert([
                {
                  name: form.name,
                  email: form.email,
                  address: form.address,
                  items: cart,
                  total,
                  currency: 'GEL',
                  paid_with: 'PayPal',
                },
              ])

              clearCart()
              router.push('/thank-you')
            },
            onError: (err: any) => {
              console.error('PayPal error:', err)
              setError('PayPal payment failed.')
            },
          }).render('#paypal-button-container')
        }
      }, 500)
    }
  }, [cart, form, total, totalUSD])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div className="border-t pt-4 mt-4">
          <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₾{((item.price * item.quantity) / 100).toFixed(2)}</span>
                </li>
              ))}
              <li className="flex justify-between font-bold border-t pt-2">
                <span>Total:</span>
                <span>₾{totalGEL} <span className="text-sm text-gray-500">(≈ ${totalUSD} USD)</span></span>
              </li>
            </ul>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order (No Payment)'}
        </button>

        <button
          type="button"
          onClick={handleStripeCheckout}
          disabled={cart.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mt-4 transition disabled:opacity-50"
        >
          Pay with Card (ეს გადახდის მეთოდი ყველას ჯობია)
        </button>

        {/* ✅ PayPal Button Mount */}
        {total > 0 && <div id="paypal-button-container" className="mt-6" />}
      </form>
    </div>
  )
}
