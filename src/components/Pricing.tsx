'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

const APP_STORE_URL = 'https://apps.apple.com/us/app/pocket-panel/id6745844239'

const plans = [
  {
    name: 'Starter',
    featured: false,
    price: { Monthly: '$0', Annually: '$0' },
    description:
      'Generate your board and enjoy strategic 1 on 1 conversations with your advisors. No credit card required.',
    button: { label: 'Get started today', href: APP_STORE_URL },
    features: ['AI Board of Advisors', '1:1 sessions with your AI advisors', 'One business profile'],
  },
  {
    name: 'Pro',
    featured: true,
    price: { Monthly: '$25', Annually: '$200' },
    description:
      'Take your business to the next level with action based structured workshops, professional coaching, board meetings, and focus groups.',
    button: { label: 'Try for free', href: APP_STORE_URL },
    features: [
      'Includes everything in Starter, plus:',
      'Multi-agent focus groups',
      'Guided workshops',
      'Professional coaching',
      'Unlimited business profiles',
    ],
  },
  {
    name: 'Enterprise',
    featured: false,
    price: { Monthly: 'Contact us', Annually: 'Contact us' },
    description:
      'Tailored solutions for organizations that need scale, control, and customization.',
    button: { label: 'Contact us', href: '/support' },
    features: ['Custom branded experience', 'Bulk licensing', 'Expanded reporting capabilities'],
  },
] as const

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Plan({
                name,
                price,
                description,
                button,
                features,
                activePeriod,
                featured = false,
              }: {
  name: string
  price: Readonly<{ Monthly: string; Annually: string }>
  description: string
  button: { label: string; href: string }
  features: ReadonlyArray<string>
  activePeriod: 'Monthly' | 'Annually'
  featured?: boolean
}) {
  const isDark = featured

  return (
    <section
      className={clsx(
        'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
        isDark ? 'bg-[#0B1623] text-white' : 'bg-white text-gray-900',
      )}
    >
      <h3 className={clsx('font-semibold', 'text-xl sm:text-base', isDark ? 'text-white' : 'text-gray-900')}>
        {name}
      </h3>

      <p className={clsx('relative mt-3 flex tracking-tight', 'text-3xl sm:text-3xl', isDark ? 'text-white' : 'text-gray-900')}>
        {price.Monthly === price.Annually ? (
          price.Monthly
        ) : (
          <>
            <span className="transition duration-300">{price.Monthly}</span>
            <span className="absolute top-0 left-0 -translate-x-6 opacity-0 transition duration-300">
              {price.Annually}
            </span>
          </>
        )}
      </p>

      <p className={clsx('mt-3', 'text-base leading-relaxed sm:text-sm', isDark ? 'text-white/80' : 'text-gray-700')}>
        {description}
      </p>

      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y',
            'text-base sm:text-sm',
            isDark ? 'divide-white/10 text-white/85' : 'divide-gray-200 text-gray-700',
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon className="h-6 w-6 flex-none text-[#ECC969]" />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {isDark ? (
        <Button
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} – ${button.label}`}
          className="mt-6 w-full sm:w-auto justify-center !bg-[#ECC969] !text-[#0D1B2A] !border-[#ECC969] hover:!bg-[#D9B85B] focus-visible:!outline-[#ECC969]"
        >
          {button.label}
        </Button>
      ) : (
        <Button
          href={button.href}
          target={button.href.startsWith('http') ? '_blank' : undefined}
          rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={`${name} – ${button.label}`}
          className="mt-6 w-full sm:w-auto justify-center bg-[#0B1623] text-white border border-[#0B1623] hover:bg-[#0D1B2A] focus-visible:outline-[#0B1623]"
        >
          {button.label}
        </Button>
      )}
    </section>
  )
}

/* ------------ Mobile swipe (carousel) ------------ */
function PricingMobile({ activePeriod }: { activePeriod: 'Monthly' | 'Annually' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideContainerRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLDivElement) {
            setActiveIndex(slideRefs.current.indexOf(entry.target))
            break
          }
        }
      },
      { root: slideContainerRef.current, threshold: 0.6 },
    )

    for (const slide of slideRefs.current) if (slide) observer.observe(slide)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div
        ref={slideContainerRef}
        className="
          -mb-4 flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          space-x-4 sm:space-x-6
          scroll-px-4 sm:scroll-px-6
          md:hidden
        "
        aria-label="Pricing plans"
      >
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            ref={(ref) => {
              if (ref) slideRefs.current[i] = ref
            }}
            className="flex-none snap-center w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]"
          >
            <Plan {...plan} activePeriod={activePeriod} featured={plan.featured} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-3 md:hidden">
        {plans.map((_, i) => (
          <button
            key={i}
            type="button"
            className={clsx(
              'relative h-1 w-5 rounded-full transition-colors',
              i === activeIndex ? 'bg-gray-700' : 'bg-gray-400/70',
            )}
            aria-label={`Go to plan ${plans[i].name}`}
            onClick={() =>
              slideRefs.current[i]?.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: 'smooth',
              })
            }
          >
            <span className="absolute -inset-x-2 -inset-y-3" />
          </button>
        ))}
      </div>
    </>
  )
}

export function Pricing() {
  const [activePeriod] = useState<'Monthly' | 'Annually'>('Monthly')

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="stitch-top stitch-bottom text-[#ECC969] bg-gray-50 pt-0 pb-0"
    >
      <div className="py-16 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pricing-title"
              className="text-3xl sm:text-4xl font-medium tracking-tight text-gray-900"
            >
              Simple pricing. Cancel anytime.
            </h2>
          </div>

          {/* Mobile: swipeable */}
          <PricingMobile activePeriod={activePeriod} />

          {/* Desktop/Tablet: 3-card grid */}
          <div className="mx-auto mt-12 sm:mt-20 hidden md:grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-6xl md:grid-cols-3 lg:items-end justify-center">
            {plans.map((plan) => (
              <Plan key={plan.name} {...plan} activePeriod={activePeriod} featured={plan.featured} />
            ))}
          </div>
        </Container>
      </div>
    </section>
  )
}
