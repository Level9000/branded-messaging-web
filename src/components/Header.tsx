'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Home, StarsIcon, WrenchIcon, BadgeQuestionMark } from 'lucide-react'

function TopIconNav() {
  const pathname = usePathname()

  const items = [
    { href: '/', label: 'Home', icon: Home, activeOn: ['/'] },
    { href: '/#secondary-features', label: 'Features', icon: StarsIcon },
    { href: '/support', label: 'Support', icon: WrenchIcon, activeOn: ['/support'] },
    { href: '/#faqs', label: 'FAQs', icon: BadgeQuestionMark },
  ]

  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-4 top-4 z-50 rounded-[28px]"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px))' }}
      >
        <div
          className="
            mx-auto
            w-full md:w-3/4 lg:w-1/2    /* ← responsive width: 100% mobile, 75% md, 50% lg+ */
            max-w-4xl
            flex items-center justify-between
            rounded-[28px]
            bg-[#0D1B2A]/10 ring-1 ring-white/20
            px-6 py-3
            backdrop-blur-md
            shadow-lg shadow-black/5
            transition-colors
          "
        >
          {items.map(({ href, label, icon: Icon, activeOn }) => {
            const isActive = activeOn?.includes(pathname ?? '')
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={clsx(
                  'flex h-11 w-11 items-center justify-center rounded-2xl transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="h-6 w-6" strokeWidth={2.25} />
                <span className="sr-only">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Spacer so content starts below the fixed bar */}
      <div className="h-24" />
    </>
  )
}

export function Header() {
  return (
    <header className="relative z-50">
      <TopIconNav />
    </header>
  )
}
