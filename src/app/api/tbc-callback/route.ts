// src/app/api/tbc-callback/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Extract relevant payment data from the callback
    const { status, orderid, amount, cardnumber, tranid } = body

    if (status === 'APPROVED') {
      // Example: You can later extend this to include item details passed via metadata or DB join
      const { error } = await supabase.from('orders').insert([
        {
          name: 'TBC Customer',
          email: 'unknown@tbcpay.ge',
          address: 'N/A',
          items: [],
          total: amount,
          currency: 'GEL',
          paid_with: 'TBC Pay',
          payment_id: tranid,
          order_id: orderid,
        },
      ])

      if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json({ error: 'DB insert failed' }, { status: 500 })
      }

      return NextResponse.json({ message: 'Order confirmed & saved' })
    }

    return NextResponse.json({ message: 'Payment not approved' }, { status: 400 })
  } catch (err) {
    console.error('TBC callback error:', err)
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 })
  }
}
