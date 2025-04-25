'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        const { user } = data
        const role = user.user_metadata?.role
        if (role === 'admin') router.push('/admin')
        else router.push('/')
      }
    }
    checkSession()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      const userRole = data.user?.user_metadata?.role
      if (userRole === 'admin') {
        router.push('/admin')
      } else {
        setError('You are not authorized to access the admin panel.')
        await supabase.auth.signOut()
      }
    }
  }

  const handleForgotPassword = () => {
    // You can redirect to reset password page or use Supabase recovery
    router.push('/reset-password') // Make sure you create this route
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-3xl font-mono text-lime-400 mb-6 border border-lime-500 px-4 py-2 rounded shadow-md">Admin Login</h1>

      <form onSubmit={handleLogin} className="bg-zinc-900 p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2 accent-cyan-500"
            />
            Remember Me
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-xs text-cyan-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 rounded transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
