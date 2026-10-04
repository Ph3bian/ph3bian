import { useRef } from 'react'

// Gently pulls its child towards the pointer while hovered.
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </span>
  )
}
