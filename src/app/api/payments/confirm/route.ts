import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { paymentKey, orderId, amount } = await request.json()

  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 })
  }

  const encoded = Buffer.from(`${secretKey}:`).toString('base64')

  const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encoded}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount }),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(
      { error: data.message || 'Payment confirmation failed' },
      { status: res.status }
    )
  }

  return NextResponse.json(data)
}
