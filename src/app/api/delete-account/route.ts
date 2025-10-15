// src/app/delete-data/route.ts  (or wherever this handler lives)

import { NextRequest, NextResponse } from 'next/server'

const DELETE_FUNCTION_URL = 'https://auth.pocketpanel.ai/functions/v1/delete-user-account'

function getUserIdFromAuthHeader(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return null
  const payload = JSON.parse(
    Buffer.from(token.split('.')[1] || '', 'base64').toString('utf8')
  )
  return payload?.sub as string | null
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromAuthHeader(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Proxy the request to Supabase Edge Function
    const fnRes = await fetch(DELETE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward authorization (bearer token) if your Edge Function authenticates via JWT
        Authorization: req.headers.get('authorization') ?? '',
      },
      body: JSON.stringify({ user_id: userId }),
    })

    const json = await fnRes.json()
    if (!fnRes.ok) {
      return NextResponse.json(
        { error: json.error ?? 'Function error' },
        { status: fnRes.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? 'Server error' },
      { status: 500 }
    )
  }
}
