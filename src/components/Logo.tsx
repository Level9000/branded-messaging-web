// components/Logo.tsx
import Image, { ImageProps } from 'next/image'
import clsx from 'clsx'
import logoImg from '@/images/logo.png'

type LogoProps = Omit<ImageProps, 'src' | 'alt' | 'width' | 'height' | 'priority'> & {
  /** Show the “Pocket Panel” label */
  withText?: boolean
  /** Size (px) of the logo icon; controls intrinsic width/height */
  size?: number
  /** Classes for the outer wrapper */
  containerClassName?: string
  /** Classes for the text label */
  textClassName?: string
}

export function Logo({
                       withText = false,
                       size = 40, // default icon size (removes the 120px inline gap)
                       containerClassName,
                       textClassName,
                       className,
                       ...imgProps
                     }: LogoProps) {
  return (
    <div
      className={clsx(
        // inline-flex so it only takes the space it needs
        'inline-flex items-center',
        withText ? 'gap-2' : 'gap-0',
        containerClassName
      )}
    >
      <Image
        src={logoImg}
        alt="Pocket Panel Logo"
        width={size}
        height={size}
        priority
        draggable={false}
        // no rounded box or extra padding; just the icon
        className={clsx('block h-10 w-auto', className)}
        {...imgProps}
      />

      {withText && (
        <span
          className={clsx(
            'text-base font-medium leading-none text-pocket-900',
            textClassName
          )}
        >
          Pocket Panel
        </span>
      )}
    </div>
  )
}
