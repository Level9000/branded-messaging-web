'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import { useDebouncedCallback } from 'use-debounce'
import Image, { StaticImageData } from 'next/image'

/**
 * Desktop (portrait-ish) images
 */
import Doer from '@/images/doer.png'
import Dreamer from '@/images/dreamer.png'
import Explorer from '@/images/explorer.png'

/**
 * Mobile (landscape) images — replace these with your actual filenames
 * e.g. doer_landscape.png, dreamer_landscape.png, explorer_landscape.png
 */
import DoerMobile from '@/images/doer_mobile.png'
import DreamerMobile from '@/images/dreamer_mobile.png'
import ExplorerMobile from '@/images/explorer_mobile.png'

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

const features: Feature[] = [
  {
    name: 'For the Doers',
    description:
      'Solo founders, scrappy entrepreneurs, small business owners, and side-hustlers who are learning by doing. You’re building in real-time and need a partner to help you figure it out as you go.',
    image: Doer,
    imageMobile: DoerMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Doer} />,
  },
  {
    name: 'For the Dreamers',
    description:
      'Students and early-career professionals with bold ideas and big ambition. You’re ready to skip the corporate ladder and start building something of your own today.',
    image: Dreamer,
    imageMobile: DreamerMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Dreamer} />,
  },
  {
    name: 'For the Explorers',
    description:
      "Working professionals ready for a change. You’ve had ideas simmering for years, but didn’t know where to start. Now you’re ready to finally take those first steps, with a bit of help.",
    image: Explorer,
    imageMobile: ExplorerMobile,
    screen: (_props: ScreenProps) => <FeatureImageScreen src={Explorer} />,
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
function FeaturesDesktop() {
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
/* ---------------- Mobile ---------------- */
function FeaturesMobile() {
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
          space-x-4 sm:space-x-6            /* ← positive gap between slides */
          scroll-px-4 sm:scroll-px-6        /* ← padding at the ends so cards don't hug edges */
        "
      >
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(ref) => {
              if (ref) slideRefs.current[i] = ref!
            }}
            className="
              flex-none snap-center
              w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)]  /* ← keep full card visible + allow the gap */
            "
          >
            <div className="relative overflow-hidden rounded-3xl bg-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
              {/* Full-bleed, consistent image height across slides */}
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

              {/* Consistent text panel height + graceful clamp */}
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


export function PrimaryFeatures() {
  return (
    <section
      id="features"
      aria-label="Pocket Panel audiences"
      className="stitch-bottom stitch-top bg-pocket-950 pt-0 pb-0 text-[#ECC969]"
    >
      <div className="pt-20 pb-20 sm:pt-32 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Who is it for?
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-gray-300">
              We built Pocket Panel with three main customer groups in mind: the Doers, Dreamers, and Explorers.
              Every feature was built to support the entrepreneurs who are ready to take control of the future that they envision for themselves.
            </p>
          </div>
        </Container>

        <div className="mt-16 md:hidden">
          <FeaturesMobile />
        </div>
        <Container className="hidden md:mt-20 md:block">
          <FeaturesDesktop />
        </Container>
      </div>
    </section>
  )
}
