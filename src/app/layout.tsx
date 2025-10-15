import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Pocket',
    default: 'Live Reels - Immersive Experiences',
  },
  description:
    'Bring Stories to Life. Instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('bg-white antialiased', inter.variable)}>
      <body>{children}</body>
    </html>
  )
}
