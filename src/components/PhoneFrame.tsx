import clsx from 'clsx'

function PhoneFrameSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  // Paste your full, transparent SVG here
  // You may want to tweak the viewBox/width/height for your layout.
  return (
    <svg
      width="393"
      height="852"
      viewBox="0 0 393 852"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <g mask="url(#mask)">
        {/* The frame shapes, strokes, and details go here */}
        {/* Example main frame shape */}
        <rect x="0" y="0" width="393" height="852" fill="none"/>
        <rect x="3" y="1" width="387" height="850" rx="62" fill="#F2F2F2" />
        {/* ...all other SVG decorative paths, filters, shadows, borders... */}
        <rect
          x="44.5"
          y="14.5"
          width="304"
          height="823"
          rx="42.5"
          stroke="#000"
          strokeOpacity=".07"
        />
        <rect x="154" y="29" width="56" height="5" rx="2.5" fill="#D4D4D4" />
      </g>
      <defs>
        {/* Mask ensures the center is transparent */}
        <mask id="mask">
          <rect x="0" y="0" width="393" height="852" rx="62" fill="#fff" />
        </mask>
      </defs>
    </svg>
  )
}

// Main PhoneFrame export
export function PhoneFrame({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={clsx('relative aspect-[393/852] w-full', className)} {...props}>
      {/* This is where your app content/video will appear */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {children}
      </div>
      {/* Overlay the SVG frame above your content */}
      <PhoneFrameSvg className="pointer-events-none absolute inset-0 w-full h-full" />
    </div>
  )
}
