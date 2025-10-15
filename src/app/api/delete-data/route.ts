import { NextRequest, NextResponse } from 'next/server'

const DELETE_DATA_FN_URL = 'https://auth.pocketpanel.ai/functions/v1/delete-user-data'

function getUserIdFromAuthHeader(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return null
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1] || '', 'base64').toString('utf8')
    )
    return payload?.sub as string | null
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromAuthHeader(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Proxy the request to the delete-user-data Edge Function
    const fnRes = await fetch(DELETE_DATA_FN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.get('authorization') ?? '',
      },
      body: JSON.stringify({ user_id: userId }),
    })

    let json: any
    try {
      json = await fnRes.json()
    } catch (parseErr) {
      console.error('Failed to parse JSON from delete-data function:', parseErr)
      return NextResponse.json({ error: 'Function returned non-JSON' }, { status: 502 })
    }

    if (!fnRes.ok) {
      console.error('Edge function delete-data returned error:', fnRes.status, json)
      return NextResponse.json(
        { error: json.error ?? 'Function error' },
        { status: fnRes.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Proxy route /delete-data error:', e)
    return NextResponse.json(
      { error: e?.message ?? 'Server error' },
      { status: 500 }
    )
  }
}
