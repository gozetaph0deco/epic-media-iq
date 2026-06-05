import { assetUrl } from '../lib/assetUrl'

interface LogoProps {
  className?: string
  /** Kept for API compatibility with existing call sites; not used by the image. */
  colorClass?: string
}

/**
 * Epic Media wordmark — renders the official transparent logo asset
 * (public/epic-logo.png) so the "epic" + "Media-in-the-c" mark is pixel-perfect.
 *
 * Height is driven by font-size via `h-[1em]`, so existing callers that pass
 * `text-2xl`, `text-[clamp(...)]`, etc. keep controlling the size.
 */
export default function Logo({ className = '', colorClass = '' }: LogoProps) {
  return (
    <img
      src={assetUrl('/epic-logo.png')}
      alt="Epic Media"
      draggable={false}
      className={`logo inline-block h-[1em] w-auto select-none ${colorClass} ${className}`}
    />
  )
}
