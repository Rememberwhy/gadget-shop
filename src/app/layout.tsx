'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CartProvider } from '../context/CartContext'
import CartLink from '@/components/CartLink'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isGatePage = pathname === '/'

  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen bg-black text-white ${inter.className}`}>
        <CartProvider>
          {/* Only show layout chrome if not on gate page */}
          {!isGatePage && (
            <>
              <header className="bg-black text-white px-4 py-3 border-b border-lime-500 shadow-md z-30 relative">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
                  <Link href="/" className="block">
                    <img
                      src="/images/hexamridi-logo.png"
                      alt="Hex Amridi Logo"
                      className="h-26 sm:h-30 w-auto max-w-full transition-all animate-pulse-glow duration-300 hover:drop-shadow-[0_0_18px_#8B5CF6]"
                    />
                  </Link>
                  <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-6 text-sm sm:text-base font-mono">
                    <Link href="/shop" className="hover:text-cyan-400 transition active:text-lime-400 border-b-2 border-transparent hover:border-cyan-400">
                      Shop
                    </Link>
                    <CartLink />
                    <Link href="/admin" className="hover:text-cyan-400 transition active:text-lime-400 border-b-2 border-transparent hover:border-cyan-400">
                      Admin
                    </Link>
                  </nav>
                </div>
              </header>

              {/* Neon border */}
              <div className="w-full h-[7px] bg-lime-400 shadow-[0_0_10px_#00FF88] z-20 relative animate-pulse" />
              <div className="relative flex-grow z-10">
                <div className="absolute top-0 left-0 h-full w-[7px] bg-lime-400 shadow-[0_0_12px_#00FF88] animate-pulse z-10" />
                <div className="absolute top-0 right-0 h-full w-[7px] bg-lime-400 shadow-[0_0_12px_#00FF88] animate-pulse z-10" />
                <main className="p-6 relative z-20">{children}</main>
              </div>
              <Footer />
            </>
          )}

          {/* Render gate page directly without chrome */}
          {isGatePage && children}
        </CartProvider>
      </body>
    </html>
  )
}
