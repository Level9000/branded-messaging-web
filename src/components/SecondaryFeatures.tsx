// components/SecondaryFeatures.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'
import { Container } from '@/components/Container'

import Roadmap from '@/images/accelerate_roadmap.png'
import Guidance from '@/images/guidance.png'
import Building from '@/images/building.png'
import Ventures from '@/images/new_ventures.png'
import Momentum from '@/images/momentum.png'
import Talent from '@/images/talent_gap.png'

type Feature = {
  name: string
  description: string
  image: StaticImageData
}

/** ------- Audience-specific content ------- */
const customerFeatures: Feature[] = [
  {
    name: 'Your services, beautifully organized',
    description:
      'View everything you’ve booked, what’s due soon, and what can wait. A simple portal designed for luxury clients.',
    image: Roadmap,
  },
  {
    name: 'Reserve from curated openings',
    description:
      'Pick from times that already respect your calendar. No double-booking, no back-and-forth.',
    image: Momentum,
  },
  {
    name: 'Concierge messaging & invoices',
    description:
      'Chat with providers, confirm details, and review invoices—all without leaving your portal.',
    image: Guidance,
  },
  {
    name: 'Preference-led experiences',
    description:
      'We remember your notes, history, and preferences so every visit feels personal and seamless.',
    image: Talent,
  },
]

const contractorFeatures: Feature[] = [
  {
    name: 'Create your business profile',
    description:
      'Add your brand, connect calendars and payments, and set up one-tap messages for common replies.',
    image: Guidance,
  },
  {
    name: 'Onboard clients with context',
    description:
      'Store conversation history, preferences, scheduling, and payment timelines—organized automatically.',
    image: Talent,
  },
  {
    name: 'Elevate your daily operations',
    description:
      "From scheduling to payments, run everything in one place so you can focus on delivering white-glove service.",
    image: Roadmap,
  },
  {
    name: 'Build relationships that last',
    description:
      "Insights and history give you the confidence to serve like a true concierge—at scale.",
    image: Building,
  },
]

/* ------------ Mobile slider (uniform height) ------------ */
function SecondaryFeaturesMobile({ features }: { features: Feature[] }) {
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
      { root: slideContainerRef.current, threshold: 0.6 }
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
        aria-label="White Glove feature highlights"
      >
        {features.map((feature, i) => (
          <div
            key={feature.name}
            ref={(ref) => { if (ref) slideRefs.current[i] = ref! }}
            className="flex-none snap-center w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]"
          >
            {/* uniform-height card */}
            <div className="
              overflow-hidden rounded-3xl bg-[#0D1B2A] ring-1 ring-white/5
              flex flex-col
              min-h-[460px] sm:min-h-[500px]
            ">
              {/* image */}
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* text panel with fixed min height */}
              <div className="px-5 py-5 sm:px-6 sm:py-6 flex-1 min-h-[220px] sm:min-h-[240px]">
                <h3 className="text-2xl font-extrabold leading-snug text-[#F6F1EB] sm:text-3xl">
                  {feature.name}
                </h3>
                <p
                  className="
                    mt-2 text-base leading-relaxed text-white/80 sm:text-lg
                    overflow-hidden [display:-webkit-box] [-webkit-line-clamp:6] [-webkit-box-orient:vertical]
                  "
                >
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* dots */}
      <div className="mt-6 flex justify-center gap-3 md:hidden">
        {features.map((_, i) => (
          <button
            key={i}
            type="button"
            className={clsx(
              'relative h-1 w-5 rounded-full transition-colors',
              i === activeIndex ? 'bg-gray-700' : 'bg-gray-400/70'
            )}
            aria-label={`Go to slide ${i + 1}`}
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

/* ------------ Desktop / Tablet grid ------------ */
function SecondaryFeaturesGrid({ features }: { features: Feature[] }) {
  return (
    <ul
      role="list"
      className="mx-auto mt-12 hidden max-w-6xl grid-cols-1 gap-6 sm:mt-16 md:grid md:grid-cols-2"
    >
      {features.map((feature) => (
        <li key={feature.name}>
          <div
            className="group relative overflow-hidden rounded-3xl bg-[#0D1B2A] ring-1 ring-white/5
                       shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5
                       h-64 md:h-72 lg:h-80"
          >
            {/* Left image slab */}
            <div
              className="absolute inset-y-0 left-0 w-[44%]"
              style={{
                clipPath: 'polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)',
                backgroundColor: '#0D1B2A',
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={feature.image}
                  alt={feature.name}
                  fill
                  sizes="(min-width: 768px) 44vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text side */}
            <div className="relative ml-[44%] h-full">
              <div className="flex h-full items-center pr-14 pl-6 sm:pl-8">
                <div>
                  <h3 className="text-2xl font-extrabold leading-tight text-[#F6F1EB]">
                    {feature.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white/75">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>

            {/* hover halo */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="absolute inset-0 bg-[#ECC969]/5" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ------------ Wrapper with audience toggle ------------ */
export function SecondaryFeatures() {
  return (
    <section
      id="secondary-features"
      aria-label="White Glove features"
      className="stitch-top stitch-bottom pt-0 pb-0 text-[#ECC969]"
      style={{
        borderColor: '#ECC969',
        backgroundImage: 'radial-gradient(#ECC969 1.5px, transparent 1.5px)',
      }}
    >
      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-[#0D1B2A]">
              Two experiences. One white-glove platform.
            </h2>
            <p className="mt-3 text-lg text-[#0D1B2A]/70">
              Choose the portal that fits your role—clients organize services; contractors manage relationships.
            </p>
          </div>

          {/* Audience toggle */}
          <TabGroup>
            <TabList className="mx-auto mt-8 flex w-full max-w-xl items-center justify-center gap-3 rounded-xl bg-[#0D1B2A]/80 p-2">
              <Tab className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-200 data-selected:bg-[#0D1B2A] data-selected:text-white data-focus:outline-hidden transition">
                For Customers
              </Tab>
              <Tab className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-200 data-selected:bg-[#0D1B2A] data-selected:text-white data-focus:outline-hidden transition">
                For Contractors
              </Tab>
            </TabList>

            <TabPanels>
              {/* Customers */}
              <TabPanel>
                <SecondaryFeaturesMobile features={customerFeatures} />
                <SecondaryFeaturesGrid features={customerFeatures} />
              </TabPanel>

              {/* Contractors */}
              <TabPanel>
                <SecondaryFeaturesMobile features={contractorFeatures} />
                <SecondaryFeaturesGrid features={contractorFeatures} />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Container>
      </div>
    </section>
  )
}
