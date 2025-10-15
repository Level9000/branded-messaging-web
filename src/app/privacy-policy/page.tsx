import React from 'react'
import Link from 'next/link'
import { fetchLatestPrivacyPolicy } from '@/services/privacyPolicy'
import { Button } from '@/components/Button'
import { CirclesBackground } from '@/components/CirclesBackground'
import { Container } from '@/components/Container'
import { Layout } from '@/components/Layout'

export default async function PrivacyPolicyPage() {
  const policy = await fetchLatestPrivacyPolicy()
  const formattedDate = policy
    ? new Date(policy.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <Layout>
      <Container className="relative isolate flex flex-col items-center justify-center py-20 text-center sm:py-32">
        <CirclesBackground className="absolute top-1/2 left-1/2 -z-10 mt-44 w-272.5 -translate-x-1/2 -translate-y-1/2 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/30" />

        <h1 className="text-3xl font-medium tracking-tight text-gray-900 mb-3">
          Privacy Policy
        </h1>
        <p className="text-md text-gray-600 mb-8">
          Last updated: <span className="font-semibold">{formattedDate || '...'}</span>
        </p>

        <div className="w-full max-w-2xl mx-auto mb-8 text-left text-base leading-7 text-gray-800 bg-white/70 rounded-lg shadow p-6 border border-gray-100">
          {policy ? (
            <div dangerouslySetInnerHTML={{ __html: policy.content }} />
          ) : (
            <div>Loading policy details...</div>
          )}
        </div>

        <Button href="/" variant="outline" className="mt-4">
          Return to Home
        </Button>
      </Container>
    </Layout>
  )
}
