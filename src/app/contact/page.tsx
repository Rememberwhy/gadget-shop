'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Sending...')

    const { error } = await supabase.from('contact_messages').insert([
      { name, email, message }
    ])

    if (error) {
      console.error(error)
      setStatus('Failed to send. Please try again.')
    } else {
      setStatus('Message sent successfully!')
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-lime-400">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="input"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-lime-400 text-black font-bold py-2 rounded hover:bg-lime-500"
          >
            Send Message
          </button>
          {status && <p className="text-sm mt-2 text-lime-300">{status}</p>}
        </form>
      </div>
    </main>
  )
}
// Styles for the input fields
