'use client'

import { useEffect, useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const search = useSearchParams()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sessionChecked, setSessionChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // Handle recovery flow (exchange ?code= for session if present)
  useEffect(() => {
    const run = async () => {
      const code = search.get('code')
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          setError(error.message)
        } else if (!data?.session) {
          setError('Could not establish a session from recovery link.')
        }
      }
      setLoading(false)
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ensure we have a valid session before letting user change password
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      } else {
        setSessionChecked(true)
      }
    }
    if (!loading) check()
  }, [loading, router])

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage('')

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setError(error.message)
    } else {
      setMessage('✅ Password updated! Redirecting to admin…')
      setTimeout(() => router.push('/admin'), 1500)
    }
  }

  if (loading || !sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg font-mono">
        Checking session…
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      <h1 className="text-2xl font-mono text-lime-400 mb-6 border-b border-lime-500 px-4 py-2">
        🔐 Set New Password
      </h1>

      <form onSubmit={handleUpdate} className="bg-zinc-900 p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 rounded transition duration-300"
        >
          Update Password
        </button>
      </form>
    </div>
  )
}
