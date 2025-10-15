import { useId } from 'react'
import { Container } from '@/components/Container'

const features = [
  {
    name: 'The Doers',
    description:
      'Solo founders, scrappy entrepreneurs, small business owners, and side-hustlers who are learning by doing. You’re building in real-time — often for the first time — and need a partner to help you figure it out as you go.',
    href: '#',
    icon: DeviceArrowIcon,
  },
  {
    name: 'The Dreamers',
    description:
      'Students and early-career professionals with bold ideas and big ambition. You’re not waiting for permission — you’re ready to skip the corporate ladder and start building something of your own today.',
    href: '#',
    icon: DeviceCardsIcon,
  },
  {
    name: 'The Explorers',
    description:
      'Working professionals ready for a change. You’ve had ideas simmering for years, but didn’t know where to start. Now you’re ready to finally take those first steps — and we’ll help guide the way.',
    href: '#',
    icon: DeviceClockIcon,
  },
]

function DeviceArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <path d="M12 25l8-8m0 0h-6m6 0v6" stroke="#171717" strokeWidth={2} strokeLinecap="round" />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
    </svg>
  )
}

function DeviceCardsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 13a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H10z"
        fill={`url(#${id}-gradient)`}
      />
      <rect x={9} y={6} width={14} height={4} rx={1} fill="#171717" />
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <defs>
        <linearGradient id={`${id}-gradient`} x1={16} y1={12} x2={16} y2={28} gradientUnits="userSpaceOnUse">
          <stop stopColor="#737373" />
          <stop offset={1} stopColor="#737373" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  )
}

function DeviceClockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 4a4 4 0 014-4h14a4 4 0 014 4v10h-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9a2 2 0 00-2 2v24a2 2 0 002 2h5v2H9a4 4 0 01-4-4V4z"
        fill="#737373"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 32a8 8 0 100-16 8 8 0 000 16zm1-8.414V19h-2v5.414l4 4L28.414 27 25 23.586z"
        fill="#171717"
      />
    </svg>
  )
}

export function WhosItFor() {
  return (
    <section
      id="secondary-features"
      aria-label="Features for building a portfolio"
      /* stitches on BOTH top & bottom edges; padding moved inside wrapper */
      className="stitch-top stitch-bottom text-[#ECC969] pt-0 pb-0"
    >
      <div className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              Who is Pocket Panel for?
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              With the right support, you don’t need to have it all figured out.
              Pocket Panel helps you go from “just an idea” to something real—faster.
            </p>
          </div>

          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
          >
            {features.map((feature) => (
              <li key={feature.name} className="rounded-2xl border border-gray-200 bg-pocket-800 p-8">
                <feature.icon className="h-8 w-8" />
                <h3 className="mt-6 font-semibold text-gray-50">{feature.name}</h3>
                <p className="mt-2 text-gray-100">{feature.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
