import { useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './Footer.module.scss'

const links = [
  { href: '/blog', label: 'Writing' },
  { href: 'https://github.com/ph3bian', label: 'GitHub', external: true },
  { href: 'https://x.com/ph3bian', label: 'X / Twitter', external: true },
]

export default function Footer() {
  const wordRef = useRef(null)

  // A pink liquid glow that trails the pointer across the giant name,
  // drifting on its own when the pointer is elsewhere.
  useEffect(() => {
    const el = wordRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let pointer = null
    let frame
    let running = false

    const place = () => {
      el.style.setProperty('--x', `${pos.x}px`)
      el.style.setProperty('--y', `${pos.y}px`)
    }

    const tick = (t) => {
      const { width, height } = el.getBoundingClientRect()
      if (pointer) {
        target.x = pointer.x
        target.y = pointer.y
      } else {
        target.x = width * (0.5 + 0.38 * Math.sin(t / 3200))
        target.y = height * (0.55 + 0.25 * Math.cos(t / 2100))
      }
      pos.x += (target.x - pos.x) * 0.07
      pos.y += (target.y - pos.y) * 0.07
      place()
      if (running) frame = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      pointer = null
    }

    const { width, height } = el.getBoundingClientRect()
    pos.x = width / 2
    pos.y = height / 2
    place()
    if (reduced) return

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(tick)
    })
    observer.observe(el)
    const footer = el.parentElement
    footer.addEventListener('pointermove', onMove)
    footer.addEventListener('pointerleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      footer.removeEventListener('pointermove', onMove)
      footer.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Phebian Chukwurah, home">
          <span className={styles.brand__mark} aria-hidden="true">P</span>
          Phebian.
        </Link>

        <ul className={styles.links}>
          {links.map(({ href, label, external }) => (
            <li key={href}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          ))}
          <li><span>Copyright © {new Date().getFullYear()}</span></li>
          <li>
            <a href="#app">Back to top <span aria-hidden="true">↑</span></a>
          </li>
        </ul>
      </div>

      <div ref={wordRef} className={styles.word} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.text}>Phebian</span>
      </div>
    </footer>
  )
}
