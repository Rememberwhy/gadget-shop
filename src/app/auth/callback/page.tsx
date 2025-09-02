'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// Prevent any static pre-rendering hiccups for this route.
export const dynamic = 'force-dynamic'

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      <p className="text-lime-400">Signing you in…</p>
    </div>
  )
}

function CallbackClient() {
  const router = useRouter()
  const search = useSearchParams()
  const [status, setStatus] = useState<'working' | 'error'>('working')
  const [msg, setMsg] = useState('Signing you in…')

  useEffect(() => {
    const run = async () => {
      try {
        const code = search.get('code')
        const errorDesc = search.get('error_description')
        const type = search.get('type') // e.g., 'recovery'

        if (errorDesc) {
          setStatus('error')
          setMsg(errorDesc)
          return
        }

        if (!code) {
          setStatus('error')
          setMsg('Missing code in callback URL.')
          return
        }

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (error || !data?.session) {
          setStatus('error')
          setMsg(error?.message || 'Could not establish a session.')
          return
        }

        // If it's a password recovery link, go to /update-password; otherwise /admin
        if (type === 'recovery') {
          router.replace('/update-password')
        } else {
          router.replace('/admin')
        }
      } catch (e: any) {
        setStatus('error')
        setMsg(e?.message || 'Unexpected error during authentication.')
      }
    }

    // kick off once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    run()
  }, [router, search])

  if (status === 'working') {
    return <Loading />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      <div className="text-center space-y-3">
        <p className="text-red-400">{msg}</p>
        <button
          onClick={() => router.replace('/login')}
          className="px-4 py-2 border border-red-400 rounded text-red-300 hover:bg-red-400 hover:text-black transition"
        >
          Go to login
        </button>
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  // Wrap the component that uses useSearchParams in Suspense
  return (
    <Suspense fallback={<Loading />}>
      <CallbackClient />
    </Suspense>
  )
}
