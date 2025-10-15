'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseBrowser as supabase } from '@/supabase/client'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

function AuthCallbackInner() {
  const router = useRouter()
  const sp = useSearchParams()
  const [msg, setMsg] = useState('Signing you in…')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      try {
        const nextParam = sp.get('next')
        let next = typeof nextParam === 'string' && nextParam.startsWith('/') ? nextParam : '/delete'

        const code = sp.get('code')
        const tokenHash = sp.get('token_hash')

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) throw error
          if (!cancelled) {
            setDone(true)
            router.replace(next)
          }
          return
        }

        if (tokenHash) {
          const { error } = await supabase.auth.verifyOtp({
            type: 'magiclink',
            token_hash: tokenHash,
          })
          if (error) throw error
          if (!cancelled) {
            setDone(true)
            router.replace(next)
          }
          return
        }

        // Fallback: check hash fragment, e.g. from older implicit flows
        if (
          typeof window !== 'undefined' &&
          window.location.hash.includes('access_token=')
        ) {
          const hash = new URLSearchParams(window.location.hash.slice(1))
          const access_token = hash.get('access_token')
          const refresh_token = hash.get('refresh_token')
          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            })
            if (error) throw error
            if (!cancelled) {
              setDone(true)
              router.replace(next)
            }
            return
          }
        }

        // If none matched
        if (!cancelled) {
          setMsg('No auth parameters found. Please use the latest login link.')
        }
      } catch (e: unknown) {
        const emsg = e instanceof Error ? e.message : String(e)
        if (!cancelled) {
          setMsg(`Failed to complete sign-in: ${emsg}`)
        }
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [router, sp])

  return <p className="py-20 text-center">{msg}</p>
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="py-20 text-center">Loading…</p>}>
      <AuthCallbackInner />
    </Suspense>
  )
}
