import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  if (url.hostname === 'pocketpanel.ai') {
    url.hostname = 'www.pocketpanel.ai' // keeps path + query (?code=...)
    return NextResponse.redirect(url, 308)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
