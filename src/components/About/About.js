import { useEffect, useRef } from 'react'
import styles from './About.module.scss'

const statement =
  'I care about the small things — the focus ring, the loading state, the millisecond saved. I build interfaces that are accessible to everyone, kind on slow networks, and a joy to maintain long after launch.'

const stats = [
  { value: '8+', label: 'Years building for the web' },
  { value: 'AA', label: 'WCAG 2.1 accessibility, built in' },
  { value: 'CWV', label: 'Core Web Vitals treated as a feature' },
]

export default function About() {
  const textRef = useRef(null)
  const words = statement.split(' ')

  // Light up the statement word by word as it scrolls through the viewport
  useEffect(() => {
    const el = textRef.current
    if (!el) return
    let frame
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)
      el.style.setProperty('--p', Math.min(Math.max(progress, 0), 1).toFixed(3))
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.label}>
        <span className="eyebrow">(01) About</span>
        <h2 id="about-title" className="visually-hidden">About</h2>
      </div>

      <p ref={textRef} className={styles.statement} style={{ '--n': words.length }} aria-label={statement}>
        {words.map((word, i) => (
          <span key={i} style={{ '--i': i }} aria-hidden="true">
            {word}{' '}
          </span>
        ))}
      </p>

      <dl className={styles.stats}>
        {stats.map(({ value, label }, i) => (
          <div key={value} className={styles.stat} data-reveal style={{ '--reveal-delay': `${i * 0.12}s` }}>
            <dt>{value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
