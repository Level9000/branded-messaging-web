'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'
import Image, { StaticImageData } from 'next/image'

/**
 * Desktop (portrait-ish) images
 */
import Portal from '@/images/portal.png'
import Customer from '@/images/customer_profile.png'
import Business from '@/images/business_profile.png'

/**
 * Mobile (landscape)
 */
import PortalMobile from '@/images/portal_mobile.png'
import CustomerMobile from '@/images/customer_profile_mobile.png'
import BusinessMobile from '@/images/business_profile_mobile.png'

import { Container } from '@/components/Container'

interface CustomAnimationProps {
  isForwards: boolean
  changeCount: number
}
type ScreenProps =
  | { animated: true; custom: CustomAnimationProps }
  | { animated?: false }

/** Image block used for the DESKTOP/TABLET preview area */
function FeatureImageScreen({
                              src,
                              alt = 'Feature image',
                            }: {
  src: StaticImageData | string
  alt?: string
}) {
  return (
    <div className="flex aspect-[9/16] h-full w-full items-center justify-center overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 90vw, 340px"
        priority={false}
      />
    </div>
  )
}

type Feature = {
  name: string
  description: string
  image: StaticImageData          // desktop/tablet
  imageMobile: StaticImageData    // mobile landscape
  screen: (_props: ScreenProps) => JSX.Element
}

/** ---------------- Content ---------------- **/
const customerFeatures: Feature[] = [
  {
    name: 'All your services in one beautiful place',
    description:
      'View upcoming appointments, renew services, and track preferences. White-glove simplicity designed for luxury clients.',
    image: Customer,
    imageMobile: CustomerMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Customer} />,
  },
  {
    name: 'Effortless scheduling that respects your time',
    description:
      'Reserve from curated openings that sync with your calendar so you only see times when you’re free.',
    image: Portal,
    imageMobile: PortalMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Portal} />,
  },
  {
    name: 'Concierge messaging & payments',
    description:
      'Message your providers, review invoices, and tip seamlessly—without the back-and-forth.',
    image: Business,
    imageMobile: BusinessMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Business} />,
  },
]

const contractorFeatures: Feature[] = [
  {
    name: 'Create your business profile',
    description:
      'Add your brand, connect your calendar and invoicing, and set up one-tap messages for common replies.',
    image: Business,
    imageMobile: BusinessMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Business} />,
  },
  {
    name: 'Onboard clients with context',
    description:
      'Store conversation history, preferences, and service notes so every touchpoint feels personal.',
    image: Customer,
    imageMobile: CustomerMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Customer} />,
  },
  {
    name: 'Run your day like a pro',
    description:
      "Scheduling, reminders, and payments—organized in a single portal so you can focus on exceptional service.",
    image: Portal,
    imageMobile: PortalMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Portal} />,
  },
]

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref.current
}

/* ---------------- Desktop / Tablet ---------------- */
function FeaturesDesktop({ features }: { features: Feature[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const onChange = useDebouncedCallback((i: number) => setSelectedIndex(i), 100, {
    leading: true,
  })

  return (
    <TabGroup
      className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24"
      selectedIndex={selectedIndex}
      onChange={onChange}
      vertical
    >
      <TabList className="relative z-10 order-last col-span-6 space-y-6">
        {features.map((feature, featureIndex) => {
          const isActive = featureIndex === selectedIndex
          return (
            <div
              key={feature.name}
              className={clsx(
                'relative rounded-2xl transition-colors',
                'hover:bg-pocket-800/30',
                isActive && 'bg-pocket-900/50',
              )}
            >
              <div className="relative z-10 p-8">
                <h3 className="mt-6 text-lg font-semibold text-white">
                  <Tab className="text-left data-selected:not-data-focus:outline-hidden">
                    <span className="absolute inset-0 rounded-2xl" />
                    {feature.name}
                  </Tab>
                </h3>
                <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </TabList>

      <div className="relative col-span-6">
        <div className="z-10 mx-auto w-full max-w-[340px]">
          <TabPanels as={Fragment}>
            {features.map((feature) => (
              <TabPanel
                key={feature.name}
                className="col-start-1 row-start-1 flex h-full w-full focus:outline-offset-32 data-selected:not-data-focus:outline-hidden"
              >
                <feature.screen animated={false as any} />
              </TabPanel>
            ))}
          </TabPanels>
        </div>
      </div>
    </TabGroup>
  )
}

/* ---------------- Mobile ---------------- */
function FeaturesMobile({ features }: { features: Feature[] }) {
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
        "
      >
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(ref) => {
              if (ref) slideRefs.current[i] = ref!
            }}
            className="flex-none snap-center w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={feature.imageMobile ?? feature.image}
                  alt={feature.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6 min-h-[180px]">
                <h3 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl">
                  {feature.name}
                </h3>
                <p
                  className="
                    mt-3 text-base leading-relaxed text-gray-200 sm:text-lg
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

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-3">
        {features.map((_, i) => (
          <button
            type="button"
            key={i}
            className={clsx(
              'relative h-1 w-5 rounded-full transition-colors',
              i === activeIndex ? 'bg-gray-200' : 'bg-gray-600/70',
            )}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() =>
              slideRefs.current[i].scrollIntoView({
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

/* ---------------- Wrapper with audience toggle ---------------- */
export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="White Glove portals"
      className="stitch-bottom stitch-top bg-pocket-950 pt-0 pb-0 text-[#ECC969]"
    >
      <div className="pt-20 pb-20 sm:pt-32 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Here's how it works:
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-gray-300">
              Try our interactive demo below to experience both customer and contractor portals.
            </p>
          </div>
        </Container>

        {/* Top-level audience toggle */}
        <Container className="mt-8">
          <TabGroup>
            <TabList className="mx-auto flex w-full max-w-xl items-center justify-center gap-3 rounded-xl bg-pocket-900/40 p-2">
              <Tab className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-200 data-selected:bg-pocket-800 data-selected:text-white data-focus:outline-hidden transition">
                For Customers
              </Tab>
              <Tab className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium text-gray-200 data-selected:bg-pocket-800 data-selected:text-white data-focus:outline-hidden transition">
                For Contractors
              </Tab>
            </TabList>

            <TabPanels>
              {/* Customers */}
              <TabPanel>
                <div className="mt-16 md:hidden">
                  <FeaturesMobile features={customerFeatures} />
                </div>
                <Container className="hidden md:mt-20 md:block">
                  <FeaturesDesktop features={customerFeatures} />
                </Container>
              </TabPanel>

              {/* Contractors */}
              <TabPanel>
                <div className="mt-16 md:hidden">
                  <FeaturesMobile features={contractorFeatures} />
                </div>
                <Container className="hidden md:mt-20 md:block">
                  <FeaturesDesktop features={contractorFeatures} />
                </Container>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Container>
      </div>
    </section>
  )
}
