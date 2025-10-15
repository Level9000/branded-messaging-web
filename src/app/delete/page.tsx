'use client'

import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Session } from '@supabase/supabase-js'
import { supabaseBrowser as supabase } from '@/supabase/client'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function DeleteCenterPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <DeleteCenterInner />
    </Suspense>
  )
}

function PageSkeleton() {
  return (
    <Layout>
      <Container className="py-16 sm:py-24 text-center">
        <p>Loading…</p>
      </Container>
    </Layout>
  )
}

function DeleteCenterInner() {
  const sp = useSearchParams()
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(
    sp.get('error') ? 'Authentication failed. Please request a new link.' : null
  )
  const [busy, setBusy] = useState(false)

  // success modal state
  const [showSuccess, setShowSuccess] = useState(false)
  const successMessage = useMemo(
    () => 'Request received. We’ll process it shortly.',
    []
  )

  useEffect(() => {
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      if (active) setSession(s)
    })
    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const sendMagicLink = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email || busy) return
    setBusy(true)
    setStatus(null)

    const origin =
      typeof window !== 'undefined'
        ? window.location.origin
        : process.env.NEXT_PUBLIC_SITE_URL

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/delete`,
      },
    })

    setBusy(false)
    if (error) {
      setStatus(`Error sending link: ${error.message}`)
    } else {
      setStatus('Check your email for a sign-in link.')
    }
  }

  const callDelete = async (endpoint: 'delete-data' | 'delete-account') => {
    if (busy) return
    setBusy(true)
    setStatus(null)

    try {
      const { data } = await supabase.auth.getSession()
      const jwt = data.session?.access_token
      if (!jwt) {
        setStatus('Please sign in first.')
        return
      }

      const res = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      })

      const text = await res.text().catch(() => null)
      let json: any = null
      try {
        json = text ? JSON.parse(text) : null
      } catch {
        // non-JSON body
      }

      if (!res.ok) {
        const errMsg =
          json?.error ??
          json?.message ??
          text ??
          `Error ${res.status}: ${res.statusText}`
        setStatus(`Failed: ${errMsg}`)
      } else {
        setStatus(successMessage)
        // show animated success modal
        setShowSuccess(true)
        // auto-dismiss after 3.5s
        window.setTimeout(() => setShowSuccess(false), 3500)
      }
    } catch (e: any) {
      setStatus(`Failed: ${e?.message || 'Network error'}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Layout>
      <Container className="relative isolate flex flex-col items-center justify-center py-16 text-center sm:py-24">
        <CirclesBackground className="absolute top-1/2 left-1/2 -z-10 mt-44 w-272.5 -translate-x-1/2 -translate-y-1/2 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/30" />

        <h1 className="text-3xl font-medium tracking-tight text-gray-900 mb-3">
          Data Deletion Center
        </h1>
        <p className="text-base text-gray-600 mb-8 max-w-xl">
          Choose whether to remove your Pocket Panel data while keeping your
          account, or permanently delete both.
        </p>

        <div className="w-full max-w-2xl mx-auto mb-8 text-left text-base leading-7 text-gray-800 bg-white/70 rounded-lg shadow p-5 sm:p-6 border border-gray-100">
          {!session ? (
            <div className="space-y-5">
              <p className="text-gray-700">
                If you don’t have the app installed, sign in with your email to
                verify identity.
              </p>

              <form
                onSubmit={sendMagicLink}
                className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-3"
              >
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-base outline-none focus:ring-2 focus:ring-gray-300"
                  autoComplete="email"
                  inputMode="email"
                  disabled={busy}
                />
                <Button
                  type="submit"
                  disabled={!email || busy}
                  className="w-full sm:w-auto justify-center"
                >
                  {busy ? 'Sending…' : 'Email me a magic link'}
                </Button>
              </form>

              {status && <p className="text-sm text-gray-600">{status}</p>}

              <p className="text-xs text-gray-500">
                We’ll send a sign-in link to your email. Opening it confirms
                it’s you and returns you here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-700">
                Signed in as{' '}
                <span className="font-semibold">{session.user?.email}</span>
              </p>

              <div className="rounded-lg border border-gray-200 p-4 bg-white/70">
                <h2 className="text-lg font-semibold text-gray-900">
                  Delete my data (keep my account)
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Removes your business profiles, personas, meetings, chats, and
                  files, but keeps your login.
                </p>
                <Button
                  className="mt-3 w-full sm:w-auto justify-center"
                  onClick={() => callDelete('delete-data')}
                  disabled={busy}
                >
                  {busy ? 'Processing…' : 'Delete my data'}
                </Button>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 bg-white/70">
                <h2 className="text-lg font-semibold text-gray-900">
                  Delete my account &amp; data
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Permanently removes your account and all associated data. This
                  cannot be undone.
                </p>
                <Button
                  className="mt-3 w-full sm:w-auto justify-center"
                  onClick={() => callDelete('delete-account')}
                  disabled={busy}
                  variant="outline"
                >
                  {busy ? 'Processing…' : 'Delete my account & data'}
                </Button>
              </div>

              {status && (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {status}
                </p>
              )}
            </div>
          )}
        </div>

        <Button href="/" variant="outline" className="mt-2 w-full max-w-xs sm:w-auto">
          Return to Home
        </Button>

        {/* Success Modal */}
        {showSuccess && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 animate-fade-in"
              onClick={() => setShowSuccess(false)}
            />
            {/* Panel */}
            <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl animate-pop-in">
              <div className="mx-auto mb-4 h-20 w-20">
                <SuccessCheck />
              </div>
              <h3 id="success-title" className="text-lg font-semibold text-gray-900">
                {successMessage}
              </h3>
              <Button className="mt-5 w-full justify-center" onClick={() => setShowSuccess(false)}>
                Got it
              </Button>
            </div>

            {/* Animations */}
            <style jsx>{`
              @keyframes fade-in {
                from { opacity: 0; } to { opacity: 1; }
              }
              @keyframes pop-in {
                0% { opacity: 0; transform: translateY(8px) scale(0.95); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
              }
              .animate-fade-in { animation: fade-in 200ms ease-out; }
              .animate-pop-in { animation: pop-in 220ms cubic-bezier(.2,.8,.2,1); }
            `}</style>
          </div>
        )}
      </Container>
    </Layout>
  )
}

/** Animated green check using stroke-dash draw + scale pop */
function SuccessCheck() {
  return (
    <>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pp-success" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
        {/* Circle */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="none"
          stroke="url(#pp-success)"
          strokeWidth="10"
          strokeLinecap="round"
          className="animate-circle"
        />
        {/* Check */}
        <path
          d="M40 62 L55 77 L82 50"
          fill="none"
          stroke="url(#pp-success)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-check"
        />
      </svg>
      <style jsx>{`
        @keyframes draw {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pop {
          0%   { transform: scale(0.9); opacity: 0; }
          60%  { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-circle {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 700ms ease-out forwards, pop 300ms ease-out forwards;
        }
        .animate-check {
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: draw 500ms 250ms ease-out forwards, pop 300ms 250ms ease-out forwards;
        }
      `}</style>
    </>
  )
}
