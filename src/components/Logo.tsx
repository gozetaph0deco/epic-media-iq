interface LogoProps {
  className?: string
  /** Tailwind text-color class, e.g. "text-warm". */
  colorClass?: string
}

/** Epic Media wordmark — geometric "epic" with "Media" nested in the bowl of the enlarged "c". Markup-based so it animates. */
export default function Logo({ className = '', colorClass = 'text-warm' }: LogoProps) {
  return (
    <span className={`logo font-logo font-bold inline-flex items-center leading-none tracking-[-0.02em] ${colorClass} ${className}`}>
      <span className="logo-char inline-block">e</span>
      <span className="logo-char inline-block">p</span>
      <span className="logo-char inline-block">i</span>
      <span className="logo-char relative inline-block text-[1.12em]">
        c
        <span className="logo-media absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2 font-light tracking-[0.01em] text-[0.34em] whitespace-nowrap">
          Media
        </span>
      </span>
    </span>
  )
}
