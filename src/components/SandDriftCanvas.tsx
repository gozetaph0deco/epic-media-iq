import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 1800
const COLORS = ['#7B2CBF', '#FF6B6B', '#F4F1DE', '#5A189A']

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * 0.7);
  }
`

export default function SandDriftCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
    camera.position.z = 300

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    const sizes = new Float32Array(PARTICLE_COUNT)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    const palette = COLORS.map((c) => new THREE.Color(c))

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 800
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600
      positions[i * 3 + 2] = (Math.random() - 0.5) * 400

      const col = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b

      sizes[i] = 1.0 + Math.random() * 2.0

      velocities[i * 3] = 0.2 + Math.random() * 0.3
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      const posAttr = geometry.attributes.position as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3

        // Drift left with noise
        posArray[idx] -= velocities[idx] * delta * 60 * 0.4
        posArray[idx + 1] += Math.sin(elapsed * 0.5 + i * 0.01) * 0.15
        posArray[idx + 2] += Math.cos(elapsed * 0.3 + i * 0.02) * 0.1

        // Mouse attraction (subtle)
        const mx = mouseRef.current.x * 300
        const my = mouseRef.current.y * 200
        const dx = mx - posArray[idx]
        const dy = my - posArray[idx + 1]
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const strength = 0.03 * (1 - dist / 120)
          posArray[idx] += (dx / dist) * strength
          posArray[idx + 1] += (dy / dist) * strength
        }

        // Wrap around
        if (posArray[idx] < -400) {
          posArray[idx] = 400
          posArray[idx + 1] = (Math.random() - 0.5) * 600
          posArray[idx + 2] = (Math.random() - 0.5) * 400
        }
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#050401' }}
    />
  )
}
