'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallbackPage() {
  const router = useRouter()
  const search = useSearchParams()
  const [status, setStatus] = useState<'working'|'error'>('working')
  const [msg, setMsg] = useState('Signing you in…')

  useEffect(() => {
    const run = async () => {
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

      // If it's a password recovery link, still go to /update-password
      if (type === 'recovery') {
        router.replace('/update-password')
      } else {
        // Otherwise always redirect to /admin
        router.replace('/admin')
      }
    }

    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      {status === 'working' ? (
        <p className="text-lime-400">{msg}</p>
      ) : (
        <div className="text-center space-y-3">
          <p className="text-red-400">{msg}</p>
          <button
            onClick={() => router.replace('/login')}
            className="px-4 py-2 border border-red-400 rounded text-red-300 hover:bg-red-400 hover:text-black transition"
          >
            Go to login
          </button>
        </div>
      )}
    </div>
  )
}
