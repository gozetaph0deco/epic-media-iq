import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  eager?: boolean
}

export default function LazyVideo({ src, className = '', eager = false }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(eager)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setActive(visible)
        if (visible) {
          if (!video.src) video.src = src
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '100px', threshold: 0.1 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      className={className}
      style={{ opacity: active ? 1 : 0, transition: 'opacity 0.4s ease' }}
    />
  )
}
