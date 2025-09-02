import { Suspense } from 'react'
import UpdatePasswordClient from './UpdatePasswordClient'

// Server-only segment config goes here
export const dynamic = 'force-dynamic'
export const revalidate = 0

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg font-mono">
      Preparing password reset…
    </div>
  )
}

export default function Page() {
  // Wrap the client component (which uses useSearchParams) in Suspense
  return (
    <Suspense fallback={<Loading />}>
      <UpdatePasswordClient />
    </Suspense>
  )
}
