// src/app/api/tbc-checkout/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { amount, order_id } = await req.json()

  const response = await fetch('https://api.tbcbank.ge/v1/tpay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TBC_SECRET_KEY}`,
    },
    body: JSON.stringify({
      amount,
      currency: 'GEL',
      description: 'Order from Hexamridi.tech',
      returnurl: 'https://hexamridi.tech/thank-you',
      callbackurl: 'https://hexamridi.tech/api/tbc-callback',
      language: 'EN',
      orderid: order_id,
    }),
  })

  const data = await response.json()
  if (data && data.transactionurl) {
    return NextResponse.json({ url: data.transactionurl })
  } else {
    return NextResponse.json({ error: 'TBC Payment failed' }, { status: 400 })
  }
}
