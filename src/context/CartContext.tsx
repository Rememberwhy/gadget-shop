'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'

export interface CartItem {
  id: string
  name: string
  price: number // MINOR units (tetri), e.g. 15000 = ₾150.00
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  // Expect price already in MINOR units
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        setCart(JSON.parse(stored))
      } catch {
        // bad JSON? reset
        setCart([])
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    // IMPORTANT: item.price must already be in tetri (minor units)
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id)
      if (exists) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
