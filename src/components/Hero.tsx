// components/Hero.tsx
'use client'

import { useId } from 'react'
import Image from 'next/image'
import { AppStoreLink } from '@/components/AppStoreLink'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

// ---------- Background rings ----------
function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId()
  return (
    <div {...props} aria-hidden="true">
      <svg viewBox="0 0 1026 1026" fill="none" className="absolute inset-0 h-full w-full animate-spin-slow">
        <path d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z" stroke="#D4D4D4" strokeOpacity="0.7" />
        <path d="M513 1025C230.23 1025 1 795.77 1 513" stroke={`url(#${id}-g1)`} strokeLinecap="round" />
        <defs>
          <linearGradient id={`${id}-g1`} x1="1" y1="513" x2="1" y2="1025">
            <stop stopColor="#F4B228" />
            <stop offset="1" stopColor="#F4B228" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg viewBox="0 0 1026 1026" fill="none" className="absolute inset-0 h-full w-full animate-spin-reverse-slower">
        <path d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z" stroke="#D4D4D4" strokeOpacity="0.7" />
        <path d="M913 513c0 220.914-179.086 400-400 400" stroke={`url(#${id}-g2)`} strokeLinecap="round" />
        <defs>
          <linearGradient id={`${id}-g2`} x1="913" y1="513" x2="913" y2="913">
            <stop stopColor="#F4B228" />
            <stop offset="1" stopColor="#F4B228" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// ---------- Phone Image (cropped & anchored higher) ----------
function PhoneHeroImage() {
  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]
                    h-[520px] sm:h-[560px] lg:h-[580px] overflow-hidden">
      <Image
        src="/images/pocket-panel-phone.png"
        alt="Pocket Panel app on phone"
        fill
        priority
        className="object-top object-contain"
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 440px"
      />
    </div>
  )
}

export function Hero() {
  return (
    <div className="stitch-bottom text-[#ECC969] overflow-hidden pt-12 sm:pt-20 pb-0">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          {/* Copy / CTAs */}
          <div className="relative z-20 mx-auto max-w-2xl lg:col-span-6 lg:max-w-none lg:pt-6">
            <h1 className="text-5xl font-medium text-balance tracking-tight text-pocket-900">
              Welcome to PRODUCT NAME
            </h1>
            <p className="mt-6 text-xl font-medium text-pocket-800">
              Put your stamp on branded messaging.
            </p>
            <p className="mt-6 text-lg text-gray-700">
              Live Reels help take your reading experience to the next level.  With immersive video clips just a scan away,
               you'll be transporting your audience into the world you always imagined for your book.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <AppStoreLink />
              <Button href="https://www.youtube.com/channel/UCOGD_NRubtHDCvXXhoXojTw" variant="outline">
                <span className="ml-0">Watch the video</span>
              </Button>
            </div>
          </div>

          {/* Phone image + background rings */}
          <div className="relative z-10 mt-6 sm:mt-8 lg:mt-[-20px] lg:col-span-6 lg:row-span-2">
            <BackgroundIllustration className="absolute top-4 left-1/2 h-[1026px] w-[1026px] -translate-x-1/3 opacity-80 sm:top-16 sm:-translate-x-1/2 lg:-top-16 xl:-top-14 z-0" />
            <div className="relative z-10">
              <PhoneHeroImage />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
