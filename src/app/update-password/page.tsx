'use client'

import { Suspense, useEffect, useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// Avoid static/prerender issues for this auth-sensitive route
export const dynamic = 'force-dynamic'
export const revalidate = 0

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg font-mono">
      Preparing password reset…
    </div>
  )
}

function UpdatePasswordClient() {
  const router = useRouter()
  const search = useSearchParams()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sessionChecked, setSessionChecked] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // If a recovery link includes ?code=, exchange it for a session
  useEffect(() => {
    const run = async () => {
      try {
        const code = search.get('code')
        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            setError(error.message)
          } else if (!data?.session) {
            setError('Could not establish a session from recovery link.')
          }
        }
      } catch (e: any) {
        setError(e?.message || 'Unexpected error while handling recovery code.')
      } finally {
        setLoading(false)
      }
    }
    // kick off once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    run()
  }, [search])

  // Ensure we have a valid session before allowing password change
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

    setSubmitting(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSubmitting(false)

    if (error) {
      setError(error.message)
    } else {
      setMessage('✅ Password updated! Redirecting to admin…')
      setTimeout(() => router.push('/admin'), 1200)
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
          minLength={8}
          autoComplete="new-password"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-2 rounded transition duration-300 disabled:opacity-60"
        >
          {submitting ? 'Updating…' : 'Update Password'}
        </button>

        <button
          type="button"
          onClick={() => router.replace('/login')}
          className="w-full mt-2 bg-transparent border border-zinc-600 hover:bg-zinc-800 text-white font-bold py-2 rounded transition duration-300"
        >
          Go to login
        </button>
      </form>
    </div>
  )
}

export default function UpdatePasswordPage() {
  // ✅ Wrap the component that uses useSearchParams in Suspense
  return (
    <Suspense fallback={<Loading />}>
      <UpdatePasswordClient />
    </Suspense>
  )
}
